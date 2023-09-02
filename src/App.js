// import logo from './logo.svg';
import './App.css';
import React from 'react';
import { useState } from 'react';
import axios from 'axios';

function App() {
  const [name, setName] = useState('');
  const [result, setResult] = useState(null);


  const handleChange = (e) => {
    setName(e.target.value);
  };

  const fetchGender = async () => {
    try {
      const response = await axios.get(`https://api.genderize.io/?name=${name}`)
      setResult(response.data);

    } catch (err) {
      setResult(null);

    }
  };

  return (
    <div className="App">
      <h1>Guessing Gender By Name</h1>
      <input type='text' placeholder='Enter a name' value={name} onChange={handleChange} />
      <button onClick={fetchGender}>Click</button>
      {result && (
        <div>
          <p>Name: {result.name}</p>
          <p>Gender: {result.gender}</p>
          <p>Probability: {result.probability}</p>
          <p>Count: {result.count}</p>
        </div>
      )}
    </div>
  );
}

export default App;
