const api = {
  "/": {
    method: "GET",
    task: "User"
    //TODO: add key for middleware
  },

  "/home": {
    method: "GET",
    view: "home.html",
    fileType: "html"
  },

  "/users": {
    method: "POST",
    task: "User"
  }
};
module.exports = api;
