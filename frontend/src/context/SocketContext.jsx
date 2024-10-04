import { createContext, useState, useEffect, useContext } from "react";
import { useAuthContext } from "./AuthContext";
import io from "socket.io-client";

// 创建一个SocketContext，用于在组件之间共享socket和在线用户信息
const SocketContext = createContext();

// 创建一个自定义hook，用于获取SocketContext的值
export const useSocketContext = () => {
	return useContext(SocketContext);
};

// 创建一个SocketContextProvider组件，用于提供socket和在线用户信息
export const SocketContextProvider = ({ children }) => {
	// 使用useState来存储socket和在线用户信息
	const [socket, setSocket] = useState(null);
	const [onlineUsers, setOnlineUsers] = useState([]);
	// 使用useAuthContext来获取当前登录的用户信息
	const { authUser } = useAuthContext();

	// 使用useEffect来监听authUser的变化，当authUser发生变化时，创建一个新的socket连接
	useEffect(() => {
		if (authUser) {
			// 使用socket.io-client来创建一个新的socket连接
			const socket = io("https://chat-app-yt.onrender.com", {
				query: {
					userId: authUser._id,
				},
			});

			// 将socket存储到state中
			setSocket(socket);

			// socket.on()是用于监听事件的，可以在客户端和服务器端同时使用
			socket.on("getOnlineUsers", (users) => {
				// 将在线用户信息存储到state中
				setOnlineUsers(users);
			});

			// 返回一个函数，用于在组件卸载时关闭socket连接
			return () => socket.close();
		} else {
			// 如果没有登录的用户，关闭socket连接
			if (socket) {
				socket.close();
				setSocket(null);
			}
		}
	}, [authUser]);

	// 将socket和在线用户信息作为value传递给SocketContext.Provider
	return <SocketContext.Provider value={{ socket, onlineUsers }}>{children}</SocketContext.Provider>;
};
