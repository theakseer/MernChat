import { useState } from "react"
import { useAuthContext } from "../context/AuthContext"
import toast from "react-hot-toast"

export const useLogin = () => {
    const [loading, setLoading] = useState(false)
    const { setAuthUser } = useAuthContext()
    const signIn = async (username,password)=>{
        const checkInput = checkInputs(username,password)
        if (!checkInput) return;
        
        setLoading(true)
        try {
            const res = await fetch(`/api/auth/login`,{
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({username ,password})
            })
            const data = await res.json()
            if (data.error) {
                throw new Error(data.error)
            }
            localStorage.setItem("authUser", JSON.stringify(data))
            setAuthUser(data)
        } catch (error) {
            toast.error(error.message || "Something went wrong")
        } finally {}
    }
    return { loading, signIn }
}

function checkInputs(username,password){
    if (!username || !password){
        toast.error("Please enter all details")
        return false
    }
    return true
}