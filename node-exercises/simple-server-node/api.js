const api = {
  "/": {
    method: "GET",
    controller: "Home",
    task: "index"
  },

  "/set-user": {
    method: "POST",
    controller: "Home",
    task: "setUser"
  },

  "/get-params-from-url": {
    method: "GET",
    controller: "Home",
    task: "getParamsFromURL"
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
