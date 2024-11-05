import { useGetConversation } from "../hooks/useGetConversation"
import Conversation from "./Conversation"

const  Conversations = () => {
  const {loading, userChatList}=useGetConversation()
  
  if (loading) {
    return <div className="loading loading-spinner"></div>
  }
  return (
    <div className="flex flex-col overflow-auto">
        {userChatList.map(listItem=>(
          <Conversation key={listItem._id} userChat={listItem}/>
        ))}
    </div>
  )
}

export default Conversations