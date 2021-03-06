const request = require('supertest');
const app = require('../config/app');

describe('Content Type Middleware', () => {
  test('should return json content type as default', async () => {
    app.get('/content_type', (req, res) => res.send(''));

    await request(app).get('/content_type').expect('content-type', /json/);
  });

  test('should return xml content type if forced', async () => {
    app.get('/content_type_xml', (req, res) => {
      res.type('xml');
      res.send('');
    });

    await request(app).get('/content_type_xml').expect('content-type', /xml/);
  });
});
