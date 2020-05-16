const htmlView = require("../view");
const credentials = require('./../credentials.json');

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

  login(req, res) {
    console.log(`credentials : ${credentials}`);
    return htmlView("home.html", res);
  }
}

module.exports = new Home();
