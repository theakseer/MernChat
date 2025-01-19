import { createContext, useContext, useEffect, useState } from "react";
import { useAuthContext } from "./AuthContext";
import { io } from 'socket.io-client'

export const SocketContext = createContext()

export const useSocketContext = () => {
	return useContext(SocketContext)
}

export const SocketContextProvider = ({ children }) => {
	const [socket, setSocket] = useState(null)
	const [onlineUsers, setOnlineUsers] = useState([])
	const {authUser} = useAuthContext()

	useEffect(() => {
		if (authUser) {
			const server = import.meta.env.VITE_ENV_MODE === 'development' ? 'http://localhost:5000' : 'https://mernchat-1xo8.onrender.com'
			const socket = io(server, {
				query : {
					userId: authUser._id,
				}
			})
			setSocket(socket)
			socket.on('getOnlineUsers', (users) => setOnlineUsers(users))
			// console.log(socket)
			return () => socket.close()
		}
		 else{
			if (socket) {
				socket.close();
				setSocket(null);
			}
		 }
	},[authUser])
	return <SocketContext.Provider value={{socket, onlineUsers}}>
		{children}
	</SocketContext.Provider>
}