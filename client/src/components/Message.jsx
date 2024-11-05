import { useAuthContext } from "../context/AuthContext"
import useConversation from "../hooks/useConversationStore"

const Message = ({ message }) => {
  const { authUser } = useAuthContext()
  const { selectedConversation } = useConversation()


  return (
    <>
      <div className={`chat ${message.senderId !== selectedConversation._id ? "chat-end" : "chat-start"}`}>
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img
              src={message.senderId == selectedConversation._id
                ? selectedConversation.profilePic
                : authUser.profilePic}
            />
          </div>
        </div>
        <div className="chat-bubble text-white">{message.message}</div>
        <div className="chat-footer opacity-50">Delivered 12:45</div>
      </div>
    </>
  )
}

export default Message