import React, { useState } from 'react';
import DragSpace from './components/DragSpace';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { WorkflowProvider } from './context/WorkFlowContext';
import ChatInterface from './ChatInterface/ChatInterface';
import Navbar from './Navbar/Navbar';

const App = () => {
  const [isChatDeployed, setIsChatDeployed] = useState(false);
  return (
    <WorkflowProvider>
      <div className='flex flex-col h-screen bg-gray-2000'>
        <Navbar
          setIsChatDeployed={setIsChatDeployed}
          isChatDeployed={isChatDeployed}
        />
        {isChatDeployed ? (
          <ChatInterface />
        ) : (
          <DndProvider backend={HTML5Backend}>
            <DragSpace />
          </DndProvider>
        )}
      </div>
    </WorkflowProvider>
  );
};

export default App;
