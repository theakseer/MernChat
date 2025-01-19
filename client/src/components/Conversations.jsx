import { useEffect, useRef } from "react"
import { useGetConversation } from "../hooks/useGetConversation"
import Conversation from "./Conversation"

const Conversations = () => {
  const { loading, myConversationList } = useGetConversation()
  const ref = useRef()

  useEffect(() =>{
    ref?.current?.scrollIntoView({behavior: 'smooth'})
  },[myConversationList])
  if (loading) {
    return <div className="loading loading-spinner"></div>
  }
  return (
    <div className="flex flex-col overflow-auto w-full">
      <span ref={ref}></span>
      <div className="text-white">
        <div className="-2">
          {myConversationList?.map((listItem, i) => (
            listItem.user && <Conversation key={i} userChat={listItem.user} lastMessage={listItem?.lastMessage} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Conversations