const validator = require('validator');

class EmailValidator {
  isValid(email) {
    return validator.isEmail(email);
  }
}

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
});
