import Conversation from "../model/conversation.model.js";
import User from "../model/user.model.js";

export const myConversationList = async (req, res) => {
    try {
        const senderId = req.user._id;
        const conversationList = await Conversation.find({
            participants: {
                $all: [senderId]
            },
        }).sort(
            {updatedAt:-1}
        ).select("lastMessage").populate({
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
        if(!conversationList){
            res.status(200).json({message:"No messages with the user", message:"No messages with the user"})
            return
        }
        res.status(200).json({conversationList:conversationList})
    } catch (error) {
        console.log("Error in user controller", error.message);
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