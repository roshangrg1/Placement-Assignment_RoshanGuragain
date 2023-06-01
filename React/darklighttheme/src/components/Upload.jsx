import React, { useContext } from 'react'
import { ThemeContext } from '../context/themeContext'

import './Upload.css'

const Upload = () => {
    const{ theme, handleOnClick} = useContext(ThemeContext)
  return (
    <div>
        <h3>My Upload with {theme}</h3>
        <button onClick={handleOnClick} className={`btn ${theme=== "dark" ? 'light' : 'dark'}`}>{theme=== 'dark' ?'light' : "dark"}</button>
    </div>
  )
}

export default Upload