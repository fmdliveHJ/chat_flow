import { Message } from '../types/message';

interface MessageItemProps {
  message: Message;
}

export const MessageItem = ({ message }: MessageItemProps) => {
  return (
    <div>
      <div>{message.senderName}</div>
      <div>{message.content}</div>
      <div>{message.timestamp.toLocaleTimeString()}</div>
    </div>
  );
};
