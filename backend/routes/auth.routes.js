// 导入express模块
import express from "express";
// 导入auth.controller.js中的login、logout、signup函数
import { login, logout, signup } from "../controllers/auth.controller.js";

// 创建一个express路由
const router = express.Router();

// 定义一个post请求，用于用户注册
router.post("/signup", signup);

// 定义一个post请求，用于用户登录
router.post("/login", login);

// 定义一个post请求，用于用户登出
router.post("/logout", logout);

// 导出路由
export default router;