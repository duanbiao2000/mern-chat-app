import { useState } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";

// 定义useSendMessage函数，用于发送消息
const useSendMessage = () => {
	// 定义loading状态，用于表示消息发送是否正在进行中
	const [loading, setLoading] = useState(false);
	// 从useConversation中获取消息、设置消息和选中的对话
	const { messages, setMessages, selectedConversation } = useConversation();

	// 定义sendMessage函数，用于发送消息
	const sendMessage = async (message) => {
		// 设置loading状态为true，表示消息发送正在进行中
		setLoading(true);
		try {
			// 发送POST请求，将消息发送到服务器
			const res = await fetch(`/api/messages/send/${selectedConversation._id}`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ message }),
			});
			// 将服务器返回的数据转换为json格式
			const data = await res.json();
			// 如果服务器返回了错误，则抛出错误
			if (data.error) throw new Error(data.error);

			// 将服务器返回的消息添加到消息列表中
			setMessages([...messages, data]);
		} catch (error) {
			// 如果发送消息失败，则显示错误提示
			toast.error(error.message);
		} finally {
			// 设置loading状态为false，表示消息发送完成
			setLoading(false);
		}
	};

	// 返回sendMessage函数和loading状态
	return { sendMessage, loading };
};

// 导出useSendMessage函数
export default useSendMessage;
