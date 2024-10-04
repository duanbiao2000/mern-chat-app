// 导入express模块
import express from "express";
// 导入protectRoute中间件
import protectRoute from "../middleware/protectRoute.js";
// 导入getUsersForSidebar控制器
import { getUsersForSidebar } from "../controllers/user.controller.js";

// 创建一个express路由
const router = express.Router();

// 定义一个get请求，路径为“/”，使用protectRoute中间件，调用getUsersForSidebar控制器
router.get("/", protectRoute, getUsersForSidebar);

// 导出路由
export default router;