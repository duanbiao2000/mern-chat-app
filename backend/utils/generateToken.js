// 导入jsonwebtoken模块
import jwt from "jsonwebtoken";

// 生成token并设置cookie
const generateTokenAndSetCookie = (userId, res) => {
	// 使用jwt.sign方法生成token，传入userId和JWT_SECRET，设置过期时间为15天
	const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
		expiresIn: "15d",
	});

	// 设置cookie，cookie名为jwt，值为token，设置过期时间为15天，httpOnly为true，防止XSS攻击，sameSite为strict，防止CSRF攻击，secure为true，只在生产环境中使用
	res.cookie("jwt", token, {
		maxAge: 15 * 24 * 60 * 60 * 1000, // MS
		httpOnly: true, // prevent XSS attacks cross-site scripting attacks
		sameSite: "strict", // CSRF attacks cross-site request forgery attacks
		secure: process.env.NODE_ENV !== "development",
	});
};

// 导出generateTokenAndSetCookie函数
export default generateTokenAndSetCookie;