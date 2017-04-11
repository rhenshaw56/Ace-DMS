import supertest from 'supertest';
import { expect } from 'chai';
import db from '../../models';
import app from '../../server';
import FakeData from '../helpers/SpecFakers';
import SpecSeeders from '../helpers/SpecSeeders';

const client = supertest.agent(app);
const testUser = FakeData.generateRandomUser(2);
let regularUserToken;
let adminUserToken;
let regularUserId;

describe('Users:', () => {
  before((done) => {
    SpecSeeders.init()
    .then(() => {
      client.post('/api/users')
      .send(testUser)
      .end((error, response) => {
        regularUserToken = response.body.token;
        regularUserId = response.body.id;
        done();
      });
    });
  });

  after((done) => {
    db.sequelize.sync({ force: true })
    .then(() => {
      done();
    });
  });

  describe('SIGNUP', () => {
    const newTestUser = FakeData.generateRandomUser(2);
    it('should return http code 201 when a user successfully signs up', (done) => {
      client.post('/api/users')
      .send(newTestUser)
      .end((error, response) => {
        expect(response.status).to.equal(201);
        done();
      });
    });

    it('should return a 401 status code if User ID is specified on signup',
    (done) => {
      const invalidTestUser = FakeData.generateRandomUser();
      invalidTestUser.id = 1;
      client.post('/api/users')
      .send(invalidTestUser)
      .end((error, response) => {
        expect(response.status).to.equal(400);
        done();
      });
    });

    it('should NOT signup a user with an already existing Email address',
    (done) => {
      client.post('/api/users')
      .send(newTestUser)
      .end((error, response) => {
        expect(response.status).to.equal(409);
        done();
      });
    });

    it('should NOT allow an Admin User to signup',
    (done) => {
      const newAdminUser = FakeData.generateRandomUser(1);
      client.post('/api/users')
      .send(newAdminUser)
      .end((error, response) => {
        expect(response.status).to.equal(403);
        done();
      });
    });

    it('should NOT allow Users with invalid Role type to signup',
    (done) => {
      const invalidRoleUser = FakeData.generateRandomUser('chairman');
      client.post('/api/users')
      .send(invalidRoleUser)
      .end((error, response) => {
        expect(response.status).to.equal(400);
        done();
      });
    });

    it('should return a TOKEN if a Regular User is successfully created',
    (done) => {
      client.post('/api/users')
      .send(FakeData.generateRandomUser(2))
      .end((error, response) => {
        expect(response.status).to.equal(201);
        expect(response.body).to.have.property('token');
        done();
      });
    });

    it('should return all details of the User except password after successful signup',
    (done) => {
      client.post('/api/users')
      .send(FakeData.generateRandomUser(2))
      .end((error, response) => {
        expect(response.status).to.equal(201);
        expect(response.body).to.have.property('firstName');
        expect(response.body).to.have.property('lastName');
        expect(response.body).to.have.property('email');
        expect(response.body).to.have.property('id');
        expect(response.body).to.not.have.property('password');
        done();
      });
    });

    it('should NOT signup a user with no valid data',
    (done) => {
      const invalidUser = {};
      client.post('/api/users')
      .send(invalidUser)
      .end((error, response) => {
        expect(response.status).to.equal(400);
        done();
      });
    });

    it(`should by default assign roles as Regular if no roleId
      is specified on signup`, (done) => {
      client.post('/api/users')
      .send(FakeData.generateRandomUser())
      .end((error, response) => {
        expect(response.status).to.equal(201);
        done();
      });
    });

    it('should return a 400 status code for a an unknown role type', (done) => {
      client.post('/api/users')
      .send(FakeData.generateRandomUser(10))
      .end((error, response) => {
        expect(response.status).to.equal(400);
        done();
      });
    });
  });

  describe('LOGIN', () => {
    it('should allow login for VALID details of an Admin', (done) => {
      client.post('/api/users/login')
      .send({
        email: FakeData.AdminUser.email,
        password: FakeData.AdminUser.password
      })
      .end((error, response) => {
        expect(response.status).to.equal(200);
        done();
      });
    });
    it('should return a TOKEN for Admin after successful Login', (done) => {
      client.post('/api/users/login')
      .send({
        email: FakeData.AdminUser.email,
        password: FakeData.AdminUser.password
      })
      .end((error, response) => {
        expect(response.status).to.equal(200);
        expect(response.body).to.have.property('token');
        // set the admin user token for other tests
        adminUserToken = response.body.token;
        done();
      });
    });

    it('should NOT return a TOKEN if Admin credentials are wrong', (done) => {
      client.post('/api/users/login')
      .send({
        email: FakeData.AdminUser.email,
        password: 'pa$$word'
      })
      .end((error, response) => {
        expect(response.status).to.equal(401);
        expect(response.body).to.not.have.property('token');
        done();
      });
    });

    it('should return a TOKEN for Regulars after successful Login', (done) => {
      client.post('/api/users/login')
      .send({
        email: FakeData.RegularUser.email,
        password: FakeData.RegularUser.password
      })
      .end((error, response) => {
        expect(response.status).to.equal(200);
        expect(response.body).to.have.property('token');
        done();
      });
    });

    it(`should ensure payload of returned token does not contain
    sensitive data of the User)`,
    (done) => {
      client.post('/api/users/login')
      .send({
        email: FakeData.RegularUser.email,
        password: FakeData.RegularUser.password
      })
      .end((error, response) => {
        expect(response.status).to.equal(200);
        const tokenPayload = response.body.token.split('.')[1];
        const decodedToken = JSON.parse(
          new Buffer(tokenPayload, 'base64').toString()
        );
        expect(decodedToken).to.have.property('userId');
        expect(decodedToken).to.not.have.property('roleId');
        done();
      });
    });

    it('should NOT return a TOKEN if Regular User credentials are wrong', (done) => {
      client.post('/api/users/login')
      .send({
        email: FakeData.RegularUser.email,
        password: 'pa$$word'
      })
      .end((error, response) => {
        expect(response.status).to.equal(401);
        expect(response.body).to.not.have.property('token');
        done();
      });
    });

    it('should NOT allow Users that dont exist to login',
    (done) => {
      const nonRegisteredUser = FakeData.generateRandomUser(2);
      client.post('/api/users/login')
      .send({
        email: nonRegisteredUser.email,
        password: nonRegisteredUser.password
      })
      .end((error, response) => {
        expect(response.status).to.equal(404);
        done();
      });
    });

    it('should NOT allow login if email is not provided',
    (done) => {
      client.post('/api/users/login')
      .send({
        password: FakeData.RegularUser.password
      })
      .end((error, response) => {
        expect(response.status).to.equal(400);
        done();
      });
    });

    it('should NOT allow login if password is not provided',
    (done) => {
      client.post('/api/users/login')
      .send({
        email: FakeData.RegularUser.email
      })
      .end((error, response) => {
        expect(response.status).to.equal(400);
        done();
      });
    });
  });

  describe('LOGOUT', () => {
    const newRegularUser = FakeData.generateRandomUser(2);
    before((done) => {
      client.post('/api/users/')
      .send(newRegularUser)
      .end((error, response) => {
        newRegularUser.token = response.body.token;
        newRegularUser.id = response.body.id;
        done();
      });
    });

    it('should successfully log a user out && set currentToken to null',
    (done) => {
      client.post('/api/users/logout')
      .send(newRegularUser)
      .end((error, response) => {
        expect(response.status).to.equal(200);
        expect(response.body.message).to.equal('Successfully Logged out');
        db.User.findById(newRegularUser.id)
        .then((user) => {
          expect(user.currentToken).to.equal(null);
        });
        done();
      });
    });
  });
});
