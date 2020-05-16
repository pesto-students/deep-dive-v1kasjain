const api = require("./api");
const concat = require("concat-stream");
const view = require("./view");
const { parseBody, parseQuery } = require("./helper");
const url = require("url");

const getRespectiveController = controller => {
  return require(`./controllers/${controller}`);
};

const routes = async (req, res) => {
  console.log(url.parse(req.url));
  if (
    req.url &&
    api.hasOwnProperty(req.url) &&
    api[req.url]["method"] &&
    api[req.url].method == req.method
  ) {
    req.api = api[req.url];

    if (req.api.hasOwnProperty("view")) {
      view(req.api["view"], res);
    } else {
      req.api = api[req.url];
      if (req.method === "POST" || req.method === "PUT") {
        req.pipe(
          concat(data => {
            console.log(" post data :", data);
            console.log(JSON.parse(data));
            req.body = JSON.parse(data);
            const controller = getRespectiveController(req.api.controller);
            return controller[req.api.task](req, res);
          })
        );
      } else {
        if (req.method === "GET" ) {
          req.query = parseQuery(req.url);
        }
        const controller = getRespectiveController(req.api.controller);
        return controller[req.api.task](req, res);
      }

      // TODO
      // if (req.method === "GET") {
      //   //req.query = parseQuery(req);
      // }
    }
  } else {
    res.writeHead(404);
    res.end("Page not found");
    return;
  }
};
module.exports = routes;
