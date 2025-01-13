import {Server}from 'socket.io'
import http from 'http'
import express from 'express'

const app = express()
const server = http.createServer(app)
const io = new Server(server, {
    cors:{
        origin: ['http://localhost:3000'],
        methods: ['GET', 'POST'],
    }
})

const onlineUsers = {}; //{userId:socketId}

export const getSocketId = (userID) =>{
    return onlineUsers[userID];
}

io.on('connection',(socket) => {
    const {userId} = socket.handshake.query
    if (userId!=undefined) onlineUsers[userId] = socket.id;

    io.emit("getOnlineUsers", Object.keys(onlineUsers));
    
    socket.on('disconnect',()=>{
        delete onlineUsers[userId];
        io.emit("getOnlineUsers", Object.keys(onlineUsers));
    })
})

export {app, server, io} 