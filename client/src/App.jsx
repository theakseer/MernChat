import { useState } from 'react'
import './App.css'
import Home from './pages/Home'
import Login from './pages/Login'
import SignUp from './pages/SignUp'

function App() {

  return (
    <div className='p-4 h-screen flex items-center justify-center'>
      <Home/>
    </div>
  )
}

export default App
