const { MissingParamError } = require('../../utils/errors');
const MongoHelper = require('../helpers/mongo-helper');
const UpdateAccessTokenRepository = require('./update-access-token-repository');

let db;

const makeSut = () => {
  const userModel = db.collection('users');
  const sut = new UpdateAccessTokenRepository(userModel);

  return {
    userModel,
    sut,
  };
};

describe('UpdateAccessToken Repository', () => {
  let fakeUserId;

  beforeAll(async () => {
    // eslint-disable-next-line no-underscore-dangle
    await MongoHelper.connect(global.__MONGO_URI__);
    db = MongoHelper.db;
  });

  beforeEach(async () => {
    const userModel = db.collection('users');
    await db.collection('users').deleteMany();
    const fakeUser = await userModel.insertOne({ email: 'valid_email@mail.com', password: 'any_hashed_password' });
    fakeUserId = fakeUser.insertedId;
  });

  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  test('should update the user with the given accessToken', async () => {
    const { sut, userModel } = makeSut();

    await sut.update(fakeUserId, 'valid_token');

    const updatedFakeUser = await userModel.findOne({ _id: fakeUserId });
    expect(updatedFakeUser.accessToken).toBe('valid_token');
  });

  test('should throw if no userModel is provided', async () => {
    const sut = new UpdateAccessTokenRepository();

    const promise = sut.update(fakeUserId, 'any_token');
    expect(promise).rejects.toThrow();
  });

  test('should throw if no params are provided', async () => {
    const { sut } = await makeSut();

    expect(sut.update()).rejects.toThrow(new MissingParamError('userId'));
    expect(sut.update(fakeUserId)).rejects.toThrow(new MissingParamError('accessToken'));
  });
});
