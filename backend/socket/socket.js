import { Server } from "socket.io"; // 导入socket.io库
import http from "http"; // 导入http库
import express from "express"; // 导入express库

const app = express(); // 创建express实例

const server = http.createServer(app); // 创建http服务器
const io = new Server(server, { // 创建socket.io服务器
	cors: { // 设置跨域
		origin: ["http://localhost:3000"], // 允许的源
		methods: ["GET", "POST"], // 允许的方法
	},
});

export const getReceiverSocketId = (receiverId) => { // 获取接收者的socketId
	return userSocketMap[receiverId];
};

const userSocketMap = {}; // 存储用户socketId的映射

io.on("connection", (socket) => { // 监听连接事件
	console.log("a user connected", socket.id); // 打印连接的用户id

	const userId = socket.handshake.query.userId; // 获取连接用户的id
	if (userId != "undefined") userSocketMap[userId] = socket.id; // 将用户id和socketId存入映射

	// io.emit() is used to send events to all the connected clients // 向所有连接的客户端发送事件
	io.emit("getOnlineUsers", Object.keys(userSocketMap)); // 发送在线用户列表

	// socket.on() is used to listen to the events. can be used both on client and server side // 监听事件，可以在客户端和服务器端使用
	socket.on("disconnect", () => { // 监听断开连接事件
		console.log("user disconnected", socket.id); // 打印断开连接的用户id
		delete userSocketMap[userId]; // 从映射中删除用户id
		io.emit("getOnlineUsers", Object.keys(userSocketMap)); // 发送在线用户列表
	});
});

export { app, io, server }; // 导出app、io、server