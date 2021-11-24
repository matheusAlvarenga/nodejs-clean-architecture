const MongoHelper = require('../helpers/mongo-helper');

let db;

class UpdateAccessTokenRepository {
  constructor(userModel) {
    this.userModel = userModel;
  }

  async update(userId, accessToken) {
    await this.userModel.updateOne({ _id: userId }, {
      $set: {
        accessToken,
      },
    });
  }
}

const makeSut = () => {
  const userModel = db.collection('users');
  const sut = new UpdateAccessTokenRepository(userModel);

  return {
    userModel,
    sut,
  };
};

describe('UpdateAccessToken Repository', () => {
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

  test('should update the user with the given accessToken', async () => {
    const { sut, userModel } = makeSut();

    const fakeUser = await userModel.insertOne({ email: 'valid_email@mail.com', password: 'any_hashed_password' });

    await sut.update(fakeUser.insertedId, 'valid_token');

    const updatedFakeUser = await userModel.findOne({ _id: fakeUser.insertedId });
    expect(updatedFakeUser.accessToken).toBe('valid_token');
  });

  test('should throw if no userModel is provided', async () => {
    const userModel = db.collection('users');
    const sut = new UpdateAccessTokenRepository();

    const fakeUser = await userModel.insertOne({ email: 'valid_email@mail.com', password: 'any_hashed_password' });

    const promise = sut.update(fakeUser.insertedId, 'any_token');
    expect(promise).rejects.toThrow();
  });
});
