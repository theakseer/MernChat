import User from "../model/user.model.js";
import bcrypt from "bcryptjs"
import generateAccessToken from "../utils/genereteJWT.js";

export const signUp = async (req, res) => {
    try {
        const { fullName, username, password, confirmPassword, gender } = req.body;
        if (password !== confirmPassword) {
            return res.status(400).json({ error: "Password do not match" });
        }
        const user = await User.findOne({ username });
        if (user) {
            return res.status(400).json({ error: "Username already in use" });
        }
        // hash password here
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt);

        const boyProfile = `https://avatar.iran.liara.run/public/boy?username=${username}`
        const girlProfile = `https://avatar.iran.liara.run/public/girl?username=${username}`

        const newUser = new User({
            fullName,
            username,
            gender,
            password: hashedPassword,
            profilePic: gender === 'male' ? boyProfile : girlProfile
        });
        if (newUser) {
            generateAccessToken(newUser._id, res)
            await newUser.save();
            res.status(200).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                username: newUser.username,
                profilePic: newUser.profilePic
            });
        }
        else {
            res.status(404).json({ message: 'Invalid user details' });
        }
    } catch (error) {
        console.log("Error registering user:", error);
        res.status(500).json({ message: "Internal Server Error, " + error.message });
    }
}
export const logIn = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });

        const isPasswordMatch = await bcrypt.compare(password, user.password || "")
        if (!isPasswordMatch || !user) {
            return res.status(404).json({ error: 'Invalid user credentials' });
        }
        generateAccessToken(user._id, res)
        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            username: user.username,
            profilePic: user.profilePic,

        });

    } catch (error) {
        console.log("Error logging in:", error);
        res.status(500).json({ error: "Internal Server Error, " + error.message });
    }
}
export const logOut = (req, res) => {
    try {
        res.cookie('jwt',"",{maxAge:0})
        res.status(200).json({message: "logged out successfully"})
    } catch (error) {
        console.log("Error logging in:", error);
        res.status(500).json({ message: "Internal Server Error, " + error.message });
    }
}