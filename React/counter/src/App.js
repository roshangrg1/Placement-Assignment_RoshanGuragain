import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {
  const [count , setCount] = useState(0)
  return (
    <div className="App">
      <div className='counter'>Counter {count}</div>
        <button onClick={()=>(count>9 ? "":setCount(count + 1))}>Increase</button>
        <button onClick={()=>setCount(count-1)}>Decrease</button>
        <button onClick={()=>{setCount(0)}}>Reset</button>
    </div>
  );
}

export default App;
