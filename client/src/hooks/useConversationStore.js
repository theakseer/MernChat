import { create } from "zustand";

const useConversationStore = create((set)=>({
    selectedConversation:  null,
    setSelectedConversation: (conversation) => set({conversation}),
    messages:  [],
    setMessages: (messages) => set([messages]),
    
}))
export default useConversationStore