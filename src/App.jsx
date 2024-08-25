import React, { useState } from 'react';

function App() {
  const [response, setResponse] = useState('');

  const handlePing = async () => {
    try {
      const result = await window.electronAPI.ping();
      setResponse(result);
    } catch (error) {
      console.error('Error:', error);
      setResponse('Error occurred');
    }
  };

  return (
    <div>
      <h1>Electron IPC Example</h1>
      <button onClick={handlePing}>Ping</button>
      <p>Response: {response}</p>
    </div>
  );
}

export default App;