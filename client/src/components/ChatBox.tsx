import { useEffect, useState } from 'react';
import { InputBar } from './InputBar';
import { MessageList } from './MessageList';
import { Participant } from '../types/participant';
import { Message } from '../types/message';

const ChatBox = () => {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('participants');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setParticipants(parsed);
      } catch (e) {
        console.error('JSON 파싱 에러:', e);
      }
    }
  }, []);

  const handleSendMessage = (content: string) => {
    const currentParticipant = participants[0];
    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      timestamp: new Date(),
      senderId: String(currentParticipant?.id) || 'unknown',
      senderName: currentParticipant?.name || '알 수 없음',
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  return (
    <div>
      <ul>
        {participants.map((participant) => (
          <li key={participant.id}>{participant.name}</li>
        ))}
      </ul>
      <MessageList messages={messages} />
      <InputBar onSendMessage={handleSendMessage} />
    </div>
  );
};

export default ChatBox;
