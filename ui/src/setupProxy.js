const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/graphql",
    createProxyMiddleware({
      target: process.env.DOCKER_GQL_PROXY || process.env.LOCAL_GQL_PROXY,
      changeOrigin: true,
    })
  );
};
