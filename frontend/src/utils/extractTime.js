// 导出一个函数，用于从日期字符串中提取时间
export function extractTime(dateString) {
	// 将日期字符串转换为Date对象
	const date = new Date(dateString);
	// 调用padZero函数，将小时数转换为两位数
	const hours = padZero(date.getHours());
	// 调用padZero函数，将分钟数转换为两位数
	const minutes = padZero(date.getMinutes());
	// 返回格式化后的时间字符串
	return `${hours}:${minutes}`;
}

// 辅助函数，用于将单个数字转换为两位数
function padZero(number) {
	// 将数字转换为字符串，并在前面补零
	return number.toString().padStart(2, "0");
}
