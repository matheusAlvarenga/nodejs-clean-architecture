const validator = require('validator');
const EmailValidator = require('./email-validator');

const makeSut = () => new EmailValidator();

describe('Email Validator', () => {
  test('should return true if validator returns true', () => {
    const sut = makeSut();
    const isEmailValid = sut.isValid('valid_mail@mail.com');
    expect(isEmailValid).toBe(true);
  });

  test('should return false if validator returns false', () => {
    const sut = makeSut();
    validator.isEmailValid = false;
    const isEmailValid = sut.isValid('invalid_mail@mail.com');
    expect(isEmailValid).toBe(false);
  });

  test('should call validator with correct email', () => {
    const sut = makeSut();
    sut.isValid('any_mail@mail.com');
    expect(validator.email).toBe('any_mail@mail.com');
  });
});
