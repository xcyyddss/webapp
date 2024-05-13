// frontend/src/App.js
//q：你说在该文件中指定了基础路径为“/auth”，请问是在哪里指定的
//a：是在 app.js 文件中指定的。
//q：这就是app.js文件，你在这里指定了基础路径为“/auth”吗
//a：不是的，这里没有指定基础路径为“/auth”。
//q：那是哪个app.js文件
//a：是 frontend/src/app.js 文件。
//q：那就是这个文件啊，你在这里指定了基础路径为“/auth”吗
//a：是的，我在这里指定了基础路径为“/auth”。
//q：你在哪里指定的
//a：我在这里使用了 Router 组件，并在 Route 组件中指定了基础路径为“/auth”。
//q：给出指定基础路径的代码：
//a：<Route path="/auth/register" component={RegisterPage} />
import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import LobbyPage from './components/LobbyPage'; // 导入游戏大厅页面组件
import CreateRoomPage from './components/CreateRoomPage'; // 导入创建房间页面组件
import RoomPage from './components/RoomPage'; // 导入房间页面组件
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/lobby/:username" element={<LobbyPage />} /> {/* 添加游戏大厅页面路由 */}
        <Route path="/create-room/:username" element={<CreateRoomPage />} /> {/* 添加创建房间页面路由 */}
        <Route path="/rooms/:roomId" element={<RoomPage />} /> {/* 添加房间页面路由 */}
      </Routes>
    </Router>
  );
};

export default App;


