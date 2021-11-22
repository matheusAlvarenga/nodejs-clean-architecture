const { MissingParamError } = require('../../utils/errors');
const AuthUseCase = require('./auth-usecase');

const makeSut = () => {
  class LoadUserByEmailRepositorySpy {
    async load(email) {
      this.email = email;
    }
  }
  const loadUserByEmailRepositorySpy = new LoadUserByEmailRepositorySpy();
  const sut = new AuthUseCase(loadUserByEmailRepositorySpy);

  return {
    sut,
    loadUserByEmailRepositorySpy,
  };
};

describe('Auth UseCase', () => {
  test('should throw if no email is provided', async () => {
    const { sut } = makeSut();
    const promise = sut.auth();
    expect(promise).rejects.toThrow(new MissingParamError('email'));
  });

  test('should throw if no password is provided', async () => {
    const { sut } = makeSut();
    const promise = sut.auth('any_email@mail.com');
    expect(promise).rejects.toThrow(new MissingParamError('password'));
  });

  test('should call LoadUserByEmailRepository with correct email', async () => {
    const { sut, loadUserByEmailRepositorySpy } = makeSut();
    await sut.auth('any_email@mail.com', 'any_password');
    expect(loadUserByEmailRepositorySpy.email).toBe('any_email@mail.com');
  });

  test('should throw if no LoadUserByEmailRepository is provided', async () => {
    const sut = new AuthUseCase();
    const promise = sut.auth('any_email@mail.com', 'any_password');
    expect(promise).rejects.toThrow();
  });

  test('should throw if no LoadUserByEmailRepository has no load method', async () => {
    const sut = new AuthUseCase({});
    const promise = sut.auth('any_email@mail.com', 'any_password');
    expect(promise).rejects.toThrow();
  });

  test('should return null if LoadUserByEmailRepository returns null', async () => {
    const { sut } = makeSut();
    const accessToken = await sut.auth('invalid_email@mail.com', 'any_password');
    expect(accessToken).toBeNull();
  });
});
