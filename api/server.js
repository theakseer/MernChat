import express from "express"
import dotenv from 'dotenv'
import cookieParser from "cookie-parser"
import path from 'path'

import  authRoutes from './routes/auth.routes.js'
import  messageRoutes from './routes/message.routes.js'
import  userRoutes from './routes/user.routes.js'
import connectDB from "./db/mongoDB.js"
import {app, server} from './socket/socket.js'

dotenv.config()
const __dirname = path.resolve()
const port = process.env.PORT 

app.use(express.static(path.join(__dirname, "client/dist")));
app.use(express.json())
app.use(cookieParser())

app.use("/api/auth", authRoutes)
app.use("/api/messages", messageRoutes)
app.use("/api/users", userRoutes)

app.get("*", (req, res)=>{
    res.sendFile(path.join(__dirname,"client/dist/index.html"));
})

server.listen(port, () => {
    connectDB();
    console.log("listening on port", port)
});