import React from 'react';

interface ChatContainerProps {
  children: React.ReactNode;
}

const ChatContainer = ({ children }: ChatContainerProps) => {
  return (
    <div className='card w-100'>
      <div className='row ' style={{ height: '95vh' }}>
        <div className='flex flex-column space-between chat-window'>
          {children}
        </div>
      </div>
    </div>
  );
};

export default ChatContainer;
