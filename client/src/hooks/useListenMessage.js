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
    socket?.on("newMessage", async (newMessage) => {
      newMessage.shake = true
      if (selectedConversation?._id === newMessage.senderId)
        setMessages([...messages, newMessage]);
      const newConversation = {
        user: await getUserById(newMessage.senderId), 
        lastMessage: newMessage,
    };
    const updatedConversationList = [
      newConversation, 
      ...myConversationList.filter(
          (element) => !(element.user && String(element.user._id).trim() === String(newMessage.senderId).trim())
      ), 
  ];
      setMyConversationList(updatedConversationList);
      const audio = new Audio(notificationSound)
      audio.play()
  })
    return () => socket.off("newMessage")
  }, [socket, messages])

}

export async function getUserById(userId) {
  try {
      const response = await fetch(`/api/users/${userId}`, {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
          },
      });
      if (!response.ok) {
          throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }
      const userData = await response.json();
      return userData;
  } catch (error) {
      console.error('Error fetching user:', error.message);
  }
}

export default useListenMessage