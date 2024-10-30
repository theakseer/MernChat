const Login = () => {
  return (
    <>
      <div className="flex flex-col justify-center items-center min-w-96 mx-auto ">
        <div className="h-full w-full p-10 bg-white-900 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20">
          <h1 className="text-3xl font-bold text-center text-blue-400 mb-5">
            MernChat
          </h1>
          <form className="flex flex-col gap-5 justify-center items-center">
            <label className="input input-bordered flex items-center gap-2">
              Username
              <input type="text" className="grow" placeholder="" />
            </label>
            <label className="input input-bordered flex items-center gap-2">
              Password
              <input type="password" className="grow"    />
            </label>
            <a href="#" className="link link-accent text-blue-400">
              {"Don't"} have an account yet?
            </a>
            <button className="btn btn-block text-blue-400 btn-sm mt-2">Login</button>
            
          </form>
        </div>
      </div>
    </>
  )
}

export default Login