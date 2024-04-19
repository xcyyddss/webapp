//q:解释下面这行代码的含义
//a:引入mysql模块
//q:代码中的mysql是什么
//a:mysql是一个数据库模块，可以用来连接数据库
//q：require是什么语法
//a：require是node.js的一个模块，用来引入其他模块
const mysql = require('mysql');

// 创建数据库连接
//q：解释下面这段代码的作用
//a：创建一个数据库连接对象，用于连接数据库
//q：代码中的localhost、user、password、database是什么
//a：localhost是数据库服务器地址，user是数据库用户名，password是数据库密码，database是数据库名称
//q：怎么创建一个数据库
//a：在mysql中使用CREATE DATABASE语句
//q：创建了一个数据库，就自动获得了user、password、database吗
//a：没有，需要自己创建一个数据库用户，并为其分配数据库访问权限
//q：创建数据库和数据库用户一般在什么地方进行


const connection = mysql.createConnection({
  host: 'localhost',
  user: 'yourusername',
  password: 'yourpassword',
  database: 'yourdatabase'
});

// 连接数据库
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to database: ' + err.stack);
    return;
  }
  console.log('Connected to database as id ' + connection.threadId);
});

// 导出数据库连接对象，以便在其他文件中使用
module.exports = connection;