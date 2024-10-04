// 导入zustand库中的create函数
import { create } from "zustand";

// 创建一个名为useConversation的store，用于存储对话相关的状态
const useConversation = create((set) => ({
	// 当前选中的对话
	selectedConversation: null,
	// 设置当前选中的对话
	setSelectedConversation: (selectedConversation) => set({ selectedConversation }),
	// 消息列表
	messages: [],
	// 设置消息列表
	setMessages: (messages) => set({ messages }),
}));

// 导出useConversation
export default useConversation;