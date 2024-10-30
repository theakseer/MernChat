import User from "../model/user.model.js";

export const singleUser = (req, res) => {
    try {
        
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