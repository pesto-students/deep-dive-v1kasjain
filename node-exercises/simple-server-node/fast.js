const http = require("http");
const fast = new http.Server();

const routes = require("./routes");

fast.on("connection", () => {
  console.log("New Connection");
});

fast.on("request", (req, res) => {
  routes(req, res);
  console.log("go find and execute route", req.url);
});

module.exports = fast;
