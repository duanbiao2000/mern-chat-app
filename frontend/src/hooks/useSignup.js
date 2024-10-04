import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

// 定义一个自定义hook，用于处理用户注册
const useSignup = () => {
	// 定义一个loading状态，用于表示注册是否正在进行
	const [loading, setLoading] = useState(false);
	// 从AuthContext中获取setAuthUser方法，用于设置登录用户
	const { setAuthUser } = useAuthContext();

	// 定义一个signup方法，用于处理用户注册
	const signup = async ({ fullName, username, password, confirmPassword, gender }) => {
		// 调用handleInputErrors方法，处理输入错误
		const success = handleInputErrors({ fullName, username, password, confirmPassword, gender });
		// 如果输入有错误，则返回
		if (!success) return;

		// 设置loading状态为true，表示注册正在进行
		setLoading(true);
		try {
			// 发送POST请求，将用户信息发送到服务器
			const res = await fetch("/api/auth/signup", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ fullName, username, password, confirmPassword, gender }),
			});

			// 将服务器返回的数据转换为json格式
			const data = await res.json();
			// 如果服务器返回错误，则抛出错误
			if (data.error) {
				throw new Error(data.error);
			}
			// 将用户信息存储到localStorage中
			localStorage.setItem("chat-user", JSON.stringify(data));
			// 设置登录用户
			setAuthUser(data);
		} catch (error) {
			// 如果发生错误，则显示错误信息
			toast.error(error.message);
		} finally {
			// 设置loading状态为false，表示注册完成
			setLoading(false);
		}
	};

	// 返回loading和signup方法
	return { loading, signup };
};
export default useSignup;

// 定义一个方法，用于处理输入错误
function handleInputErrors({ fullName, username, password, confirmPassword, gender }) {
	// 如果有任何一个字段为空，则显示错误信息
	if (!fullName || !username || !password || !confirmPassword || !gender) {
		toast.error("Please fill in all fields");
		return false;
	}

	// 如果密码和确认密码不匹配，则显示错误信息
	if (password !== confirmPassword) {
		toast.error("Passwords do not match");
		return false;
	}

	// 如果密码长度小于6，则显示错误信息
	if (password.length < 6) {
		toast.error("Password must be at least 6 characters");
		return false;
	}

	// 如果没有错误，则返回true
	return true;
}
