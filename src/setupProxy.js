const { legacyCreateProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
    let target = legacyCreateProxyMiddleware({
        target: "http://localhost:8080",
        changeOrigin: true,
    });
    let apiTarget = legacyCreateProxyMiddleware({
        target: "http://localhost:8080/api",
        changeOrigin: true,
    });
    let staticTarget = legacyCreateProxyMiddleware({
        target: "http://localhost:8080/assets",
        changeOrigin: true,
    });
    let loginTarget = legacyCreateProxyMiddleware({
        target: "http://localhost:8080/login",
        changeOrigin: true,
    });

    app.use("/iframe", target);
    app.use("/api", apiTarget);
    app.use("/assets", staticTarget);
    app.use("/login", loginTarget);
};
