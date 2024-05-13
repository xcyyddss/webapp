const express = require('express');
const path = require('path');
const authRoutes = require('./routes/authRoutes');
const roomRoutes = require('./routes/roomRoutes');
const { User, sequelize } = require('./db');
const cors = require('cors'); // 导入 CORS 中间件
const app = express();

(async () => {
  try {
    await User.sync({ alter: true });
    console.log('User model synchronized successfully');
  } catch (error) {
    console.error('Error synchronizing user model:', error);
  }
})();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// 使用 CORS 中间件
app.use(cors());

// 挂载认证相关路由
app.use('/auth', authRoutes);
app.use('/api/rooms', roomRoutes);

// 其他路由和服务器设置...

// 启动服务器
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
