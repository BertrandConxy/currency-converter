const chai = require('chai')
const request = require('supertest')
const app = require('../server')

describe('currencyConvert function', () => {
    it('should return status 200 and render the result page when given valid query parameters', async () => {
      const response = await request(app)
        .get('/currency-convert?fromCurrency=USD&toCurrency=EUR&amount=100')
        .expect(200);
      expect(response.text).to.contain('Result');
    });
  
    it('should return status 200 and render the error page when given null query parameters', async () => {
      const response = await request(app)
        .get('/currency-convert?fromCurrency=null&toCurrency=null&amount=null')
        .expect(200);
      expect(response.text).to.contain('Error');
    });
  });
