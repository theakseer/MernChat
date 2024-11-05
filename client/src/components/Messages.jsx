import { TiMessages } from "react-icons/ti"
import useConversation from "../hooks/useConversationStore"
import { useMessages } from "../hooks/useMessages"
import Message from "./Message"
import { useEffect } from "react"

const  Messages = () => {
  const {messages} = useConversation()
  const {loading} = useMessages()
  useEffect(()=>{
    
  }, [messages])
  if (loading) {
    return <div className="grow overflow-auto mb-1 flex items-center justify-center"> <div className="loading loading-spinner"></div> </div>
  }
  if (!messages || messages.length==0) {
    return <NoMessages/>
  }
  return (
    <div className="grow overflow-auto mb-1">
      {
        messages?.map((chat, i)=> (
          <Message message={chat} key={i}/>
        ))
      }
    </div>
  )
}

export default Messages

const NoMessages = () => {
  const {selectedConversation} = useConversation()

  return (
    <div className="w-full h-full flex items-center justify-center font-bold text-white">
      <div className="flex items-center justify-center flex-col">
        <p>Start a conversatin with {selectedConversation.fullName}</p>
        <TiMessages className="text-3xl"/>
      </div>
    </div>
  )
}