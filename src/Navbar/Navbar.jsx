import React, { useContext, useState } from 'react';
import { WorkflowContext } from '../context/WorkFlowContext';

const Navbar = ({ isChatDeployed, setIsChatDeployed }) => {
  const {
    input,
    model,
    openAiBase,
    openAiKey,
    maxTokens,
    temperature,
    setOutput,
    output,
  } = useContext(WorkflowContext);
  const [isDeployed, setIsDeployed] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleRun = async () => {
    try {
      const response = await fetch(`${openAiBase}/v1/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${openAiKey}`,
        },
        body: JSON.stringify({
          model,
          prompt: input,
          max_tokens: parseInt(maxTokens),
          temperature: parseFloat(temperature),
        }),
      });

      const data = await response.json();
      console.log(data);
      setOutput(data.choices[0].text);
    } catch (error) {
      setOutput('Error in fetching data from API');
      setIsError(true);
      console.error(error);
    }
  };

  const handleDeploy = () => {
    setIsDeployed((prevState) => !prevState);
  };

  const handleChatDeploy = () => {
    setIsChatDeployed((prevState) => !prevState);
  };

  return (
    <div className='h-fit w-full bg-white justify-between items-center flex flex-row py-2 px-10 border shadow-sm z-50'>
      <p>Open GI</p>
      <div className='flex flex-row justify-end gap-6'>
        {isDeployed && output && !isError && (
          <button
            onClick={handleChatDeploy}
            className='rounded-lg bg-blue-500 text-white w-[95px] px-2 py-1'
          >
            Chat
          </button>
        )}
        {isDeployed && output && !isError ? (
          <button
            onClick={handleDeploy}
            className='rounded-lg bg-white text-red-400 font-medium border-red-300 border w-[95px] px-2 py-1'
          >
            Undeploy
          </button>
        ) : (
          <div className='relative'>
            <div className='relative group'>
              <button
                onClick={handleDeploy}
                disabled={!output}
                className={`rounded-lg bg-black  text-white w-[95px] px-2 py-1 ${
                  !output ? 'opacity-30 text-gray-300' : ''
                }`}
              >
                Deploy
              </button>
              <span
                className={`absolute left-1/2 transform -translate-x-1/2 mt-10 p-2 rounded-md w-32 bg-black text-white text-xs  px-2 py-1 ${
                  !output ? 'invisible group-hover:visible' : 'invisible'
                }`}
              >
                Please run first to get output
              </span>
            </div>
          </div>
        )}

        <div className='relative'>
          <div className='relative group'>
            <button
              onClick={handleRun}
              className={`bg-[#44924C] text-white rounded-lg w-[95px] px-2 py-1 gap-1 flex flex-row items-center justify-center
                ${
                  openAiBase && openAiKey && input && model && temperature
                    ? ''
                    : 'opacity-70'
                }
                `}
            >
              <img src='play_icon.svg' alt='Play' className='w-4 h-4' />
              Run
            </button>
            <span
              className={`absolute left-1/2 transform -translate-x-1/2 mt-2 p-4 rounded-md w-32 bg-black text-white text-xs  px-2 py-1 ${
                !output &&
                openAiBase &&
                openAiKey &&
                input &&
                model &&
                temperature
                  ? 'invisible group-hover:visible'
                  : 'invisible'
              }`}
            >
              Please Create the flow to run
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
