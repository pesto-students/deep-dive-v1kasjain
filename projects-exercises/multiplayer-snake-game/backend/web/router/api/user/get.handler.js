
const User = rootRequire('models').User;

async function handler(req, res, next) {

  const user = await User.find({});

  res.json({
    success: true,
    user
  });
}
module.exports = handler;
