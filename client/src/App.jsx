import { useState } from 'react'
import './App.css'
import Home from './pages/Home'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { useAuthContext } from './context/AuthContext'

function App() {
  const {authUser} = useAuthContext()
  return ( 
    <div className='p-4 h-screen flex items-center justify-center'>
      <Routes>
        <Route path='/' element={authUser==null ? <Navigate to='/login'/> : <Home/>} />
        <Route path='/login' element={authUser !==null ? <Navigate to='/'/> : <Login/>} />
        <Route path='/register' element={authUser !==null ? <Navigate to='/'/>: <SignUp/>} />
      </Routes>
      <Toaster/>
    </div>
  )
}

export default App
