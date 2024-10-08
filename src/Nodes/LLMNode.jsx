import { Handle, Position } from '@xyflow/react';
import React, { useContext } from 'react';
import { WorkflowContext } from '../context/WorkFlowContext';

const LLMNode = () => {
  const {
    model,
    setModel,
    openAiBase,
    setOpenAiBase,
    openAiKey,
    setOpenAiKey,
    maxTokens,
    setMaxTokens,
    temperature,
    setTemperature,
  } = useContext(WorkflowContext);

  const modelOptions = [
    { value: 'gpt-3.5-turbo', label: 'GPT-3.5 Turbo' },
    { value: 'gpt-4o-mini', label: 'GPT-4 -o -mini' },
    { value: 'gpt-4o', label: 'GPT-4' },
    { value: 'gpt-4-turbo', label: 'GPT 4 Turbo' },
  ];

  return (
    <div className='llm-node flex flex-col gap-4 h-[616px]'>
      <div className='flex flex-row h-[25px] justify-between pt-4 px-4 items-center'>
        <p className='flex flex-row gap-4 font-semibold text-base items-center h-full '>
          <img src='llm_icon.svg' alt='input' className='w-7 h-7  ' />
          LLM Engine
        </p>
        <img src='grren_dot.svg' alt='active' className='w-3 h-3' />
      </div>
      <div className='p-4 w-full bg-[#EEF4FF] text-[#666666] font-semibold text-sm '>
        Engine will run when processing
      </div>

      <div className='flex flex-col gap-5'>
        <div className='flex flex-col gap-2 px-4'>
          <label
            className='text-left text-base font-semibold'
            htmlFor='model-select'
          >
            Model Name
          </label>
          <select
            id='model-select'
            value={model}
            onChange={(e) => setModel(e.target.value)}
            className='border rounded w-full p-1 text-base'
            aria-label='Select a model'
          >
            <option value=''>Select a model</option>
            {modelOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className='flex flex-col gap-2 px-4'>
          <label
            className='text-left text-base font-semibold'
            htmlFor='openai-base'
          >
            OpenAI Base URL
          </label>
          <input
            id='openai-base'
            type='text'
            value={openAiBase}
            onChange={(e) => setOpenAiBase(e.target.value)}
            placeholder='Enter OpenAI Base URL'
            className='border rounded w-full p-1 text-base'
            aria-label='OpenAI Base URL'
          />
        </div>

        <div className='flex flex-col gap-2 px-4'>
          <label
            className='text-left text-base font-semibold'
            htmlFor='openai-key'
          >
            OpenAI API Key
          </label>
          <input
            id='openai-key'
            type='text'
            value={openAiKey}
            onChange={(e) => setOpenAiKey(e.target.value)}
            placeholder='Enter OpenAI API Key'
            className='border rounded w-full p-1 text-base'
            aria-label='OpenAI API Key'
          />
        </div>

        <div className='flex flex-col gap-2 px-4'>
          <label
            className='text-left text-base font-semibold'
            htmlFor='max-tokens'
          >
            Max Tokens
          </label>
          <input
            id='max-tokens'
            type='number'
            value={maxTokens}
            onChange={(e) => setMaxTokens(e.target.value)}
            placeholder='Enter max tokens'
            className='border rounded w-full p-1 text-base'
            aria-label='Max Tokens'
          />
        </div>

        <div className='flex flex-col gap-2 px-4'>
          <label
            className='text-left text-base font-semibold'
            htmlFor='temperature'
          >
            Temperature
          </label>
          <input
            id='temperature'
            type='number'
            value={temperature}
            onChange={(e) => setTemperature(e.target.value)}
            placeholder='Enter temperature (e.g., 0.7)'
            className='border rounded w-full p-1 text-base'
            aria-label='Temperature'
            step='0.1' // Allows decimal input for temperature
          />
        </div>
      </div>
      <div className='flex flex-row justify-between px-4 mt-1 text-sm text-gray-500'>
        <p>Input</p>
        <p>Output</p>
      </div>

      <Handle
        type='target'
        position={Position.Left}
        id='llm-input'
        className='mt-60 p-1 rounded-full w-4 h-4'
        style={{
          borderColor: 'gray',
          borderWidth: '1px',
          borderStyle: 'solid',
          backgroundColor: '#fff',
        }}
      />
      <Handle
        type='source'
        position={Position.Right}
        id='llm-output'
        className='mt-60 p-1 rounded-full w-4 h-4'
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

export default LLMNode;
