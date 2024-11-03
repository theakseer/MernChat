import { TiMessage, TiMessages } from "react-icons/ti"
import MessageInput from "./MessageInput"
import Messages from "./Messages"
import { useAuthContext } from "../context/AuthContext"
import useConversation from "../hooks/useConversationStore"
import { useEffect } from "react"

const MessageContainer = () => {
  const {selectedConversation, setSelectedConversation}= useConversation()
  const {authUser}=useAuthContext()
  useEffect(() =>{
    return () => {
      setSelectedConversation(null)
    }
  },[])
  return (
    <div className="flex-2 md:min-w-[450px] flex flex-col border-l border-slate-500 pl-1">
      {
        !selectedConversation
          ? <NoChatSelected />
          : (
            <>
              <div className="bg-slate-400 px-4 py-2 text-left rounded">
                <span className="label-text">To: </span> <span className="text-gray-900 font-bold">{selectedConversation.fullName}</span>
              </div>
              <Messages />
              <MessageInput />
            </>
          )
      }
    </div>
  )
}

export default MessageContainer

const NoChatSelected = () => {
  const {authUser}=useAuthContext()
  return (
    <div className="w-full h-full flex items-center justify-center font-bold text-white">
      <div className="flex items-center justify-center flex-col">
        <p>Welcome 👋 {authUser.fullName}</p>
        <p>Please select a chat to message.</p>
        <TiMessages className="text-3xl"/>
      </div>
    </div>
  )
}
