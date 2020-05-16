const fs = require("fs").promises;
const serveView = (file, res) => {
  fs.readFile(__dirname + "/views/" + file)
    .then(contents => {
      console.log("from serve", contents);
      res.setHeader("Content-Type", "text/html");
      res.writeHead(200);
      res.end(contents);
      return contents;
    })
    .catch(err => {
      console.error(`Could not read file: ${err}`);
      process.exit(1);
    });
};

module.exports = serveView;
