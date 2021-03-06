const MongoHelper = require('../helpers/mongo-helper');
const { MissingParamError } = require('../../utils/errors');
const LoadUserByEmailRepository = require('./load-user-by-email-repository');

let db;

const makeSut = async () => new LoadUserByEmailRepository();

describe('LoadUserByEmail Repository', () => {
  beforeAll(async () => {
    // eslint-disable-next-line no-underscore-dangle
    await MongoHelper.connect(global.__MONGO_URI__);
    db = MongoHelper.db;
  });

  beforeEach(async () => {
    await db.collection('users').deleteMany();
  });

  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  test('should return null if no user is found', async () => {
    const sut = await makeSut();
    const user = await sut.load('invalid_email@mail.com');
    expect(user).toBeNull();
  });

  test('should return an user if user is found', async () => {
    const sut = await makeSut();
    const fakeUser = await db.collection('users').insertOne({ email: 'valid_email@mail.com', password: 'any_hashed_password' });
    const user = await sut.load('valid_email@mail.com');

    expect(user).toEqual({
      _id: fakeUser.insertedId,
      password: 'any_hashed_password',
    });
  });

  test('should throw if no email is provided', async () => {
    const sut = await makeSut();
    const promise = sut.load();
    expect(promise).rejects.toThrow(new MissingParamError('email'));
  });
});
