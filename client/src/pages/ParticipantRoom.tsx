import { useState, useEffect } from 'react';
import { Participant } from '../types/participant';
import { useNavigate } from 'react-router-dom';
export const ParticipantRoom = () => {
  const [participantCount, setParticipantCount] = useState(0);
  const [disabled, setDisabled] = useState(false);
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [name, setName] = useState('');
  const navigate = useNavigate();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setName(e.target.value);
  }

  function handleClick() {
    if (participantCount >= 5) {
      setDisabled(true);
      return;
    }

    const newPaticipant: Participant = {
      id: participants.length + 1,
      name,
      isCheckedIn: false,
    };

    const updatedParticipants = [...participants, newPaticipant];
    const updatedParticipantCount = participants.length + 1;

    setParticipantCount(updatedParticipantCount);
    setParticipants(updatedParticipants);

    localStorage.setItem('participants', JSON.stringify(updatedParticipants));
    localStorage.setItem(
      'participantCount',
      JSON.stringify(updatedParticipantCount)
    );
    navigate('/chat');
  }

  function handleDelete(id: number) {
    const updatedParticipants = participants.filter(
      (participant) => participant.id !== id
    );
    setParticipants(updatedParticipants);
    setParticipantCount(participants.length - 1);
    localStorage.setItem('participants', JSON.stringify(updatedParticipants));
    localStorage.setItem(
      'participantCount',
      JSON.stringify(participants.length - 1)
    );
  }

  useEffect(() => {
    const stored = localStorage.getItem('participantCount');
    const storedParticipants = localStorage.getItem('participants');
    if (stored) {
      const parsed = JSON.parse(stored);
      setParticipantCount(parsed);
    }
    if (storedParticipants) {
      const parsed = JSON.parse(storedParticipants);
      setParticipants(parsed);
    }
  }, []);

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
    </div>
  );
};
