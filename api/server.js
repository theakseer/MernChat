import express from "express"
import dotenv from 'dotenv'
import cookieParser from "cookie-parser"

import  authRoutes from './routes/auth.routes.js'
import  messageRoutes from './routes/message.routes.js'
import  userRoutes from './routes/user.routes.js'
import connectDB from "./db/mongoDB.js"

dotenv.config()
const app = express()
const port = process.env.PORT 

app.use(express.json())
app.use(cookieParser())

app.use("/api/auth", authRoutes)
app.use("/api/messages", messageRoutes)
app.use("/api/users", userRoutes)

app.listen(port, () => {
    connectDB();
    console.log("listening on port", port)
});