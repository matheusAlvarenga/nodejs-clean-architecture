module.exports = {
  coverageDirectory: 'coverage',
  collectCoverageFrom: ['**/src/**/*.js'],
  coverageProvider: 'v8',
  preset: '@shelf/jest-mongodb',
  watchPathIgnorePatterns: ['globalConfig'],
  testMatch: ['**/*.int-test.js', '**/*.unit-test.js'],
};
