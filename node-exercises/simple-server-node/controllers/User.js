const users = { user1: { name: "vikas" }, user2: { name: "dinesh" } };

class User {
  default(req, res) {
    // TODO: find a way to send json as response
    res.end('Controller method not found.');
  }
  get(req, res) {
    console.log("getting all users");
    res.end(JSON.stringify(users));
  }
  put() {
    console.log("updating users");
  }
  post() {
    console.log("creating users");
  }
  delete() {
    console.log("deleting users");
  }
}

module.exports = new User();
