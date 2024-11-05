import { useState } from "react"
import toast from "react-hot-toast"
import useConversation from "./useConversationStore"


const useSendMessage = () => {
  const [loading, setLoading] = useState(false)
  const {selectedConversation, messages, setMessages}= useConversation()
  
  const sendMessage = async (message) => {
    setLoading(true)
    try {
      const res = await fetch(`/api/messages/send/${selectedConversation._id}`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({message})
      })
      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }
      setMessages([...messages,{...data.newMessage}])
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }
  return {loading, sendMessage}
}
export default useSendMessage