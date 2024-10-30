import Message from "./Message"

const  Messages = () => {
  return (
    <div className="grow overflow-auto mb-1">
        <Message person={"chat-end"}/>
        <Message person={"chat-start"}/>
        <Message person={"chat-end"}/>
        <Message person={"chat-end"}/>
        <Message person={"chat-end"}/>
        <Message person={"chat-end"}/>
        <Message person={"chat-end"}/>
        <Message person={"chat-end"}/>
        <Message person={"chat-end"}/>
        <Message person={"chat-start"}/>
    </div>
  )
}

export default Messages