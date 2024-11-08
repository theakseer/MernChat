import { useState } from "react"
import { Link } from "react-router-dom"
import useSignUp from "../hooks/useSignUp"

const SignUp = () => {
  const [input, setInputs] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: ""
  })
  const {signUp, loading} = useSignUp()
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(input);
    const res = await signUp(input)
  }
  return (
    <div className="flex flex-col justify-center items-center min-w-96 mx-auto ">
      <div className="h-full w-full p-10 bg-white-900 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20">
        <h1 className="text-3xl font-bold text-center p-2 rounded inline-block text-blue-900 mb-2">
          MernChat
        </h1>
        <form action="" className="flex flex-col gap-4">
          <label className="input input-bordered input-sm flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70">
              <path
                d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
            </svg>
            <input type="text" className="grow" placeholder="Full Name"
              value={input.fullName}
              onChange={(e) => setInputs({ ...input, fullName: e.target.value })}
            />
          </label>
          <label className="input input-bordered input-sm flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70">
              <path
                d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
            </svg>
            <input type="text" className="grow" placeholder="Username"
              value={input.username}
              onChange={(e) => setInputs({ ...input, username: e.target.value })}
            />
          </label>
          <label className="input input-bordered input-sm flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70">
              <path
                fillRule="evenodd"
                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                clipRule="evenodd" />
            </svg>
            <input type="password" placeholder="Password"
              value={input.password}
              onChange={(e) => setInputs({ ...input, password: e.target.value })}
            />
          </label>
          <label className="input input-sm input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70">
              <path
                fillRule="evenodd"
                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                clipRule="evenodd" />
            </svg>
            <input type="password" placeholder="Confirm Password"
              value={input.confirmPassword}
              onChange={(e) => setInputs({ ...input, confirmPassword: e.target.value })}
            />
          </label>
          <div className="flex items-center justify-center text-white gap-2">
            <label htmlFor="" className="flex items-center gap-2 justify-center">
              Male
              <input
                type="checkbox"
                checked={input.gender === "male"}
                onChange={() => setInputs({ ...input, gender: "male" })}
                className="checkbox border-orange-400 [--chkbg:theme(colors.indigo.600)] [--chkfg:orange] checked:border-indigo-800" />
            </label>
            <label htmlFor="" className="flex gap-2 items-center justify-center">
              Female
              <input
                type="checkbox"
                checked={input.gender === "female"}
                onChange={() => setInputs({ ...input, gender: "female" })}
                className="checkbox border-blue-50 [--chkbg:oklch(var(--a))] [--chkfg:oklch(var(--p))]" />
            </label>
          </div>
          <Link to="/login" className="link link-accent text-blue-400">
            Already registered?
          </Link>
          <button className="btn btn-block text-blue-400 btn-sm mt-2"
          onClick={handleSubmit}
          >
            Login
          </button>

        </form>
      </div>
    </div>
  )
}

export default SignUp