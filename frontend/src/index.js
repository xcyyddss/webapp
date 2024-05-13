import React from 'react';
import { createRoot } from 'react-dom';
import App from './app';
//q：解释下面这行代码的作用
//a:将App组件渲染到页面上，挂载到id为root的DOM元素上。
//q：解释信息：“render is deprecated”
//a：render方法已经被弃用，建议使用ReactDOM.render()方法。
//q：什么时候执行这行代码
//a:这行代码在页面加载时执行。
//q：执行了这行代码是否就确定了网页的入口
//a:是的，执行了这行代码就确定了网页的入口。
createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
