import React from 'react';
import { useDrag } from 'react-dnd';

const ComponentBar = () => {
  const [{ isDragging: isDraggingInput }, dragInput] = useDrag({
    type: 'NODE',
    item: { componentType: 'Input' },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [{ isDragging: isDraggingLLM }, dragLLM] = useDrag({
    type: 'NODE',
    item: { componentType: 'LLM' },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [{ isDragging: isDraggingOutput }, dragOutput] = useDrag({
    type: 'NODE',
    item: { componentType: 'Output' },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div className='flex flex-col gap-4 bg-white z-50 h-[640px] ml-7 mt-5 w-[251px] p-4 rounded-[20px] border shadow-sm'>
      <p className='flex flex-col font-medium text-lg gap-3'>
        Components
        <div className='h-[1px] bg-gray-300'></div>
      </p>
      <p className='text-[#444444] font-normal text-sm tracking-tight'>
        Drag n Drop
      </p>
      <div
        ref={dragInput}
        className={`cursor-pointer node-item flex flex-row items-center border-[0.8px] rounded-[5px] justify-between w-full p-2 ${
          isDraggingInput ? 'opacity-50' : ''
        }`}
      >
        <div className='flex flex-row gap-3 items-center'>
          <img src='input_icon.svg' alt='input' className='w-4 h-4' />
          <p className='text-xs'>Input</p>
        </div>
        <img src='vector.svg' alt='options' className='w-[10px] h-[7px]' />
      </div>
      <div
        ref={dragLLM}
        className={`cursor-pointer node-item flex flex-row items-center border-[0.8px] rounded-[5px] justify-between w-full p-2  ${
          isDraggingLLM ? 'opacity-50' : ''
        }`}
      >
        <div className='flex flex-row gap-3 items-center'>
          <img src='llm_icon.svg' alt='input' className='w-5 h-5' />
          <p className='text-xs'>LLM Engine</p>
        </div>
        <img src='vector.svg' alt='options' className='w-[10px] h-[7px]' />
      </div>
      <div
        ref={dragOutput}
        className={`cursor-pointer node-item flex flex-row items-center border-[0.8px] rounded-[5px] justify-between w-full p-2 ${
          isDraggingOutput ? 'opacity-50' : ''
        }`}
      >
        <div className='flex flex-row gap-3 items-center'>
          <img src='output_icon.svg' alt='input' className='w-4 h-4' />
          <p className='text-xs'>Output</p>
        </div>
        <img src='vector.svg' alt='options' className='w-[10px] h-[7px]' />
      </div>
    </div>
  );
};

export default ComponentBar;
