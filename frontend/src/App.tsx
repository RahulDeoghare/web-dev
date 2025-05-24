import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [message, setMessage] = useState('');
  const [name, setName] = useState('');
  const [response, setResponse] = useState('');

  // Use an environment variable or fallback to localhost
  const API_URL = process.env.REACT_APP_API_URL || 'http://192.168.29.119:5000';

  useEffect(() => {
    fetch(`${API_URL}/names`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => setMessage(JSON.stringify(data)))
      .catch((err) => console.error('Fetch error:', err));
  }, [API_URL]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      setResponse('Name is required.');
      return;
    }

    try {
      const res = await fetch(`${API_URL}/name`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      setResponse(data.message);
    } catch (err) {
      console.error('Fetch error:', err);
      setResponse('Failed to submit name. Please try again.');
    }
  };

  return (
    <div className="App">
      <h1>Enter Your Name</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
        />
        <button type="submit">Submit</button>
      </form>
      <p>{response}</p>
      <h2>All Names:</h2>
      <pre>{message || 'Loading...'}</pre>
    </div>
  );
}

export default App;