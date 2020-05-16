// Check if key available in object else 404
// Match for method else 404
// Check if controller key available in obj if yes
// check for task keys available if available
// Execute task with req argument
// If task not available execute index
// We can assume get / put / post / delete

const api = require("./api");
const concat = require("concat-stream");
const fs = require("fs").promises;

const getRespectiveControllerMethod = task => {
  return require(`./controllers/${task}`);
};

const serveView = async (file, res) => {
  fs.readFile(__dirname + "/views/" + file)
    .then(contents => {
      console.log("from serve", contents);
      res.setHeader("Content-Type", "text/html");
      res.writeHead(200);
      res.end(contents);
      return contents;
    })
    .catch(err => {
      console.error(`Could not read index.html file: ${err}`);
      process.exit(1);
    });
};

const routes = async (req, res) => {
  if (
    req.url &&
    api.hasOwnProperty(req.url) &&
    api[req.url]["method"] &&
    api[req.url].method == req.method
  ) {
    const routeObj = api[req.url];
    console.log(routeObj);
    if (routeObj.hasOwnProperty("view")) {
      //serve file from view directory

      let contents = await serveView(routeObj["view"], res);
      // console.log('from routes', contents);
      // res.setHeader("Content-Type", "text/html");
      // res.writeHead(200);
      // res.end(contents);
    } else {
      const methodInLowerCase = req.method.toLowerCase();
      if (methodInLowerCase === "post") {
        if (req.headers["content-type"] === "application/json") {
          req.pipe(
            concat(data => {
              // append data to the req body
              req.body = JSON.parse(data);

              const task = getRespectiveControllerMethod(api[req.url].task);
              return task[methodInLowerCase](req, res);
            })
          );
        }
      } else {
        const task = getRespectiveControllerMethod(api[req.url].task);
        return task[methodInLowerCase](req, res);
      }
    }
  } else {
    res.writeHead(404);
    res.end("Page not found");
    return;
  }
};
module.exports = routes;
