import { BsSend } from "react-icons/bs"
import { LuSendHorizonal } from "react-icons/lu"

const  MessageInput = () => {
  return (
    <form action="">
      <div className="w-full flex items-center gap-3">
        <input type="text" placeholder="Send a Message" className="flex-1 border rounded-lg p-2.5 text-sm block"/>
        <button type="submit">
          <LuSendHorizonal className="h-8 w-8 mr-5 text-white"/>
        </button>
      </div>
    </form>
  )
}

export default MessageInput