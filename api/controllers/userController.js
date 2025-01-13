import Conversation from "../model/conversation.model.js";
import User from "../model/user.model.js";

export const myConversationList = async (req, res) => {
    try {
        const senderId = req.user._id;
        const conversationList = await Conversation.find({
            participants: {
                $all: [senderId]
            },
        }).sort({
            updatedAt:-1
        })
        .select("lastMessage").populate({
            path: "participants",
            model: "User",
            match: { _id: { $ne: senderId } },
            select: "-password -updatedAt",
          })
          .populate({
            path: "lastMessage",
            model: "Message",
            match: { _id: { $ne: null } },
            select: "message senderId recieverId createdAt", 
          });
          if (!conversationList || conversationList.length === 0) {
            return res.status(200).json({
                error: "No messages found",
                message: "You have no conversations.",
            });
        }
        const result = conversationList.map((conversation) => {
            const otherUser = conversation.participants.find(
                (participant) => participant._id.toString() !== senderId.toString()
            );
    
            return {
                user:otherUser,
                lastMessage:conversation.lastMessage,
            };
        });

        res.status(200).json({conversationList:result})
    } catch (error) {
        console.log("Error in user controller:", error.message);
        res.status(500).json({ message: "Server error" })
    }
}

export const allUsers = async (req, res) => {
    try {
        const currentUserId = req.user._id;
        const allUsers = await User.find({_id: {$ne: currentUserId}}).select("-password -updatedAt")
        res.status(200).json({allUsers: allUsers})
    } catch (error) {
        console.log("Error in user controller", error.message);
        res.status(500).json({ message: "Server error" })
    }
}