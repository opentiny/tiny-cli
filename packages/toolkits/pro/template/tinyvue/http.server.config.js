// server-config.js
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use('/api', createProxyMiddleware({
    target: 'http://http://127.0.0.1:3000', // 目标服务器地址
    changeOrigin: true, // 改变源地址，使目标服务器认为请求来自代理服务器
    pathRewrite: {
      '^/api': '', // 重写请求路径
    },
  }));
  app.use('/mock', createProxyMiddleware({
    target: 'http://127.0.0.1:8848', // 目标服务器地址
    changeOrigin: true, // 改变源地址，使目标服务器认为请求来自代理服务器
    pathRewrite: {
      '^/mock': '', // 重写请求路径
    },
  }));
};
