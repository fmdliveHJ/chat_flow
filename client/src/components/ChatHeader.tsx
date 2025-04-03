interface ChatHeaderProps {
  user: {
    username: string;
    userId: string;
  };
}

const ChatHeader = ({ user }: ChatHeaderProps) => {
  return (
    <div className='py-2 align-self-start sticky-top'>
      <div className='d-flex align-items-center py-1'>
        <div className='position-relative'>
          <img
            src='https://bootdey.com/img/Content/avatar/avatar1.png'
            className='rounded-circle'
            width='40'
            height='40'
            alt={user}
          />
        </div>
        <div className='flex-groy-1'>
          <strong>logged in as {user.username}</strong>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
