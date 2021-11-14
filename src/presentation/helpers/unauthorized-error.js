module.exports = class UnauthorizedError extends Error {
  constructor() {
    super('anauthorized');
    this.name = UnauthorizedError;
  }
};
