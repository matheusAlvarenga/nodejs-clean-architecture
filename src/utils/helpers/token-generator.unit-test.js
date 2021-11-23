const jwt = require('jsonwebtoken');

class TokenGenerator {
  async generate(id) {
    return jwt.sign(id, 'secret');
  }
}

describe('Token Generator', () => {
  test('should return null if JWT returns null', async () => {
    const sut = new TokenGenerator();
    jwt.token = null;
    const token = await sut.generate('any_id');
    expect(token).toBeNull();
  });

  test('should return null if JWT returns null', async () => {
    const sut = new TokenGenerator();
    const token = await sut.generate('any_id');
    expect(token).toBe(jwt.token);
  });
});
