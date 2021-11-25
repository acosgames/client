const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {

    let target = createProxyMiddleware({
        target: 'http://localhost:8080',
        changeOrigin: true,
    });
    let apiTarget = createProxyMiddleware({
        target: 'http://localhost:8080/api',
        changeOrigin: true,
    });
    let staticTarget = createProxyMiddleware({
        target: 'http://localhost:8080/assets',
        changeOrigin: true,
    });

    app.use('/iframe', target);
    app.use('/api', apiTarget);
    app.use('/assets', staticTarget);
};