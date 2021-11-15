class EmailValidator {
  isValid() {
    return true;
  }
}

describe('Email Validator', () => {
  test('should return true if validator returns true', () => {
    const sut = new EmailValidator();
    const isEmailValid = sut.isValid('valid_mail@mail.com');
    expect(isEmailValid).toBe(true);
  });
});
