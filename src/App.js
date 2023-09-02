// import logo from './logo.svg';
import './App.css';
import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import maleAvatar from './male.png'
import femaleAvatar from './female.png';

function App() {
  const [name, setName] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);


  const handleChange = (e) => {
    setName(e.target.value);
  };

  const fetchGender = async () => {
    try {
      const response = await axios.get(`https://api.genderize.io/?name=${name}`)
      setResult(response.data);
      setError(null);
    } catch (err) {
      setResult(null);
      setError('Invalid Request');
    }
  };

  return (
    <div className="App">
      <h1>Guessing Gender By Name</h1>
      <input type='text' placeholder='Enter a name' value={name} onChange={handleChange} />
      <button onClick={fetchGender}>Search</button>
      {error && <div className='alert'>{error}</div>}
      {result && (
        <div className="result">
          <img src={result.gender === 'male' ? maleAvatar : femaleAvatar} alt='Avatar' className='avatar' />
          <p>{result.name}</p>
          <p>{result.gender}</p>
          <p>{result.probability}</p>
          <p>{result.count}</p>
        </div>
      )}
    </div>

  );
}

export default App;
