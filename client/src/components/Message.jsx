import { useAuthContext } from "../context/AuthContext"
import useConversation from "../hooks/useConversationStore"
import {isToday, isYesterday, isThisWeek, isThisYear, isThisMinute, format} from 'date-fns'
import { genProfilePic } from "./Conversation"

const Message = ({ message }) => {
  const { authUser } = useAuthContext()
  const { selectedConversation } = useConversation()
  const shake = message.shake ? "new-message-shake" : ""

  return (
    <>
      <div className={`chat ${message.senderId !== selectedConversation._id ? "chat-end" : "chat-start"} ${shake}`}>
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img
              src={genProfilePic(message.senderId == selectedConversation._id
                ? selectedConversation.fullName
                : authUser.fullName)}
            />
          </div>
        </div>
        <div className="chat-bubble text-white">{message.message}</div>
        <div className="chat-footer opacity-50">{formatDateToLocalTime(message.createdAt)}</div>
      </div>
    </>
  )
}

export default Message

function formatDateToLocalTime(isoString) {
  const date = new Date(isoString);
  let formattedDate;
if (isThisMinute(date)) {
  formattedDate = "Just now";
} else if (isToday(date)) {
    formattedDate = format(date, 'p'); // Today: Time only, e.g., '4:48 PM'
} else if (isYesterday(date)) {
    formattedDate = `Yesterday, ${format(date, 'p')}`; // Yesterday: 'Yesterday, 4:48 PM'
} else if (isThisWeek(date)) {
    formattedDate = `${format(date, 'EEEE, p')}`; // Same week: Day of the week, e.g., 'Wednesday, 4:48 PM'
} else if (isThisYear(date)) {
    formattedDate = format(date, 'MMM d, p'); // Same year: Month day, e.g., 'Aug 7, 4:48 PM'
} else {
    formattedDate = format(date, 'MMM d, yyyy, p'); // Different year: Full date, e.g., 'Aug 7, 2023, 4:48 PM'
}
  return formattedDate;
}