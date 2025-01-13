import { create } from "zustand";

const useConversationStore = create((set)=>({
    selectedConversation:  null,
    setSelectedConversation: (conversation) => set({selectedConversation:conversation}),
    messages:  [],
    setMessages: (messages) => set({messages}),
    myConversationList: [],
    setMyConversationList: (conversationList) =>
    set({ myConversationList: conversationList })
}))
export default useConversationStore