import { useEffect, useState } from "react"
import useConversation from "./useConversationStore"

export const useMessages = () => {
  const [loading, setLoading] = useState(false)
  const {selectedConversation, setMessages, messages}= useConversation()

  useEffect(()=>{
    const getMessages = async () => {
      setLoading(true)
      try {
        const res = await fetch(`/api/messages/${selectedConversation._id}`).catch(err=> console.log("Error fetching:", err))
        const data = await res.json()
        // console.log(data)
        if (data.error) {
          throw new Error(data.error)
        }
        setMessages(data)
        // console.log(res)
      } catch (error) {
        // toast.error(error.message)
        setMessages([])
      } finally {
        setLoading(false)
      }
    }
    if (selectedConversation?._id) getMessages()
  },[selectedConversation?._id] )
  return { loading }
}
