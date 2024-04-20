import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/auth/login', { username, password });
      const token = response.data.token;
      // 将 token 存储到本地存储或者状态管理库中
      // 这里假设将 token 存储到 localStorage 中
      localStorage.setItem('token', token);
      // 登录成功后跳转到主页面
      history.push('/dashboard');
    } catch (error) {
      console.error('Error logging in:', error);
      // 处理登录失败逻辑，例如显示错误信息给用户
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
