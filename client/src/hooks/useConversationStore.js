import { create } from "zustand";

const useConversation = create((set)=>({
    selectedConversation:  null,
    setSelectedConversation: (conversation) => set({selectedConversation:conversation}),
    messages:  [],
    setMessages: (messages) => set({messages}),
    myConversationList: null,
    setMyConversationList:(list) => set({list}),
}))
export default useConversation