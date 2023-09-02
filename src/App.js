// import logo from './logo.svg';
import './App.css';
import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import maleAvatar from './male.png'
import femaleAvatar from './female.png';

function App() {
  const [names, setNames] = useState('');
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);


  const handleChange = (e) => {
    setNames(e.target.value);
  };

  const fetchGender = async () => {
    try {
      setError(null);
      const nameArray = names.split(',').map((name) => name.trim());

      const genderLists = nameArray.map((name) => axios.get(`https://api.genderize.io/?name=${name}`));

      const genderResults = await Promise.all(genderLists);
      const genderData = genderResults.map((response) => response.data);
      setResults(genderData);
    } catch (err) {
      setResults([]);
      setError('Invalid Request');
    }
  };

  return (
    <div className="App">
      <h1>Guessing Gender By Name</h1>
      <input type='text' placeholder='Enter a name' value={names} onChange={handleChange} />
      <button onClick={fetchGender}>Search</button>
      {error && <div className='alert'>{error}</div>}
      {results.length > 0 && (
        <div>
          {results.map((result, index) => (
            <div className="result" key={index}>
              <img
                src={result.gender === 'male' ? maleAvatar : femaleAvatar}
                alt="Avatar"
                className="avatar"
              />
              <div className='info'>
                <p><strong>Name</strong>: {result.name}</p>
                <p><strong>Gender</strong>: {result.gender}</p>
                <p><strong>Probability</strong>: {result.probability}</p>
                <p><strong>Count</strong>: {result.count}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
export default App;
