import express from "express";
import { getMessages, sendMessage } from "../controllers/message.controller.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

// 定义一个处理GET请求的路由，该路由用于根据特定ID获取消息
// 此路由中间件首先会通过protectRoute验证用户是否已通过身份验证
// 如果验证通过，则调用getMessages函数处理消息的获取
router.get("/:id", protectRoute, getMessages);
router.post("/send/:id", protectRoute, sendMessage);

export default router;
