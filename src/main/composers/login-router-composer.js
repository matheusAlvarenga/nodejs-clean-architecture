const env = require('../config/env');

const LoginRouter = require('../../presentation/routers/login-router');
const AuthUseCase = require('../../domain/usecases/auth-usecase');
const EmailValidator = require('../../utils/helpers/email-validator');
const LoadUserByEmailRepository = require('../../infra/repositorys/load-user-by-email-repository');
const UpdateAccessTokenRepository = require('../../infra/repositorys/update-access-token-repository');
const Encrypter = require('../../utils/helpers/encrypter');
const TokenGenerator = require('../../utils/helpers/token-generator');

const loadUserByEmailRepository = new LoadUserByEmailRepository();
const updateAccessTokenRepository = new UpdateAccessTokenRepository();
const encrypter = new Encrypter();
const tokenGenerator = new TokenGenerator(env.tokenSecret);
const authUseCase = new AuthUseCase({
  loadUserByEmailRepository,
  updateAccessTokenRepository,
  encrypter,
  tokenGenerator,
});
const emailValidator = new EmailValidator();
module.exports = new LoginRouter({ authUseCase, emailValidator });
