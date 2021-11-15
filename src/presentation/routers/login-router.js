const HttpResponse = require('../helpers/http-response');
const { MissingParamError, InvalidParamError } = require('../errors');

module.exports = class LoginRouter {
  constructor(authUseCase, emailValidator) {
    this.authUseCase = authUseCase;
    this.emailValidator = emailValidator;
  }

  async route(httpRequest) {
    try {
      const { email, password } = httpRequest.body;

      if (!email) return HttpResponse.badRequest(new MissingParamError('email'));
      if (!this.emailValidator.isValid(email)) return HttpResponse.badRequest(new InvalidParamError('email'));
      if (!password) return HttpResponse.badRequest(new MissingParamError('password'));

      const accessToken = await this.authUseCase.auth(email, password);

      return accessToken ? HttpResponse.ok({ accessToken }) : HttpResponse.unauthorized();
    } catch {
      return HttpResponse.serverError();
    }
  }
};
