const assert = require('assert');
const chai = require('chai');
const app = require('../api/app');
const request = require('supertest');

const expect = chai.expect;

const io = require('socket.io-client');
const socketURL = 'http://localhost:9000';
const options ={
  transports: ['websocket'],
  'force new connection': true
};

const chatUser1 = {'message':'wxdxwdqw', 'name':'Tom', 'email':'tom@gmail.com'};

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

describe('Server', function(){
  it('Should add new message to the database', function(done){
    const client1 = io.connect(socketURL, options);
  
    client1.on('connect', function(data){
      client1.emit('chat message', chatUser1);
      expect(data).to.equal({ 'message':'wxdxwdqw', 'name':'Tom', 'email':'tom@gmail.com' });
    });

    client1.disconnect();
    done();
  });

  it('Should return all previous messages from the database', function(done){
    const client1 = io.connect(socketURL, options);
  
    client1.on('get database', function(database){
      client1.emit('get database');
      expect(database.rows[0].email).to.equal('micha@gmail.com');
    });

    client1.disconnect();
    done();
  });

  it('Should delete chosen message from the database', function(done){
    const client1 = io.connect(socketURL, options);
  
    client1.on('delete message', function(messageId){
      client1.emit('delete message', 17);
      expect(+messageId).to.equal(17);
    });

    client1.disconnect();
    done();
  });

});

