import React, { useCallback, useState } from 'react';
import {
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  ReactFlow,
} from '@xyflow/react';
import { useDrop } from 'react-dnd';
import ComponentBar from '../ComponentBar/ComponentBar';
import InputNode from '../Nodes/InputNode';
import LLMNode from '../Nodes/LLMNode';
import OutputNode from '../Nodes/OutputNode';

const initialNodes = [];
const initialEdges = [];

const nodeTypes = {
  input: InputNode,
  llm: LLMNode,
  output: OutputNode,
};

const DragSpace = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [lastNodeType, setLastNodeType] = useState(null);

  const isValidConnection = (connection) => {
    const { source, target } = connection;

    const sourceNode = nodes.find((node) => node.id === source);
    const targetNode = nodes.find((node) => node.id === target);

    if (!sourceNode || !targetNode) return false;

    if (sourceNode.type === 'input' && targetNode.type === 'llm') {
      return true;
    }
    if (sourceNode.type === 'llm' && targetNode.type === 'output') {
      return true;
    }

    return false;
  };

  const onConnect = useCallback(
    (params) => {
      if (isValidConnection(params)) {
        setEdges((eds) =>
          addEdge(
            {
              ...params,
              style: { strokeDasharray: '6, 6' },
            },
            eds
          )
        );
      } else {
        console.warn('Invalid connection attempt:', params);
      }
    },
    [setEdges, nodes]
  );

  const [, drop] = useDrop({
    accept: 'NODE',
    drop: (item, monitor) => {
      const position = monitor.getClientOffset();
      const newNode = {
        id: `${nodes.length + 1}`,
        position: { x: position.x - 150, y: position.y - 100 },
        style: {
          minHeight: '288px',
          height: 'fit',
          maxHeight: '616px',
          width: '325px',
          border: 'none',
          padding: '0',
          borderRadius: '8px',
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
          backgroundColor: '#fff',
        },
        connectable: false,
        edges: [],
      };

      let newNodeType;

      if (item.componentType === 'Input') {
        newNodeType = 'input';
        setNodes((nds) => [
          ...nds,
          { ...newNode, data: { label: 'Input Node' }, type: newNodeType },
        ]);
      } else if (item.componentType === 'LLM') {
        newNodeType = 'llm';
        setNodes((nds) => [
          ...nds,
          { ...newNode, data: { label: 'LLM Node' }, type: newNodeType },
        ]);
      } else if (item.componentType === 'Output') {
        newNodeType = 'output';
        setNodes((nds) => [
          ...nds,
          { ...newNode, data: { label: 'Output Node' }, type: newNodeType },
        ]);
      }

      // Automatically connect nodes based on the last node type
      if (lastNodeType === 'input' && newNodeType === 'llm') {
        const edge = {
          source: `${nodes.length}`,
          target: `${nodes.length + 1}`,
        }; // Adjust based on current node count
        onConnect(edge);
      } else if (lastNodeType === 'llm' && newNodeType === 'output') {
        const edge = {
          source: `${nodes.length}`,
          target: `${nodes.length + 1}`,
        }; // Adjust based on current node count
        onConnect(edge);
      }

      // Update the last node type
      setLastNodeType(newNodeType);
    },
  });

  return (
    <div className='h-screen bg-gray-100' ref={drop}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onConnect={onConnect}
        draggable
        nodesDraggable
        nodesConnectable
        nodeTypes={nodeTypes}
      >
        <div className='flex flex-row w-full h-full'>
          <ComponentBar />
          <Controls
            position='bottom-left'
            style={{
              borderRadius: '8px',
              marginLeft: '280px',
              marginBottom: '25px',
            }}
          />

          {nodes.length === 0 && (
            <div className='w-full h-full flex flex-col gap-1  items-center justify-center text-center font-medium text-lg'>
              <img
                src='none_icon.svg'
                alt='Drag and Drop'
                className='rounded-full bg-[#DEFBEA] p-2 flex items-center justify-center'
              />
              Drag and drop to get started
            </div>
          )}
        </div>
        <Background variant='dots' gap={12} size={1} />
      </ReactFlow>
    </div>
  );
};

export default DragSpace;
