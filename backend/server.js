// backend/server.js

const express = require('express');
const authRoutes = require('./authRoutes');
const User = require('./models/User');

//q：解释下面这行代码的作用
//a:创建一个express应用程序
//q：express是什么
//a:express是一个Node.js的web应用程序框架，用于构建web应用程序。
const app = express();
//q：解释下面这行代码的作用
//a:同步用户模型，如果用户模型不存在，则创建用户模型。
(async () => {
  try {
    await User.sync({ alter: true });
    console.log('User model synchronized successfully');
  } catch (error) {
    console.error('Error synchronizing user model:', error);
  }
})();

// 使用中间件解析请求体
//q:解释下面这行代码的作用
//a:使用express.json()中间件解析请求体，将请求体解析为json格式。
//q:解释中间件的作用
//a:中间件是一个函数，可以访问请求对象（req）、响应对象（res）和应用程序中的请求-响应循环中的下一个中间件函数。中间件函数通常用来执行一些操作，如解析请求体、验证用户身份等。
app.use(express.json());

// 挂载认证相关路由
app.use('/auth', authRoutes);

// 其他路由和服务器设置...

// 启动服务器
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
