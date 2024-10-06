import React, { useContext, useState } from 'react';
import { WorkflowContext } from '../context/WorkFlowContext';

const ChatInterface = () => {
  const { openAiBase, openAiKey, model, maxTokens, temperature } =
    useContext(WorkflowContext);
  const [chatHistory, setChatHistory] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!userInput.trim()) return; // Prevent empty messages

    const newMessage = { role: 'user', content: userInput };
    setChatHistory((prev) => [...prev, newMessage]);

    setUserInput('');
    setIsLoading(true);

    try {
      const response = await fetch(`${openAiBase}/v1/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${openAiKey}`,
        },
        body: JSON.stringify({
          model,
          prompt: userInput,
          max_tokens: parseInt(maxTokens),
          temperature: parseFloat(temperature),
        }),
      });

      const data = await response.json();
      const aiMessage = { role: 'assistant', content: data.choices[0].text };

      setChatHistory((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error in fetching data from API', error);
      const errorMessage = {
        role: 'system',
        content: 'Error in fetching response',
      };
      setChatHistory((prev) => [...prev, errorMessage]);
    }

    setIsLoading(false);
  };

  const handleNewConversation = () => {
    setChatHistory([]);
  };

  return (
    <div className='flex flex-row h-screen'>
      <div className='flex flex-col bg-[#FAFAFB] p-4 w-[280px] gap-4 shadow-md'>
        <button
          onClick={handleNewConversation}
          className='border border-black w-[248px] text-gray-800 font-normal rounded-lg text-sm mt-4 px-4 py-2 mb-6 '
        >
          + Start New Conversation
        </button>
        <p className='text-sm font-medium text-gray-400'>CHAT HISTORY</p>
        <div>{chatHistory.length === 0 && <p>No conversations yet.</p>}</div>
      </div>
      <div className='flex flex-col w-full bg-[#FAFAFB] p-4'>
        <div className='flex-grow overflow-y-auto p-4 bg-white rounded border'>
          {chatHistory.map((message, index) => (
            <div
              key={index}
              className={`mb-4 ${
                message.role === 'user' ? 'text-right' : 'text-left'
              }`}
            >
              <p
                className={`inline-block px-4 py-2 rounded-lg ${
                  message.role === 'user'
                    ? 'bg-white text-black'
                    : 'bg-gray-300 text-black'
                }`}
              >
                {message.content}
              </p>
            </div>
          ))}
          {isLoading && <p className='text-center'>Loading...</p>}
        </div>

        <div className='flex p-4 bg-white border rounded-l w-[838px] mx-auto'>
          <input
            type='text'
            className='flex-grow p-2 '
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder='Type your message...'
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <button
            className='bg-blue-500 text-white p-2 rounded-r'
            onClick={handleSendMessage}
            disabled={isLoading}
          >
            {isLoading ? 'Sending...' : 'Send'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
