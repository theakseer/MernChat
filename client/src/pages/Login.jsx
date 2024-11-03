import { useState } from "react"
import { Link, Navigate, useNavigate } from "react-router-dom"
import { useLogin } from "../hooks/useLogin"

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const {loading, signIn}=useLogin()
  const handleSubmit =  (e) => {
    e.preventDefault();
    signIn(username, password)
  }
  return (
    <>
      <div className="flex flex-col justify-center items-center min-w-96 mx-auto ">
        <div className="h-full w-full p-10 bg-white-900 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20">
          <h1 className="text-3xl font-bold text-center text-blue-900 mb-5">
            MernChat
          </h1>
          <form className="flex flex-col gap-5 justify-center items-center" onSubmit={handleSubmit}>
            <label className="input input-bordered flex items-center gap-2">
              Username
              <input type="text" className="grow" placeholder="" 
                value={username}
                onChange={(e)=> setUsername(e.target.value)}
              />
            </label>
            <label className="input input-bordered flex items-center gap-2">
              Password
              <input type="password" className="grow"   
                value={password} 
                onChange={(e)=> setPassword(e.target.value)}
               />
            </label>
            <Link to="/register" className="link link-accent text-blue-400">
              {"Don't"} have an account yet?
            </Link>
            <button className="btn btn-block text-blue-400 btn-sm mt-2"
            //  onClick={handleSubmit}
            >Login</button>
            
          </form>
        </div>
      </div>
    </>
  )
}

export default Login