const createHandler = require('./create.handler');
const getHandler = require('./get.handler');
const updateHandler = require('./update.handler');

module.exports = (router) => {
  router.post('/user/update/:id', updateHandler);
  router.post('/user/create', createHandler);
  router.get('/user/:id', getHandler);
};
