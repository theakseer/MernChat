import { useEffect } from "react"
import { useSocketContext } from "../context/SocketContext"
import useConversation from "./useConversationStore"
import notificationSound from "../assets/notification.mp3"

const useListenMessage = () => {
  const {socket}= useSocketContext()
  const {messages, setMessages}= useConversation()


  useEffect(()=>{
    socket?.on("newMessage", (newMessage)=>{
      const audio = new Audio(notificationSound)
      audio.play()
      newMessage.shake = true
      setMessages([...messages, newMessage])
      // console.log(newMessage)
    })
    return ()=> socket.off("newMessage")
  }, [socket, messages, setMessages])

}
export default useListenMessage