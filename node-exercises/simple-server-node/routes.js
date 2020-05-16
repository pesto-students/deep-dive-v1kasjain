// Check if key available in object else 404
// Match for method else 404
// Check if controller key available in obj if yes
// check for task keys available if available
// Execute task with req argument
// If task not available execute index
// We can assume get / put / post / delete

const api = require("./api");
const concat = require('concat-stream');

const getRespectiveControllerMethod = (task) => {
  return require(`./controllers/${task}`);
}

const routes = (req, res) => {
  if (
    req.url &&
    api.hasOwnProperty(req.url) &&
    api[req.url]["method"] &&
    api[req.url].method == req.method
  ) {

    const methodInLowerCase = req.method.toLowerCase();  

    if (methodInLowerCase === "post") {
      if (req.headers["content-type"] === "application/json") {
        req.pipe(concat(data => {
          // append data to the req body
          req.body = JSON.parse(data);

          const task = getRespectiveControllerMethod(api[req.url].task);
          return task[methodInLowerCase](req, res);
        }));
      }
    } else {
      const task = getRespectiveControllerMethod(api[req.url].task);
      return task[methodInLowerCase](req, res);
    }

  } else {
    res.writeHead(404);
    res.end('Page not found');
    return;
  }
};
module.exports = routes;
