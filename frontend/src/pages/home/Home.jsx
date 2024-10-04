// 导入MessageContainer组件和Sidebar组件
import MessageContainer from "../../components/messages/MessageContainer";
import Sidebar from "../../components/sidebar/Sidebar";

// 定义Home组件
const Home = () => {
	// 返回一个div，包含Sidebar和MessageContainer组件
	return (
		<div className='flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
			<Sidebar />
			<MessageContainer />
		</div>
	);
};

// 导出Home组件
export default Home;