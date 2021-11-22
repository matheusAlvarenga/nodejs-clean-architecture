const bcrypt = require('bcrypt');

class Encrypter {
  async compare(string, hashedString) {
    const isValid = await bcrypt.compare(string, hashedString);
    return isValid;
  }
}

describe('Encrypter', () => {
  test('should return true if bcrypt returns true', async () => {
    const sut = new Encrypter();
    const isValid = await sut.compare('any_string', 'any_hashed_string');
    expect(isValid).toBe(true);
  });

  test('should return false if bcrypt returns false', async () => {
    const sut = new Encrypter();
    bcrypt.isValid = false;
    const isValid = await sut.compare('any_string', 'any_hashed_string');
    expect(isValid).toBe(false);
  });
});
