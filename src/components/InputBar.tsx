import { useState } from 'react';

interface InputBarProps {
  onSendMessage: (content: string) => void;
}

export const InputBar = ({ onSendMessage }: InputBarProps) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type='text'
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder='메시지를 입력하세요...'
      />
      <button type='submit'>전송</button>
    </form>
  );
};
