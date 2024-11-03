import useConversation from "../hooks/useConversationStore"
import { useMessages } from "../hooks/useMessages"

const Message = ({ person }) => {
  const {messages}=useMessages()
  const {selectedConversation} = useConversation()
  return (
    <>
      <div className={`chat ${person}`}>
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img
              src={selectedConversation.profilePic} />
          </div>
        </div>
        <div className="chat-bubble">You were the Chosen One!</div>
        <div className="chat-footer opacity-50">Delivered
          <time className="text-xs opacity-50">12:45</time>
        </div>
      </div>
    </>
  )
}

export default Message