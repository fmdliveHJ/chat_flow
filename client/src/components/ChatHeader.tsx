import ChatColorIcon from './ChatColorIcon';

interface ChatHeaderProps {
  user: {
    username: string;
    userId: string;
  };
  color: string;
}

const ChatHeader = ({ user, color }: ChatHeaderProps) => {
  return (
    <div className='py-2 align-self-start sticky-top'>
      <div className='d-flex align-items-center py-1'>
        <div className='position-relative'>
          <ChatColorIcon color={color} />
        </div>
        <div className='flex-groy-1'>
          <strong>logged in as {user.username}</strong>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
