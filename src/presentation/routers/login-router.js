const HttpResponse = require('../helpers/http-response');
const MissingParamError = require('../helpers/missing-param-error');

module.exports = class LoginRouter {
  constructor(authUseCase) {
    this.authUseCase = authUseCase;
  }

  async route(httpRequest) {
    try {
      const { email, password } = httpRequest.body;

      if (!email) return HttpResponse.badRequest(new MissingParamError('email'));
      if (!password) return HttpResponse.badRequest(new MissingParamError('password'));

      const accessToken = await this.authUseCase.auth(email, password);

      return accessToken ? HttpResponse.ok({ accessToken }) : HttpResponse.unauthorized();
    } catch {
      return HttpResponse.serverError();
    }
  }
};
