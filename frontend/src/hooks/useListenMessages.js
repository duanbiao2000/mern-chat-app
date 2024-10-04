import { useEffect } from "react";

// 引入SocketContext
import { useSocketContext } from "../context/SocketContext";
// 引入useConversation
import useConversation from "../zustand/useConversation";

// 引入通知声音
import notificationSound from "../assets/sounds/notification.mp3";

// 定义useListenMessages函数
const useListenMessages = () => {
	// 获取socket
	const { socket } = useSocketContext();
	// 获取messages和setMessages
	const { messages, setMessages } = useConversation();

	// useEffect函数，监听新消息
	useEffect(() => {
		// 监听newMessage事件
		socket?.on("newMessage", (newMessage) => {
			// 设置新消息的shouldShake属性为true
			newMessage.shouldShake = true;
			// 播放通知声音
			const sound = new Audio(notificationSound);
			sound.play();
			// 更新messages
			setMessages([...messages, newMessage]);
		});

		// 组件卸载时，移除newMessage事件监听
		return () => socket?.off("newMessage");
	}, [socket, setMessages, messages]);
};

// 导出useListenMessages函数
export default useListenMessages;
