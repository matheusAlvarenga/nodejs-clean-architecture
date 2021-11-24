const request = require('supertest');
const app = require('./app');

describe('App Setup', () => {
  test('should disable x-powered-by header', async () => {
    app.get('/test_x_powered_by', (req, res) => res.send(''));

    const response = await request(app).get('/test_x_powered_by');
    expect(response.headers['x-powered-by']).toBeUndefined();
  });
});
