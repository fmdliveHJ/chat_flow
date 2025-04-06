interface ChatColorIconProps {
  color: string;
}

const ChatColorIcon = ({ color }: ChatColorIconProps) => {
  return (
    <div
      style={{
        width: '40px',
        height: '40px',
        backgroundColor: color,
        borderRadius: '50%',
      }}
    ></div>
  );
};

export default ChatColorIcon;
