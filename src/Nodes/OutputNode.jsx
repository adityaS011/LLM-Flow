import React, { useContext } from 'react';
import { Handle, Position } from '@xyflow/react';
import { WorkflowContext } from '../context/WorkFlowContext';

const OutputNode = () => {
  const { output } = useContext(WorkflowContext);
  return (
    <div className='output-node flex flex-col gap-4 h-[320px]'>
      <div className='flex flex-row h-[25px] items-center justify-between px-4 pt-4'>
        <p className='flex flex-row gap-4 font-semibold text-base items-center'>
          <img src='output_icon.svg' alt='input' className='w-5 h-5 ' />
          OUTPUT
        </p>
        <img src='grren_dot.svg' alt='active' className='w-3 h-3' />
      </div>
      <div className='p-4 w-full bg-[#EEF4FF] text-[#666666] font-semibold text-sm '>
        Output after the processing will appear here
      </div>
      <div className='flex flex-col gap-2 px-4'>
        <label
          className='text-left text-base font-semibold'
          htmlFor='query-input'
        >
          Output Response
        </label>
        <div className='p-2 border border-gray-400 rounded text-sm max-h-28 overflow-y-auto no-scrollbar text-ellipsis'>
          {output || 'output'}
        </div>
      </div>
      <p className='px-4 mt-16 text-left  text-gray-500'>LLM Engine</p>
      <Handle
        type='target'
        position={Position.Left}
        id='output-input'
        className='mt-28 p-1 rounded-full w-4 h-4'
        style={{
          borderColor: 'gray',
          borderWidth: '1px',
          borderStyle: 'solid',
          backgroundColor: '#fff',
        }}
      />
    </div>
  );
};

export default OutputNode;
