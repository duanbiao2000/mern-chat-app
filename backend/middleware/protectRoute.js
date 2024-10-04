// 导入jsonwebtoken模块和User模型
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

// 定义保护路由的中间件
const protectRoute = async (req, res, next) => {
	try {
		// 从请求的cookies中获取token
		const token = req.cookies.jwt;

		// 如果没有token，返回401状态码和错误信息
		if (!token) {
			return res.status(401).json({ error: "Unauthorized - No Token Provided" });
		}

		// 验证token
		const decoded = jwt.verify(token, process.env.JWT_SECRET);

		// 如果token无效，返回401状态码和错误信息
		if (!decoded) {
			return res.status(401).json({ error: "Unauthorized - Invalid Token" });
		}

		// 根据token中的userId查找用户
		const user = await User.findById(decoded.userId).select("-password");

		// 如果用户不存在，返回404状态码和错误信息
		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}

		// 将用户信息添加到请求对象中
		req.user = user;

		// 调用下一个中间件
		next();
	} catch (error) {
		// 打印错误信息
		console.log("Error in protectRoute middleware: ", error.message);
		// 返回500状态码和错误信息
		res.status(500).json({ error: "Internal server error" });
	}
};

// 导出保护路由的中间件
export default protectRoute;