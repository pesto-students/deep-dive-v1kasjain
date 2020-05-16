const htmlView = require("../view");

class Home {
  index(req, res) {
    return htmlView("home.html", res);
  }

  setUser(req, res) {
    console.log(` req body : ${req.body}`);
  }

  getParamsFromURL(req, res) {
    res.setHeader("Content-Type", "application/json");
    res.end(req.query);
  }
}

module.exports = new Home();
