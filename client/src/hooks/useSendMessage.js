import { useState } from "react"
import toast from "react-hot-toast"
import useConversationStore from "./useConversationStore"


const useSendMessage = () => {
  const [loading, setLoading] = useState(false)
  const {selectedConversation, messages, setMessages, myConversationList, setMyConversationList}= useConversationStore()
  
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
      const updatedConversationList = myConversationList.reduce((acc, element) => {
        if (
            element.user &&
            element.user._id &&
            String(element.user._id).trim() === String(data.newMessage.recieverId).trim()
        ) {
            return [
                {
                    ...element,
                    lastMessage: data.newMessage,
                },
                ...acc,
            ];
        }
        return [...acc, element];
    }, []);
    
    setMyConversationList(updatedConversationList);
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }
  return {loading, sendMessage}
}
export default useSendMessage