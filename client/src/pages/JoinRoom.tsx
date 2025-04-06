import { useState, useEffect } from 'react';
import ChatLogin from '../components/ChatLogin';
import ChatRoom from '../components/ChatRoom';
import { io } from 'socket.io-client';
import { Message } from '../types/message';

const socket = io('http://localhost:4000', {
  autoConnect: false,
});

interface User {
  username: string;
  userId: string;
  color: string;
}

interface SessionData extends User {}

export const JoinRoom = () => {
  const [username, setUsername] = useState('');
  const [user, setUser] = useState<User | null>(null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setUsername(e.target.value);
  }

  useEffect(() => {
    socket.on('users', (users: User[]) => {
      const messageArr: Message[] = users.map((user) => ({
        id: user.userId,
        sender: 'system',
        type: 'UserStatus',
        userId: user.userId,
        username: user.username,
        color: user.color,
      }));
      setMessages((prev) => [...prev, ...messageArr]);
    });

    socket.on('session', (data: User) => {
      setUser(data);
    });

    socket.on('user connected', ({ userId, username, color }) => {
      const newMessage: Message = {
        id: '',
        sender: 'user',
        type: 'message',
        userId,
        username,
        color,
      };
      setMessages((prev) => [...prev, newMessage]);
    });

    socket.on('new message', ({ userId, username, message, color }) => {
      const newMessage: Message = {
        id: '',
        sender: 'user',
        type: 'message',
        userId,
        username,
        message,
        color,
      };
      setMessages((prev) => [...prev, newMessage]);
    });

    return () => {
      socket.off('session');
      socket.off('users');
      socket.off('user connected');
      socket.off('new message');
    };
  }, []);

  function logNewuser() {
    socket.auth = { username };
    socket.connect();
  }

  function sendMessage() {
    if (!user) return;

    socket.emit('new message', message);

    const newMessage: Message = {
      id: '',
      sender: 'user',
      type: 'message',
      userId: user.userId,
      username: user.username,
      message,
      color: user.color,
    };
    setMessages((prev) => [...prev, newMessage]);
    setMessage('');
  }

  return (
    <div className='container d-flex flex-column justify-content-center align-items-center'>
      {user?.userId ? (
        <ChatRoom
          user={user}
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
          messages={messages}
          color={user.color}
        />
      ) : (
        <ChatLogin
          newUser={username}
          handleChange={handleChange}
          logNewuser={logNewuser}
        />
      )}
    </div>
  );
};
