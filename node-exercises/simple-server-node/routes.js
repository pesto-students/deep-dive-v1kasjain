// Check if key available in object else 404
// Match for method else 404
// Check if controller key available in obj if yes
// check for task keys available if available
// Execute task with req argument
// If task not available execute index
// We can assume get / put / post / delete

const api = require("./api");

const routes = (req, res) => {
  if (
    req.url &&
    api.hasOwnProperty(req.url) &&
    api[req.url]["method"] &&
    api[req.url].method == req.method
  ) {
    console.log(api[req.url].task);
    const task = require("./controllers/" + api[req.url].task);
    //TODO: Auto detect controller task if not provided call index
    return task.index(req, res);
  } else {
    res.writeHead(404);
    res.end('Page not found');
    return;
  }
};
module.exports = routes;
