import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import useConversation from "./useConversationStore"

export const useMessages = () => {
  const [loading, setLoading] = useState(false)
  const [messages, setMessages] = useState([])
  const {selectedConversation}= useConversation()

  useEffect(()=>{
    const getMessages = async () => {
      setLoading(true)
      try {
        const res = await fetch(`/api/messages/${selectedConversation._id}`)
        const data = await res.json()
        if (data.error) {
          throw new Error(data.error)
        }
        console.log(data.messages)
        setMessages(data.messages)
      } catch (error) {
        toast.error("Something went wrong ", error.message)
      } finally {
        setLoading(false)
      }
    }
    getMessages()
  },[selectedConversation])
  return { loading, messages }
}
