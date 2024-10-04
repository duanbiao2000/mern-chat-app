import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()], // 使用react插件
	server: {
		port: 3000, // 设置服务器端口为3000
		proxy: {
			"/api": {
				target: "http://localhost:5000", // 设置代理，将/api开头的请求代理到http://localhost:5000
			},
		},
	},
});
