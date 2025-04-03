import { useState, useEffect } from 'react';
import NewUser from '../components/NewUser';
import ChatRoom from '../components/ChatRoom';
import { io } from 'socket.io-client';

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

interface Message {
  id: string;
  sender: string;
  type?: 'UserStatus' | 'message';
  userId?: string;
  username?: string;
  message?: string;
}

export const JoinRoom = () => {
  const [username, setUsername] = useState('');
  const [user, setUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);

  function handleChange(currentEvent: React.ChangeEvent<HTMLInputElement>) {
    setUsername(currentEvent.target.value);
  }
  useEffect(() => {
    socket.on('users', (users: User[]) => {
      const messageArr: Message[] = [];
      users.forEach((u) => {
        const newMessage: Message = {
          id: u.userId,
          sender: 'system',
          type: 'UserStatus',
          userId: u.userId,
          username: u.username,
        };
        messageArr.push(newMessage);
      });

      setMessages((prev) => [...prev, ...messageArr]);
      setUsers(users);
      console.log(messageArr);
    });

    socket.on('session', (data: SessionData) => {
      const { username, userId } = data;
      setUser({ username, userId });
    });

    socket.on('new message', ({ userId, username, message }) => {
      const newMessage: Message = {
        id: '',
        sender: 'user',
        type: 'message',
        userId: user?.userId,
        username: user?.username,
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
