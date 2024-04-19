//q:解释本文件代码的作用
//a:这个文件定义了注册和登录的路由，包括注册和登录的逻辑，注册时检查用户名是否已存在，对密码进行哈希加密，插入新用户到数据库，登录时检查用户是否存在，验证密码，生成JWT token。
//q：什么是JWT token
//a:JWT token是一种用于在网络应用之间传递声明的开放标准（(RFC 7519)）。
//q：什么是路由，为什么需要路由
//a:路由是指向特定页面或特定功能的URL。在网络应用中，路由用于定义不同的URL路径与不同的处理程序之间的映射关系，根据请求的URL路径调用相应的处理程序。
//q：路由的具体作用是什么
//a:路由的作用是根据请求的URL路径调用相应的处理程序，实现不同的功能，如注册、登录等。
//q：什么是请求的URL路径
//a:请求的URL路径是指请求的URL中的路径部分，如http://localhost:3000/register中的/register。
//q：
// backend/authRoutes.js

const express = require('express');
const bcrypt = require('bcrypt');
//q：解释下面这行代码的作用
//a:引入jsonwebtoken模块，用于生成JWT token。
const jwt = require('jsonwebtoken');
const db = require('./db');

const router = express.Router();

// 注册路由
router.post('/register', async (req, res) => {
  try {
    //q：解释下面这行代码的作用
    //a:从请求体中获取用户名和密码。
    //q：请求体中会包含用户名和密码吗
    //a:请求体中可能包含用户名和密码，用于注册用户。
    //q：请求体是什么
    //a:请求体是请求中包含的数据，如注册时的用户名和密码。
    //q：请求体使用什么网络协议
    //a:请求体使用HTTP协议。
    const { username, password } = req.body;

    // 检查用户名是否已存在
    const [existingUser] = await db.query('SELECT * FROM users WHERE username = ?', [username]);
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    // 对密码进行哈希加密
    const hashedPassword = await bcrypt.hash(password, 10);

    // 插入新用户到数据库
    await db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword]);

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// 登录路由
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // 检查用户是否存在
    const [user] = await db.query('SELECT * FROM users WHERE username = ?', [username]);
    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // 验证密码
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // 生成 JWT token
    const token = jwt.sign({ username: user.username }, 'your_secret_key', { expiresIn: '1h' });

    res.json({ token });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
