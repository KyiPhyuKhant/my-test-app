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
        <div className="result">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Gender</th>
                <th>Probability</th>
                <th>Count</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{result.name}</td>
                <td>{result.gender}</td>
                <td>{result.probability}</td>
                <td>{result.count}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>

  );
}

export default App;
