import { useEffect } from 'react';
import ChatHeader from './ChatHeader';
import ChatInput from './ChatInput';
import ChatContainer from './ChatContainer';
import { Message } from '../types/message';
import ScrollableFeed from 'react-scrollable-feed';
import ChatColorIcon from './ChatColorIcon';
interface ChatRoomProps {
  user: {
    username: string;
    userId: string;
  };
  message: string;
  messages: Message[];
  sendMessage: (message: string) => void;
  setMessage: (message: string) => void;
  color: string;
}

const ChatRoom = ({
  user,
  message,
  messages,
  sendMessage,
  setMessage,
  color,
}: ChatRoomProps) => {
  useEffect(() => {
    console.log(user);
    console.log(message);
    console.log(messages);
  }, []);

  return (
    <ChatContainer>
      <ChatHeader user={user} color={color} />
      <div
        className='position-relative chat-high overflow-auto'
        style={{ height: '500px' }}
      >
        <ScrollableFeed>
          {messages.map((message, index) => {
            return message.type === 'UserStatus' ? (
              <div key={index} className='text-center'>
                <span className='badge bg-info'>
                  {message.userId === user.userId
                    ? 'you have joined the chat'
                    : `${message.username} has joined the chat`}
                </span>
              </div>
            ) : (
              <div
                key={index}
                className={
                  message.userId === user.userId
                    ? 'chat-message-right pb-4'
                    : 'cha-message-left pb-4'
                }
              >
                <div className='d-flex flex-row'>
                  <ChatColorIcon color={color} />
                  <div className='flex-fill'>
                    <div className='text-muted small'>{message.username}</div>
                    <div className='text-break'>{message.message}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </ScrollableFeed>
      </div>
      <ChatInput
        message={message}
        setMessage={setMessage}
        sendMessage={sendMessage}
      />
    </ChatContainer>
  );
};

export default ChatRoom;
