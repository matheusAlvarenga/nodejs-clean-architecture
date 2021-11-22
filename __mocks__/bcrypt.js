module.exports = {
  isValid: true,
  string: '',
  hashedString: '',
  async compare(string, hashedString) {
    this.string = string;
    this.hashedString = hashedString;
    return this.isValid;
  },
};
