import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  

  return (
    <>
      <p>TODO</p>
      <label htmlFor="NewList">Add New List</label>
      <input type="text" name="NewText" id="NewText" />
      <input type="submit" value="submit" />
      <form>
        <input type="checkbox" name="List1" id="List1" />
        <input type="button" value="Delete" />
      </form>
    </>
  )
}

export default App
