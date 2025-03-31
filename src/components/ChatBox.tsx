import { InputBar } from './InputBar';
import { MessageList } from './MessageList';

const ChatBox = () => {
  return (
    <div>
      <MessageList />
      <InputBar />
    </div>
  );
};

export default ChatBox;
