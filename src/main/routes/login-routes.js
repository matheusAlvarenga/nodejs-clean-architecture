const ExpressRouterAdapater = require('../adapters/express-router-adapter');
const loginRouter = require('../composers/login-router-composer');

module.exports = (router) => {
  router.post('/login', ExpressRouterAdapater.adapt(loginRouter));
};
