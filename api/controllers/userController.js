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

export const getOneUser = async (req, res) => {
    try {
        const { id } = req.params; 
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
    } catch (error) {
        console.log("Error in user controller", error.message);
        res.status(500).json({ message: "Server error" })
    }
}

export const  searchUsers = async (req, res) => {
    try {
        const { query } = req.query; 
        if (!query) {
            return res.status(400).json({ error: 'Query parameter is required' });
        }
        if (query.length < 1) {
            return res.status(400).json({ error: 'Please enter at least 3 characters' });
        }

        const users = await User.find({
            $or: [
                { username: { $regex: query, $options: 'i' } },
                { fullname: { $regex: query, $options: 'i' } }
            ]
        });

        if (users.length === 0) {
            return res.status(200).json({ error: 'No users found' });
        }

        res.status(200).json(users);
    } catch (error) {
        console.error('Error searching for users:', error.message);
        res.status(500).json({ message: 'Server error' });
    }
}