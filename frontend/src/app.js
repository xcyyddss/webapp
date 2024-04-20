// frontend/src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import LobbyPage from './components/LobbyPage'; // 导入游戏大厅页面组件
import CreateRoomPage from './components/CreateRoomPage'; // 导入创建房间页面组件
import RoomPage from './components/RoomPage'; // 导入房间页面组件

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={LoginPage} />
        <Route path="/register" component={RegisterPage} />
        <Route path="/lobby" component={LobbyPage} /> {/* 添加游戏大厅页面路由 */}
        <Route path="/create-room" component={CreateRoomPage} /> {/* 添加创建房间页面路由 */}
        <Route path="/rooms/:roomId" component={RoomPage} /> {/* 添加房间页面路由 */}
        {/* 其他路由 */}
      </Switch>
    </Router>
  );
};

export default App;
