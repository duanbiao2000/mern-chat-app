// 导入React的useState钩子和auth上下文，以及react-hot-toast库用于通知
import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

// 创建一个自定义的useLogin钩子
const useLogin = () => {
    // 使用useState管理加载状态
	const [loading, setLoading] = useState(false);
    // 从auth上下文中提取设置认证用户的方法
	const { setAuthUser } = useAuthContext();

    // 定义异步登录函数
	const login = async (username, password) => {
        // 调用处理输入错误的函数，如果返回false则终止执行
		const success = handleInputErrors(username, password);
		if (!success) return;
        // 设置加载状态为true
		setLoading(true);
		try {
            // 发送POST请求到后端的/login路由
			const res = await fetch("/api/auth/login", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ username, password }),
			});

            // 解析响应的JSON数据
			const data = await res.json();
            // 如果响应数据中存在错误则抛出异常
			if (data.error) {
				throw new Error(data.error);
			}

            // 将响应数据存储到本地存储，并更新auth上下文中的认证用户信息
			localStorage.setItem("chat-user", JSON.stringify(data));
			setAuthUser(data);
		} catch (error) {
            // 捕获异常并显示错误通知
			toast.error(error.message);
		} finally {
            // 无论成功或失败，最终将加载状态设置为false
			setLoading(false);
		}
	};

    // 返回加载状态和登录函数供外部使用
	return { loading, login };
};
export default useLogin;

// 处理输入错误的函数
function handleInputErrors(username, password) {
    // 检查用户名和密码是否为空，如果为空则显示错误通知并返回false
	if (!username || !password) {
		toast.error("Please fill in all fields");
		return false;
	}

    // 如果没有错误则返回true
	return true;
}