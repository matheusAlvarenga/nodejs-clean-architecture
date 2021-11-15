module.exports = {
  isEmailValid: true,
  isEmail(email) {
    this.email = email;
    return this.isEmailValid;
  },
};
