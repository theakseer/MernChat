import { BiLogOut } from "react-icons/bi"
import useLogout from "../hooks/useLogout"

const  LogoutButton = () => {
  const {loading, logout} = useLogout()
  return (
    <div className="mt-auto pt-2">
      {loading ? <div className="loading loading-spinners"></div> : <BiLogOut onClick={logout} className="w-6 h-6 text-white cursor-pointer"/> }
    </div>
  )
}

export default LogoutButton