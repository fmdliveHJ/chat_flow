interface NewUserProps {
  newUser: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  logNewuser: () => void;
}

const NewUser = ({ newUser, handleChange, logNewuser }: NewUserProps) => {
  return (
    <div className='card w-100 text-center border-white'>
      <div className='row'>
        <div className='col-12'>
          <h5>Enter UserName</h5>
        </div>
        <div className='d-flex just-content-center flex-column py-1'>
          <input
            type='text'
            name='newUser'
            value={newUser}
            className='form-control mb-3'
            placeholder='username'
            autoComplete='off'
            onChange={(e) => handleChange(e)}
            onKeyDown={(e) => (e.code === 'Enter' ? logNewuser() : null)}
          />
          <button className='btn btn-success' onClick={logNewuser}>
            Join
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewUser;
