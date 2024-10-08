// 导入path模块
import path from "path";
// 导入express模块
import express from "express";
// 导入dotenv模块
import dotenv from "dotenv";
// 导入cookie-parser模块
import cookieParser from "cookie-parser";

// 导入authRoutes模块
import authRoutes from "./routes/auth.routes.js";
// 导入messageRoutes模块
import messageRoutes from "./routes/message.routes.js";
// 导入userRoutes模块
import userRoutes from "./routes/user.routes.js";

// 导入connectToMongoDB模块
import connectToMongoDB from "./db/connectToMongoDB.js";
// 导入socket模块
import { app, server } from "./socket/socket.js";

// 配置dotenv
dotenv.config();

const __dirname = path.resolve();
// PORT should be assigned after calling dotenv.config() because we need to access the env variables. Didn't realize while recording the video. Sorry for the confusion.
const PORT = process.env.PORT || 5000;

// 使用express.json中间件来解析传入的JSON请求体（来自req.body）
app.use(express.json());
// 使用cookie-parser中间件来解析cookie
app.use(cookieParser());

// 挂载认证相关的API路由
app.use("/api/auth", authRoutes);
// 挂载消息相关的API路由
app.use("/api/messages", messageRoutes);
// 挂载用户相关的API路由
app.use("/api/users", userRoutes);

// 设置静态资源目录，将前端构建后的静态文件设为可访问
app.use(express.static(path.join(__dirname, "/frontend/dist")));

/**
 * 处理所有路由请求
 * 当URL路径不匹配其他任何路由时，将请求引导至前端构建的HTML文件
 * 这允许前端路由来接管页面导航
 * 
 * @param {String} req - 请求对象，包含客户端请求的细节
 * @param {Object} res - 响应对象，用于发送响应回客户端
 */
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

server.listen(PORT, () => {
	connectToMongoDB();
	console.log(`Server Running on port ${PORT}`);
});
