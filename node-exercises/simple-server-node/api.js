const api = {
  "/": {
    method: "GET",
    task: "User"
    //TODO: add key for middleware
  },

  "/home": {},

  "/users": {
    method: "POST",
    task: "User"
  }
};
module.exports = api;
