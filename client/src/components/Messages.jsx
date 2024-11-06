import { TiMessages } from "react-icons/ti"
import useConversation from "../hooks/useConversationStore"
import { useMessages } from "../hooks/useMessages"
import Message from "./Message"
import { useEffect, useRef } from "react"
import useListenMessage from "../hooks/useListenMessage"

const  Messages = () => {
  const {messages} = useConversation()
  const {loading} = useMessages()
  const ref = useRef()
  
  useListenMessage();
  useEffect(()=>{
    setTimeout(()=>{
      ref?.current?.scrollIntoView({behavior: 'smooth'})
    },100)
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
      <span ref={ref}></span>
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