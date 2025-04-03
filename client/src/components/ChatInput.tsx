interface ChatInputProps {
  message: string;
  sendMessage: (message: string) => void;
  setMessage: (message: string) => void;
}

const ChatInput = ({ message, sendMessage, setMessage }: ChatInputProps) => {
  const handleSendMessage = () => {
    if (message.trim()) {
      sendMessage(message);
      setMessage('');
    }
  };

  return (
    <div className='align-items-end border-info chat-input'>
      <div className='input-group flex-fill'>
        <input
          type='text'
          className='form-control'
          placeholder='message'
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyUp={(e) => e.code === 'Enter' && handleSendMessage()}
        />
        <button
          className='btn btn-outline-secondary'
          onClick={handleSendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatInput;
