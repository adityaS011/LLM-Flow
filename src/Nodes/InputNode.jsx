import React, { useContext } from 'react';
import { Handle, Position } from '@xyflow/react';
import { WorkflowContext } from '../context/WorkFlowContext';

const InputNode = () => {
  const { input, setInput } = useContext(WorkflowContext); // Access input state

  return (
    <div className='input-node flex flex-col gap-4'>
      <div className='flex flex-row h-[25px] items-center justify-between px-4 pt-4'>
        <p className='flex flex-row gap-4 font-semibold text-base'>
          <img src='input_icon.svg' alt='input' className='w-5 h-5 ' />
          INPUT
        </p>
        <img src='grren_dot.svg' alt='active' className='w-3 h-3' />
      </div>
      <div className='p-4 w-full bg-[#EEF4FF] text-[#666666] font-semibold text-sm '>
        Write the input/question you want to ask
      </div>
      <div className='flex flex-col gap-2 px-4'>
        <label
          className='text-left text-base font-semibold'
          htmlFor='query-input'
        >
          Input
        </label>
        <input
          id='query-input'
          type='text'
          value={input}
          onChange={(e) => setInput(e.target.value)} // Update input via context
          placeholder='Enter your query'
          className='border rounded w-full p-2 text-base'
          aria-label='Enter your query'
        />
      </div>
      <p className='px-4 mt-8 text-right  text-gray-500'>LLM Engine</p>

      <Handle
        type='source'
        position={Position.Right}
        id='input-output'
        className='mt-24 p-1 rounded-full w-4 h-4'
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

export default InputNode;
