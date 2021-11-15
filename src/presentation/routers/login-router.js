const HttpResponse = require('../helpers/http-response');

module.exports = class LoginRouter {
  constructor(authUseCase) {
    this.authUseCase = authUseCase;
  }

  async route(httpRequest) {
    try {
      const { email, password } = httpRequest.body;

      if (!email) return HttpResponse.badRequest('email');
      if (!password) return HttpResponse.badRequest('password');

      const accessToken = await this.authUseCase.auth(email, password);

      return accessToken ? HttpResponse.ok({ accessToken }) : HttpResponse.unauthorized();
    } catch {
      return HttpResponse.serverError();
    }
  }
};
