import { useEffect } from "react"
import  useConversationStore from "../hooks/useConversationStore"
import { useMessages } from "../hooks/useMessages"
const  Conversation = ({userChat}) => {
  const {selectedConversation, setSelectedConversation} = useConversationStore()
  const isSelected = selectedConversation?._id == userChat._id
  return (
    <>
    <div className={`flex gap-2 items-center hover:bg-sky-500 ${isSelected && "bg-sky-500"} rounded p-2 py-1 cursor-pointer`}
    onClick={() =>setSelectedConversation(userChat)}
    >
      <div className="avatar online">
        <div className="w-12 rounded-full">
          <img src={userChat.profilePic} alt="" />
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

export default Conversation