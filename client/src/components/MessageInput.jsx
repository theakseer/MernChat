import { LuSendHorizonal } from "react-icons/lu"
import useSendMessage from "../hooks/useSendMessage"
import toast from "react-hot-toast"
import { useState } from "react"

const  MessageInput = () => {
  const {loading, sendMessage}=useSendMessage()
  const [message, setmessage] = useState('')
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!message) {
      toast.error("Please enter a message")
      return
    }
    await sendMessage(message)
    setmessage("")
  }
  return (
    <form onSubmit={handleSubmit}>
      <div className="w-full flex items-center gap-3">
        <input type="text" placeholder="Send a Message" className="flex-1 border rounded-lg p-2.5 text-sm block"
        value={message}
        onChange={(e)=>setmessage(e.target.value)}
        />
        <button type="submit">
          {
          loading 
          ? <div className="loading loading-spinner h-8 w-8 mr-5"></div> 
          : <LuSendHorizonal className="h-8 w-8 mr-5 text-white"/>
          }
        </button>
      </div>
    </form>
  )
}

export default MessageInput