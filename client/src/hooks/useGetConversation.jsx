import { useEffect, useState } from "react"
import toast from "react-hot-toast"

export const useGetConversation = () => {
  const [loading, setLoading] = useState(false)
  const [userChatList, setUserChatList] = useState([])
  const [myConversationList, setMyConversationList] = useState([])

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
    const getMyConversationList = async () => {
      setLoading(true)
      try {
        const res = await fetch(`/api/users/myConversationList`)
        const data = await res.json()
        if (data.error) {
          throw new Error(data.error)
        }
        setMyConversationList(data.conversationList)
        console.log(data.conversationList)
      } catch (error) {
        console.log("this is error",error)
        toast.error("Something went wrong in myconver", error.message)
      } finally {
        setLoading(false)
      }
    }
    getMyConversationList() 
    getUserChatlist()
  }, [])
  return { loading, userChatList, myConversationList}
}
