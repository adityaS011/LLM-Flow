import React, { createContext, useState } from 'react';

export const WorkflowContext = createContext();

export const WorkflowProvider = ({ children }) => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [model, setModel] = useState('');
  const [openAiBase, setOpenAiBase] = useState('');
  const [openAiKey, setOpenAiKey] = useState('');
  const [maxTokens, setMaxTokens] = useState('');
  const [temperature, setTemperature] = useState('');

  const contextValue = {
    input,
    setInput,
    output,
    setOutput,
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
  };

  return (
    <WorkflowContext.Provider value={contextValue}>
      {children}
    </WorkflowContext.Provider>
  );
};
