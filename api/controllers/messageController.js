import Message from "../model/message.model.js";
import Conversation from "../model/conversation.model.js";

const sendMessage = async (req, res) => {
    try {
        const { message } = req.body;
        const { id: recieverId } = req.params;
        const senderId = req.user._id;
        const newMessage = new Message({
            message,
            recieverId,
            senderId,
        });
        await newMessage.save();

        let conversation = await Conversation.findOne({
            participants: {
                $all: [recieverId, senderId]
            }
        })
        if (!conversation) {
            conversation = await Conversation.create({
                participants: [recieverId, senderId]
            })
        }
        if (newMessage) conversation.messages.push(newMessage._id);
        // socket io 

        await conversation.save();
        res.status(200).send({ message: "message successfully sent" })

    } catch (error) {
        console.log("Error in message controler", error.message);
        res.status(500).json({ message: "Server error" })
    }
}

export const getMessages = async (req, res) => {
    try {
        const { id: recieverId } = req.params
        const senderId = req.user._id;
        const messages = await Message.find({
                senderId,recieverId
        })
        
        res.status(200).json({ messages: messages })
    } catch (error) {
        console.log("Error in message controler", error.message);
        res.status(500).json({ message: "Server error" })
    }
}


export default sendMessage;