const bcrypt = require('bcrypt');
const { MissingParamError } = require('../errors');

module.exports = class Encrypter {
  async compare(string, hashedString) {
    if (!string) {
      throw new MissingParamError('string');
    }
    if (!hashedString) {
      throw new MissingParamError('hashedString');
    }
    const isValid = await bcrypt.compare(string, hashedString);
    return isValid;
  }
};
