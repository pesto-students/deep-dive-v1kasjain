const concat = require("concat-stream");
class Controller {
  constructor(req) {
    if (req.method === "POST") {
      if (req.headers["content-type"] === "application/json") {
        req.pipe(
          concat(data => {
            req.body = JSON.parse(data);
          })
        );
      }
    }
  }
}

module.exports = Controller;
