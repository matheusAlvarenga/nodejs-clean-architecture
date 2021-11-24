const cors = require('../middlewares/cors');
const JSONParser = require('../middlewares/json-parser');

module.exports = (app) => {
  app.disable('x-powered-by');
  app.use(cors);
  app.use(JSONParser);
};
