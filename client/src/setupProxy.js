const { createProxyMiddleware } = require("http-proxy-middleware");

const apiUrl = "http://localhost:5000/";
const apiContext = ["/api", "/test"];

module.exports = (app) => {
  app.use(
    createProxyMiddleware(apiContext, {
      // 도메인 api로 호출
      target: apiUrl, // 통신할 서버의 도메인 주소
      changeOrigin: true,
    })
  );
};
