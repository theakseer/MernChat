import { useEffect, useState } from "react"
import toast from "react-hot-toast"

export const useGetConversation = () => {
  const [loading, setLoading] = useState(false)
  const [userChatList, setUserChatList] = useState([])

  useEffect(() => {
    const getUserChatlist = async () => {
      setLoading(true)
      try {
        const res = await fetch(`/api/users/all`)
        const data = await res.json()
        if (data.error) {
          throw new Error(data.error)
        }
        // console.log(data)
        setUserChatList(data.allUsers)
      } catch (error) {
        toast.error("Something went wrong ", error.message)
      } finally {
        setLoading(false)
      }
    }
    getUserChatlist()
  }, [])
  return { loading, userChatList }
}
