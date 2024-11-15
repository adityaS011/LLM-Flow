import React, { useContext, useState } from 'react';
import { WorkflowContext } from '../context/WorkFlowContext';
import { toast } from 'react-hot-toast';

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
      const response = await fetch(
        `https://api.openai.com/v1/chat/completions`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${openAiKey}`,
          },
          body: JSON.stringify({
            model,
            messages: [{ role: 'user', content: input }],
            max_tokens: parseInt(maxTokens),
            temperature: parseFloat(temperature),
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error response:', errorData);
        setOutput('Error: ' + errorData.message);
        setIsError(true);
        toast.error(`Error is getting response from api`);
        return;
      }

      const data = await response.json();
      console.log(data);
      setOutput(data.choices[0]?.text || 'No output');
      setIsDeployed((prevState) => !prevState);
      toast.success('Successfully deployed!');
    } catch (error) {
      setOutput('Error in fetching data from API');
      setIsError(true);
      console.error(error);
      toast.error('Error in fetching data from API');
    }
  };

  const handleDeploy = () => {
    setIsDeployed((prevState) => !prevState);
    toast.success(
      isDeployed ? 'Undeployed successfully!' : 'Deployed successfully!'
    );
  };
  const handleUndeploy = () => {
    setIsChatDeployed((prevState) => !prevState);
    setIsDeployed((prevState) => !prevState);
  };

  const handleChatDeploy = () => {
    setIsChatDeployed((prevState) => !prevState);
  };

  return (
    <div className='h-fit w-full bg-white justify-between items-center flex flex-row py-2 px-10 border shadow-sm z-50'>
      <p>Open GI</p>
      <div className='flex flex-row justify-end gap-5'>
        {isDeployed && output && (
          <button
            onClick={handleChatDeploy}
            className='rounded-lg bg-blue-500 text-white w-[95px] px-2 py-1'
          >
            Chat
          </button>
        )}
        {isDeployed && output ? (
          <button
            onClick={handleUndeploy}
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
                className={`rounded-lg bg-black text-white w-[95px] px-2 py-1 ${
                  !output ? 'opacity-30 ' : ''
                }`}
              >
                Deploy
              </button>
              <span
                className={`absolute left-1/2 transform -translate-x-1/2 mt-10 p-2 rounded-md w-32 bg-black text-white text-xs px-2 py-1 ${
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
              disabled={
                !openAiBase || !openAiKey || !input || !model || !temperature
              }
              className={`bg-[#44924C] text-white rounded-lg w-[95px] px-2 py-1 gap-1 flex flex-row items-center justify-center ${
                openAiBase && openAiKey && input && model && temperature
                  ? ''
                  : 'opacity-30'
              }`}
            >
              <img src='play_icon.svg' alt='Play' className='w-4 h-4' />
              Run
            </button>
            <span
              className={`absolute left-1/2 transform -translate-x-1/2 mt-2 p-4 rounded-md w-32 bg-black text-white text-xs px-2 py-1 ${
                !output ? 'invisible group-hover:visible' : 'invisible'
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
