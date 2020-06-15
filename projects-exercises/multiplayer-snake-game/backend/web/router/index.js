const router = require('express').Router();

const { requestLogger } = require('../middleware');

requestLogger(router);

require('./api/noAuth')(router);
require('./api/user')(router);

module.exports = function(app) {
  app.use(router);
};
