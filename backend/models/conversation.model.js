// 导入mongoose模块
import mongoose from "mongoose";

// 定义conversationSchema
const conversationSchema = new mongoose.Schema(
	{
		// 参与者，类型为ObjectId，引用User模型
		participants: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "User",
			},
		],
		// 消息，类型为ObjectId，引用Message模型，默认为空数组
		messages: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Message",
				default: [],
			},
		],
	},
	// 添加时间戳
	{ timestamps: true }
);

// 创建Conversation模型
const Conversation = mongoose.model("Conversation", conversationSchema);

// 导出Conversation模型
export default Conversation;
