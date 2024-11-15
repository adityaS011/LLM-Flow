import React, { useContext, useState } from 'react';
import { WorkflowContext } from '../context/WorkFlowContext';

const ChatInterface = () => {
  const { openAiBase, openAiKey, model, maxTokens, temperature } =
    useContext(WorkflowContext);
  const [chatHistory, setChatHistory] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSendMessage = async () => {
    if (!userInput.trim()) return; // Prevent empty messages

    const newMessage = { role: 'user', content: userInput };
    setChatHistory((prev) => [...prev, newMessage]);
    setUserInput('');
    setIsLoading(true);
    setError(null); // Reset error state

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
            messages: [newMessage],
            max_tokens: parseInt(maxTokens),
            temperature: parseFloat(temperature),
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch from API');
      }

      const data = await response.json();
      const aiMessage = { role: 'assistant', content: data.choices[0].message };
      console.log(data);
      setChatHistory((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error in fetching data from API', error);
      setError('Error in fetching response. Please try again.');
    }

    setIsLoading(false);
  };

  const handleNewConversation = () => {
    setChatHistory([]);
    setError(null); // Reset error when starting new conversation
  };

  return (
    <div className='flex flex-row h-screen'>
      <div className='flex flex-col bg-[#FAFAFB] p-4 w-[280px] gap-4 shadow-md'>
        <button
          onClick={handleNewConversation}
          className='border border-black w-[248px] text-gray-800 font-normal rounded-lg text-sm mt-4 px-4 py-2 mb-6'
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
              <div
                className={`inline-block px-4 py-2 rounded-lg ${
                  message.role === 'user'
                    ? 'bg-white text-black'
                    : 'bg-gray-300 text-black'
                }`}
              >
                {message.content}
              </div>
            </div>
          ))}
          {isLoading && <div className='text-center'>Loading...</div>}
          {error && <div className='text-red-500 text-center'>{error}</div>}
        </div>

        <div className='flex p-4 bg-white border rounded-l w-[838px] mx-auto'>
          <input
            type='text'
            className='flex-grow p-2'
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
