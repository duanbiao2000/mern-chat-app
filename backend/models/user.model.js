import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
	{
		fullName: {
			type: String,
			required: true,
		},
		username: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
			minlength: 6,
		},
		gender: {
			type: String,
			required: true,
			enum: ["male", "female"],
		},
		profilePic: {
			type: String,
			default: "",
		},
		// createdAt, updatedAt => Member since <createdAt>
	},
	{ timestamps: true }
);

// 定义一个名为User的模型，用于与数据库中的User集合交互
// 该模型基于之前定义的userSchema，该架构描述了数据库中用户文档的结构
const User = mongoose.model("User", userSchema);

export default User;
