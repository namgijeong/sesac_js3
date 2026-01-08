import { useState } from 'react';
import './App.css';

function App() {
  const [count, setCount] = useState(0);

  const countIncrement = () => {
    setCount(count+1);
  }

  return (
    <>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={countIncrement}>count is {count}</button>
      </div>
      <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
    </>
  );
}

export default App;
