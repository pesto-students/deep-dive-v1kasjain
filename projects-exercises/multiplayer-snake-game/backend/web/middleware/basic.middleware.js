const bodyParser = require('body-parser');
const cors = require('cors');

function basicMiddlewares(app) {
  // throws 400 error to next, if JSON is not valid
  app.use(bodyParser.json({
    strict: true,
    limit:'50mb'
  }));

  // parses the url encoded strings
  app.use(bodyParser.urlencoded({
    extended: true,
    limit:'50mb'
  }));

  // CORS enabled
  app.use(cors());
}

module.exports = basicMiddlewares;