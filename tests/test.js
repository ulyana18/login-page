const assert = require('assert');
const chai = require('chai');
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
              email: 'nastya12345@gmail.com',
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
        require('../api/routes/index');
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
            expect(res.status).to.equal(401);
            done()
        })
    });
});

describe('post /api/user/login', () => {
    it('should log in Julia', (done) => {
        require('../api/routes/index');
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
            expect(res.status).to.equal(401);
            done();
        })
    });
});

describe('post /api/user/check', () => {
  it('should return error, because access token is not in use now', (done) => {
    request(app)
    .post('/api/user/check')
    .set('Content-Type', 'application/json')
    .send({
      user: {
        'accessToken': '',
        'name': '',
        'email': '',
        'refreshToken': ''
      },
    })
    .end((err, res) => {
      expect(res.body.message).to.equal('No token provided.');
      done();
    })
  });
});

describe('post /api/user/check', () => {
  it('should return error, because access token was not send', (done) => {
    request(app)
    .post('/api/user/check')
    .set('Content-Type', 'application/json')
    .send({
      user: {
        'name': '',
        'email': '',
        'refreshToken': ''
      },
    })
    .end((err, res) => {
      console.log(res.body);
      expect(res.body.error).to.equal(true);
      done();
    })
  });
});
