import { useSocketContext } from "../context/SocketContext"
import useConversationStore from "../hooks/useConversationStore"
import useListenMessage from "../hooks/useListenMessage"
import { formatDateToLocalTime } from "./Message"

const Conversation = ({ userChat, lastMessage }) => {
  const { onlineUsers } = useSocketContext()
  const { selectedConversation, setSelectedConversation } = useConversationStore()
  const isSelected = selectedConversation?._id == userChat?._id
  const isOnline = onlineUsers.includes(userChat?._id)
  const name = userChat?.fullName
  const profilePic = genProfilePic(name) //https://ui-avatars.com/api/?name=John%20Doe
  useListenMessage();
  return (
    <>
      <div className={`flex gap-2 items-center hover:bg-sky-500 ${isSelected && "bg-sky-500"} rounded p-2 py-1 cursor-pointer`}
        onClick={() => setSelectedConversation(userChat)}
      >
        <div className={`avatar ${isOnline && "online"}`}>
          <div className="w-12 rounded-full">
            <img src={profilePic} alt="" />
          </div>
        </div>
        <div className="flex flex-col flex-1 text-left justify-start items-start w-full">
          <p className="font-bold text-gray-200">{userChat?.fullName}</p>
          <p className={`mr-2 w-[160px] overflow-hidden text-sm opacity-50 overflow-ellipsis ${lastMessage?.shake && 'font-bold opacity-100'}`}> {lastMessage && lastMessage.message}</p>
          <p className="self-end text-xs opacity-50"> {lastMessage && formatDateToLocalTime(lastMessage.createdAt)}</p>
        </div>
      </div>
      <div className="divider my-0 py-0 h-1"></div>
      {/* implement last index */}
    </>
  )
}
export function genProfilePic(text) {
  // Simple hash function
  if (!text) text = "DP"
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    hash = (hash * 31 + text.charCodeAt(i)) % 1000; // Ensure it's 3 digits
  }

  // Ensure the hash is always positive and 3 digits
  hash = ('000' + (hash < 0 ? hash + 1000 : hash)).slice(-3);
  return `https://ui-avatars.com/api/?name=${text}&background=${hash}&color=fff&bold=true`
}
export default Conversation