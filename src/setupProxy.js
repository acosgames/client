const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {

    let target = createProxyMiddleware({
        target: 'http://localhost:8080',
        changeOrigin: true,
    });
    app.use('/iframe', target);
    app.use('/person', target);
};