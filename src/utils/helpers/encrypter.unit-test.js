const bcrypt = require('bcrypt');
const Encrypter = require('./encrypter');
const { MissingParamError } = require('../errors');

const makeSut = () => new Encrypter();

describe('Encrypter', () => {
  test('should return true if bcrypt returns true', async () => {
    const sut = makeSut();
    const isValid = await sut.compare('any_string', 'any_hashed_string');
    expect(isValid).toBe(true);
  });

  test('should return false if bcrypt returns false', async () => {
    const sut = makeSut();
    bcrypt.isValid = false;
    const isValid = await sut.compare('any_string', 'any_hashed_string');
    expect(isValid).toBe(false);
  });

  test('should call bcrypt with correct values', async () => {
    const sut = makeSut();
    await sut.compare('any_string', 'any_hashed_string');
    expect(bcrypt.string).toBe('any_string');
    expect(bcrypt.hashedString).toBe('any_hashed_string');
  });

  test('should throw if no params are provided', async () => {
    const sut = makeSut();
    expect(sut.compare()).rejects.toThrow(new MissingParamError('string'));
    expect(sut.compare('any_value')).rejects.toThrow(new MissingParamError('hashedString'));
  });
});
