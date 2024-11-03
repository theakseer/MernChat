import { useState } from "react"
import toast from "react-hot-toast"
import { useAuthContext } from "../context/AuthContext"

const useSignUp = () => {
    const {setAuthUser} = useAuthContext()
    const [loading, setLoading] = useState(false)
    const signUp = async ({fullName, username, password, confirmPassword, gender}) => {
        const inputErrors = handleInputErrors({fullName, username, password, confirmPassword, gender})
        if (!inputErrors) return;
        setLoading(true)
        try {
            const res = await fetch(`/api/auth/register`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({fullName, username, password, confirmPassword, gender})
            })
            const data = await res.json();
            if (data.error) {
                throw new Error(data.error)
            }
            // console.log(data)
            // set user in local storage
            localStorage.setItem('authUser', JSON.stringify(data));
            setAuthUser(data)
            return data
        } catch (error) {
            // console.log(error)
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }

    return { loading, signUp }
}

export default useSignUp

function handleInputErrors({fullName, username, password, confirmPassword, gender}) {
    if (!fullName || !username || !password || !confirmPassword || !gender) {
        toast.error('Please enter in all fields.')
        return false
    }
    if (password!==confirmPassword) {
        toast.error('Paswords do not match')
        return false
    }
    if (password.length < 6) {
        toast.error('Password must be at least 6 characters')
        return false
    }
    return true
}