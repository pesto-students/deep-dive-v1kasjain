const path = require("path");
const router = require('express').Router();

const { requestLogger } = require('../middleware');

requestLogger(router);

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../../build', 'index.html'))
})

require('./api/noAuth')(router);
require('./api/game')(router);



module.exports = function(app) {
  app.use(router);
};
