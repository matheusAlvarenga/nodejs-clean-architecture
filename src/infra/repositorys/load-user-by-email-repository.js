const { MissingParamError } = require('../../utils/errors');
const MongoHelper = require('../helpers/mongo-helper');

module.exports = class LoadUserByEmailRepository {
  async load(email) {
    if (!email) throw new MissingParamError('email');

    const { db } = MongoHelper;

    const user = await db.collection('users').findOne({ email }, {
      projection: {
        password: 1,
      },
    });

    return user;
  }
};
