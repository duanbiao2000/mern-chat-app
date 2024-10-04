// 导入mongoose模块
import mongoose from "mongoose";

// 定义messageSchema
const messageSchema = new mongoose.Schema(
	{
		// 发送者ID
		senderId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		// 接收者ID
		receiverId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		// 消息内容
		message: {
			type: String,
			required: true,
		},
		// 创建时间，更新时间
	},
	{ timestamps: true }
);

// 创建Message模型
const Message = mongoose.model("Message", messageSchema);

// 导出Message模型
export default Message;