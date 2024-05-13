const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../db'); // 导入 User 模型对象

const router = express.Router();

// 注册路由
router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;

    // 检查用户名是否已存在
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    // 对密码进行哈希加密
    const hashedPassword = await bcrypt.hash(password, 10);

    // 插入新用户到数据库
    await User.create({ username, password: hashedPassword });

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // 检查用户是否存在
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // 验证密码
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // 生成 JWT token
    //q：jwt token有什么作用
    //a：JWT token 是一种用于身份验证的令牌，用于验证用户的身份。
    //q：一般怎么使用jwt token
    //a：通常情况下，JWT token 会被存储在客户端，然后在每次请求时发送给服务器。
    //q：给出一个前端使用它的具体代码示例
    //a：你可以在前端使用 fetch 方法将 token 发送给服务器，例如：
    // fetch('http://localhost:8080/api/data', {
    //   headers: {
    //     Authorization: `Bearer ${token}`
    //   }
    // });
    const token = jwt.sign({ username: user.username }, 'your_secret_key', { expiresIn: '1h' });

    res.json({ token });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
