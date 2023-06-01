import React, { useEffect, useState } from 'react';

import './App.css';
import Upload from './components/Upload';

import { ThemeContext, themes } from './context/themeContext'

function App() {
  const [theme, setTheme] = useState(themes.dark)

  function handleOnClick(){
    theme === themes.light ? setTheme(themes.dark) : setTheme(themes.light)
  }

  const body = document.body;
  useEffect(()=>{
    switch(theme){
      case themes.light:
        body.classList.remove('bg-dark')
        body.classList.add('bg-white');
        
        break;

        case themes.dark:
        body.classList.remove('bg-white')
        body.classList.add('bg-dark');

        break;
    }
  })
  return (
    <div className="App">
      <ThemeContext.Provider value={{theme, handleOnClick}}>
        <div className='main'>
          <h1 style={{ text: 'center' }}>Light Dark theme</h1>
          <Upload theme={theme} />
        </div>
      </ThemeContext.Provider>

    </div>
  );
}

export default App;
