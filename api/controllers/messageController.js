import Message from "../model/message.model.js";
import Conversation from "../model/conversation.model.js";
import { getSocketId, io } from "../socket/socket.js";

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
        if (newMessage) {
            conversation.messages.push(newMessage._id);
            conversation.lastMessage = newMessage._id;
        }
        await conversation.save();
        // socket io 
        const recipientSocket = getSocketId(recieverId);
        if (recipientSocket) {
            io.to(recipientSocket).emit("newMessage", newMessage); // send new message to recipient socket
        }
        res.status(200).json({ newMessage })

    } catch (error) {
        console.log("Error in message controler", error.message);
        res.status(500).json({ message: "Server error" })
    }
}

export const getMessages = async (req, res) => {
    try {
        const { id: recieverId } = req.params
        const senderId = req.user._id;
        const messages = await Conversation.findOne({
            participants: {
                $all: [recieverId, senderId]
            }
        }).select("messages").populate({
            path: 'messages',
            model: 'Message', // Specify the model 
            select: 'message senderId recieverId createdAt ',  
        });
        if(!messages){
            res.status(200).json({error:"No messages with the user", message:"No messages with the user"})
            return
        }
        res.status(200).send(messages.messages)
    } catch (error) {
        console.log("Error in message controller", error.message);
        res.status(500).json({ message: "Server error" })
    }
}


export default sendMessage;