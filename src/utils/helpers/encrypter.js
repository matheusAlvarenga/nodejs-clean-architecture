const bcrypt = require('bcrypt');

module.exports = class Encrypter {
  async compare(string, hashedString) {
    const isValid = await bcrypt.compare(string, hashedString);
    return isValid;
  }
};
