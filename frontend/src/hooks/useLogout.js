// 导入useState和useAuthContext
import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

// 定义useLogout函数
const useLogout = () => {
	// 定义loading状态
	const [loading, setLoading] = useState(false);
	// 获取setAuthUser函数
	const { setAuthUser } = useAuthContext();

	// 定义logout函数
	const logout = async () => {
		// 设置loading为true
		setLoading(true);
		try {
			// 发送POST请求
			const res = await fetch("/api/auth/logout", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
			});
			// 解析返回的数据
			const data = await res.json();
			// 如果有错误，抛出错误
			if (data.error) {
				throw new Error(data.error);
			}

			// 移除localStorage中的chat-user
			localStorage.removeItem("chat-user");
			// 设置authUser为null
			setAuthUser(null);
		} catch (error) {
			// 弹出错误提示
			toast.error(error.message);
		} finally {
			// 设置loading为false
			setLoading(false);
		}
	};

	// 返回loading和logout函数
	return { loading, logout };
};

// 导出useLogout函数
export default useLogout;