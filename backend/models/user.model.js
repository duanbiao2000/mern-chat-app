import mongoose from "mongoose";

// 定义一个名为User的模型，用于与数据库中的User集合交互
// 该模型基于之前定义的userSchema，该架构描述了数据库中用户文档的结构
const userSchema = new mongoose.Schema(
	{
		// 用户的全名
		fullName: {
			type: String,
			required: true,
		},
		// 用户的用户名
		username: {
			type: String,
			required: true,
			unique: true,
		},
		// 用户的密码
		password: {
			type: String,
			required: true,
			minlength: 6,
		},
		// 用户的性别
		gender: {
			type: String,
			required: true,
			enum: ["male", "female"],
		},
		// 用户的头像
		profilePic: {
			type: String,
			default: "",
		},
		// 创建时间和更新时间
		// createdAt, updatedAt => Member since <createdAt>
	},
	{ timestamps: true }
);

// 定义一个名为User的模型，用于与数据库中的User集合交互
// 该模型基于之前定义的userSchema，该架构描述了数据库中用户文档的结构
const User = mongoose.model("User", userSchema);

export default User;
