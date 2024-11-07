import { useSocketContext } from "../context/SocketContext"
import  useConversationStore from "../hooks/useConversationStore"

const  Conversation = ({userChat}) => {
  const {onlineUsers}= useSocketContext()
  const {selectedConversation, setSelectedConversation} = useConversationStore()
  const isSelected = selectedConversation?._id == userChat._id
  const isOnline = onlineUsers.includes(userChat?._id)
  const name = userChat?.fullName
  const profilePic = genProfilePic(name) //https://ui-avatars.com/api/?name=John%20Doe
  return (
    <>
    <div className={`flex gap-2 items-center hover:bg-sky-500 ${isSelected && "bg-sky-500"} rounded p-2 py-1 cursor-pointer`}
    onClick={() =>setSelectedConversation(userChat)}
    >
      <div className={`avatar ${isOnline && "online"}`}>
        <div className="w-12 rounded-full">
          <img src={profilePic} alt="" />
        </div>
      </div>
      <div className="flex flex-row flex-1 gap-3 justify-between">
        <p className="font-bold text-gray-200">{userChat.fullName}</p>
        <span className="last-seen"></span>
      </div>
    </div>
    <div className="divider my-0 py-0 h-1"></div>
    {/* implement last index */}
    </>
  )
}
export function genProfilePic(text) {
  // Simple hash function
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    hash = (hash * 31 + text.charCodeAt(i)) % 1000; // Ensure it's 3 digits
  }
  
  // Ensure the hash is always positive and 3 digits
  hash =  ('000' + (hash < 0 ? hash + 1000 : hash)).slice(-3);
  return `https://ui-avatars.com/api/?name=${text}&background=${hash}&color=fff&bold=true`
}
export default Conversation