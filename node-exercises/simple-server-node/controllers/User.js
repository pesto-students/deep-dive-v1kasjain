class User {
  index(req, res) {
    const users = { user1: { name: "vikas" }, user2: { name: "dinesh" } };
    // TODO: find a way to send json as response
    res.end(JSON.stringify(users));
  }
  get() {
    console("getting all users");
  }
  put() {
    console("updating users");
  }
  post() {
    console("creating users");
  }
  delete() {
    console("deleting users");
  }
}

module.exports = new User();
