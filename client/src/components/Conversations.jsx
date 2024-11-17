import useConversation from "../hooks/useConversationStore"
import { useGetConversation } from "../hooks/useGetConversation"
import Conversation from "./Conversation"

const Conversations = () => {
  const { loading, userChatList, myConversationList } = useGetConversation()

  if (loading) {
    return <div className="loading loading-spinner"></div>
  }
  return (
    <div className="flex flex-col overflow-auto w-full">
      <div role="tablist" className="tabs tabs-bordered text-white">
        <input type="radio"
          name="my_tabs_2"
          role="tab"
          className={`tab text-white`}
          aria-label="My Chats"
          defaultChecked
          />
        <div role="tabpanel"
          className="tab-content pt-2">
          {myConversationList?.map(listItem => (
            <Conversation key={listItem._id} userChat={listItem?.participants[0]} lastMessage={listItem?.lastMessage} />
          ))}
        </div>
        <input
          type="radio"
          name="my_tabs_2"
          role="tab"
          className={`tab text-white `}
          aria-label="All Users"
        />
        <div role="tabpanel" className="tab-content pt-2">
          {userChatList?.map(listItem => (
            <Conversation key={listItem._id} userChat={listItem} lastMessage={listItem?.lastMessage} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Conversations