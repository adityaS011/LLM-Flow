import React, { useCallback } from 'react';
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

  const isValidConnection = (connection) => {
    const { source, target } = connection;

    const sourceNode = nodes.find((node) => node.id === source);
    const targetNode = nodes.find((node) => node.id === target);

    if (!sourceNode || !targetNode) return false; // Ensure both nodes exist else error aega

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
    [setEdges, nodes] // Include nodes in the dependency array
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

      if (item.componentType === 'Input') {
        setNodes((nds) => [
          ...nds,
          { ...newNode, data: { label: 'Input Node' }, type: 'input' },
        ]);
      } else if (item.componentType === 'LLM') {
        setNodes((nds) => [
          ...nds,
          { ...newNode, data: { label: 'LLM Node' }, type: 'llm' },
        ]);
      } else if (item.componentType === 'Output') {
        setNodes((nds) => [
          ...nds,
          { ...newNode, data: { label: 'Output Node' }, type: 'output' },
        ]);
      }
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
        nodeTypes={nodeTypes} // Use custom node types
      >
        <div className='flex flex-row'>
          <ComponentBar />
          <Controls className='mr-10 bg-green-600 ' position='bottom-right' />
        </div>
        <Background variant='dots' gap={12} size={1} />
      </ReactFlow>
    </div>
  );
};

export default DragSpace;
