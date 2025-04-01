import { useState } from 'react';
import { Participant } from '../types/participant';

export const ChatRoom = () => {
  const [participantCount, setParticipantCount] = useState(0);
  const [disabled, setDisabled] = useState(false);
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [name, setName] = useState('');
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setName(e.target.value);
  }

  function handleClick() {
    if (participantCount >= 5) {
      setDisabled(true);
    } else {
      setParticipantCount(participantCount + 1);
      setParticipants([
        ...participants,
        { id: participants.length + 1, name, isCheckedIn: false },
      ]);
    }
  }

  function handleDelete(id: number) {
    setParticipants(
      participants.filter((participant) => participant.id !== id)
    );
  }

  return (
    <div>
      <div>
        <h2>참석자 카운트</h2>
        <p>{participantCount} / 5</p>
      </div>

      <div className='participant-box'>
        <input type='text' onChange={handleChange} />
        <button onClick={handleClick} disabled={disabled}>
          참가
        </button>
      </div>

      <div>
        <h2>참석자 목록</h2>
        <ul>
          {participants.map((participant) => (
            <li
              key={participant.id}
              onClick={() => handleDelete(participant.id)}
            >
              {participant.name}
            </li>
          ))}
        </ul>
      </div>
      {/* <ChatBox /> */}
    </div>
  );
};
