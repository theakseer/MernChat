import jsonwebtoken from "jsonwebtoken";
import User from "../model/user.model.js";

const protectedRoute = async (req, res, next) => {
    try {
        const cookie = req.cookies.jwt;
        if (!cookie) { return res.status(404).json({ message: "Unauthorized access" }); }
        const decoded = jsonwebtoken.verify(cookie,process.env.JWT_SECRET_KEY)
        if (!decoded) { return res.status(404).json({ message: "Invalid token" }); }
        const user = await User.findById(decoded.userId).select('-password');
        if (!user) { return res.status(404).json({ message: "User not found" }); }
        req.user = user;
        next();
    } catch (error) {
        console.log("Error in proctected middleware");
        res.status(500).json({ message: "Server error", error: error.message })
    }
}

export default protectedRoute;