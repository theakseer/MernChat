import mongoose from "mongoose";
const connectDB = async function(){
    try {
        await mongoose.connect(process.env.MONGODB_CONNECTION_URL)
        console.log("Connected to MongoDB");
    } catch (error) {
        console.log("Error connecting to DB:", error);       
    }
}
export default connectDB