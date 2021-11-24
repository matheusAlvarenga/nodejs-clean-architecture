module.exports = {
  mongoUrl: process.env.MONGO_URL || 'mongodb://localhost:2701/clean-node-api',
  tokenSecret: process.env.TOKEN_SECRET || 'secret',
};
