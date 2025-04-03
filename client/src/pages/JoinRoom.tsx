import { useState, useEffect } from 'react';
import NewUser from '../components/NewUser';
import ChatRoom from '../components/ChatRoom';
import { io } from 'socket.io-client';
import { Message } from '../types/message';

const socket = io('http://localhost:4000', {
  autoConnect: false,
});

interface User {
  username: string;
  userId: string;
}

interface SessionData {
  userId: string;
  username: string;
}

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
      const messageArr: Message[] = [];
      users.forEach((user) => {
        const newMessage: Message = {
          id: user.userId,
          sender: 'system',
          type: 'UserStatus',
          userId: user.userId,
          username: user.username,
        };
        messageArr.push(newMessage);
      });

      setMessages((prev) => [...prev, ...messageArr]);
      console.log(messageArr);
    });

    socket.on('session', (data: SessionData) => {
      const { username, userId } = data;
      setUser({ username, userId });
    });

    socket.on('user connected', ({ userId, username }) => {
      const newMessage: Message = {
        id: '',
        sender: 'user',
        type: 'message',
        userId: userId,
        username: username,
      };
      setMessages((prev) => [...prev, newMessage]);
    });

    socket.on('new message', ({ userId, username, message }) => {
      const newMessage: Message = {
        id: '',
        sender: 'user',
        type: 'message',
        userId: userId,
        username: username,
        message: message,
      };
      setMessages((prev) => [...prev, newMessage]);
    });

    return () => {
      socket.off('session');
      socket.off('users');
    };
  }, []);

  function logNewuser() {
    socket.auth = { username };
    socket.connect();
  }

  function sendMessage() {
    socket.emit('new message', message);

    const newMessage: Message = {
      id: '',
      sender: 'user',
      type: 'message',
      userId: user?.userId,
      username: user?.username,
      message: message,
    };
    setMessages((prev) => [...prev, newMessage]);
    setMessage('');
  }

  return (
    <div className='container '>
      {user?.userId && (
        <ChatRoom
          user={user}
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
          messages={messages}
        />
      )}
      {!user?.userId && (
        <NewUser
          newUser={username}
          handleChange={handleChange}
          logNewuser={logNewuser}
        />
      )}
    </div>
  );
};
