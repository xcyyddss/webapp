import React, { useState } from 'react';
import axios from 'axios';
import '../styles/RegisterPage.css';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      //q：解释下面这行代码
      //a：这行代码是使用 axios.post 方法向后端发送注册请求。
      //q：第一个参数是什么
      //a：第一个参数是请求的 URL。
      await axios.post('http://localhost:8080/auth/register', { username, password });
      // 注册成功后可以跳转到登录页面
    } catch (error) {
      console.error('Error registering:', error);
      // 处理注册失败逻辑，例如显示错误信息给用户
    }
  };

  return (
    <div className="register-container"> {/* 使用className添加CSS类 */}
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-container"> {/* 使用className添加CSS类 */}
          <label>Username:</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div className="input-container"> {/* 使用className添加CSS类 */}
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegisterPage;
