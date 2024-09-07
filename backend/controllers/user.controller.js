import User from "../models/user.model.js";

/**
 * 获取侧边栏用户列表
 * 
 * 此函数用于获取当前登录用户之外的所有用户列表，以便在侧边栏中显示
 * 它通过查询数据库中除当前用户外的所有用户，并选择性地返回用户信息，排除密码信息
 * 
 * @param {Object} req - 请求对象，包含当前登录用户的信息
 * @param {Object} res - 响应对象，用于发送响应回客户端
 */
export const getUsersForSidebar = async (req, res) => {
	try {
		// 获取当前登录用户的ID
		const loggedInUserId = req.user._id;

		// 查询数据库中除当前用户外的所有用户，并选择性地排除密码字段
		const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");

		// 发送查询结果给客户端
		res.status(200).json(filteredUsers);
	} catch (error) {
		// 记录错误信息
		console.error("Error in getUsersForSidebar: ", error.message);
		// 向客户端发送内部服务器错误响应
		res.status(500).json({ error: "Internal server error" });
	}
};