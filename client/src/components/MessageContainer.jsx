import { TiMessage, TiMessages } from "react-icons/ti"
import MessageInput from "./MessageInput"
import Messages from "./Messages"

const MessageContainer = () => {
  const noChatSelected = false
  return (
    <div className="flex-2 md:min-w-[450px] flex flex-col border-l border-slate-500 pl-1">
      {
        noChatSelected
          ? <NoChatSelected />
          : (
            <>
              <div className="bg-slate-400 px-4 py-2 text-left rounded">
                <span className="label-text">To: </span> <span className="text-gray-900 font-bold">James Doe</span>
              </div>
              <Messages />
              <MessageInput />
            </>
          )
      }
    </div>
  )
}

export default MessageContainer

const NoChatSelected = () => {
  return (
    <div className="w-full h-full flex items-center justify-center font-bold text-white">
      <div className="flex items-center justify-center flex-col">
        <p>Welcome 👋 Jane Doe</p>
        <p>Please select a chat to message.</p>
        <TiMessages className="text-3xl"/>
      </div>
    </div>
  )
}
