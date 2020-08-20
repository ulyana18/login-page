const assert = require('assert');
const chai = require('chai');
const ApiService = require('../client/src/services/api-service');
const app = require('../api/app');
const request = require('supertest');
const expect = chai.expect;


describe('post /api/user/signup', () => {
    it('should sign up Nastya', (done) => {
      request(app)
      .post('/api/user/signup')
      .set('Content-Type', 'application/json')
      .send({
            user: {
              name: 'Nastya',
              email: 'nastya1@gmail.com',
              password: '1234',
            },
       })
      .end((err, res) => {
            expect(res.body.user).to.equal('Nastya');
            done()
        })
    });
});

describe('post /api/user/signup', () => {
    it('should not sign up Alexander, because this email is already in use', (done) => {
      request(app)
      .post('/api/user/signup')
      .set('Content-Type', 'application/json')
      .send({
            user: {
              name: 'Alexander',
              email: 'alex@gmail.com',
              password: '1234',
            },
       })
      .end((err, res) => {
            expect(res.status).to.equal(400);
            done()
        })
    });
});

describe('post /api/user/login', () => {
    it('should log in Julia', (done) => {
      request(app)
      .post('/api/user/login')
      .set('Content-Type', 'application/json')
      .send({
            user: {
              email: 'julia@gmail.com',
              password: '1234',
            },
       })
      .end((err, res) => {
            expect(res.body.user).to.equal('Julia');
            done()
        })
    });
});

describe('post /api/user/login', () => {
    it('should not log in Mary, because email or password is not right', (done) => {
      request(app)
      .post('/api/user/login')
      .set('Content-Type', 'application/json')
      .send({
            user: {
              email: 'maryf@gmail.com',
              password: '1234',
            },
       })
      .end((err, res) => {
            expect(res.status).to.equal(400);
            done()
        })
    });
});

