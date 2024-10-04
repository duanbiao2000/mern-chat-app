import { createContext, useContext, useState } from "react";

// 创建一个名为 AuthContext 的上下文对象
export const AuthContext = createContext();

// !创建一个名为 useAuthContext 的自定义钩子，用于在组件中访问 AuthContext 的值
// eslint-disable-next-line react-refresh/only-export-components
export const useAuthContext = () => {
    // 使用 useContext 钩子访问 AuthContext 的值
    return useContext(AuthContext);
};

// 创建一个名为 AuthContextProvider 的组件，用于包裹应用程序并提供 authUser 和 setAuthUser 的值
export const AuthContextProvider = ({ children }) => {
    // 使用 useState 钩子管理 authUser 的状态，初始值从本地存储中获取或为 null
    const [authUser, setAuthUser] = useState(JSON.parse(localStorage.getItem("chat-user")) || null);

    // !返回 AuthContext.Provider 组件，提供 authUser 和 setAuthUser 作为 value
    // 子组件可以通过 AuthContext 消费这些值
    return <AuthContext.Provider value={{ authUser, setAuthUser }}>{children}</AuthContext.Provider>;
};