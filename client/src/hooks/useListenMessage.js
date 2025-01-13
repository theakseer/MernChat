import { useEffect } from "react"
import { useSocketContext } from "../context/SocketContext"
import useConversationStore from "./useConversationStore"
import notificationSound from "../assets/notification.mp3"
import { useGetConversation } from "./useGetConversation"
import { useAuthContext } from "../context/AuthContext"

const useListenMessage = () => {
  const { socket } = useSocketContext()
  const { messages, setMessages, myConversationList, setMyConversationList, selectedConversation } = useConversationStore()


  useEffect(() => {
    socket?.on("newMessage", (newMessage) => {
      newMessage.shake = true
      console.log("newMessage:",newMessage)
      console.log("myConversationList:",myConversationList)
      if (selectedConversation?._id === newMessage.senderId)
        setMessages([...messages, newMessage]);
      const updatedConversationList = myConversationList.map((element) => {
        if (element.user && element.user._id && String(element.user._id).trim() === String(newMessage.senderId).trim()) {
            return {
                ...element,
                lastMessage: newMessage,
            };
        }
        return element; // Return unchanged elements
    });
      setMyConversationList(updatedConversationList);
      const audio = new Audio(notificationSound)
      audio.play()
  })
    return () => socket.off("newMessage")
  }, [socket, messages])

}
export default useListenMessage