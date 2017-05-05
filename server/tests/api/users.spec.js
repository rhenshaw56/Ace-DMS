import { expect } from 'chai';
import supertest from 'supertest';
import app from '../../server';
import db from '../../models';
import SpecSeeders from '../helpers/SpecSeeders';
import FakeData from '../helpers/SpecFakers';

const client = supertest.agent(app);
const regularUser = FakeData.generateRandomUser(2);
let regularUserToken;
let regularUserId;
let adminUserToken;

describe('Users:', () => {
  before((done) => {
    SpecSeeders.populateRoleTable()
    .then(() => {
      db.User.create(FakeData.AdminUser);
    })

    .then(() => {
      client.post('/api/users')
      .send(regularUser)
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
  describe('Create User', () => {
    const newRegularUser = FakeData.generateRandomUser(2);
    it(`should return http code 201
      if a Regular User is successfully created`, (done) => {
      client.post('/api/users')
      .send(newRegularUser)
      .end((error, response) => {
        expect(response.status).to.equal(201);
        done();
      });
    });

    it(`should return a 401 status code if User-ID is specified
    in new User to be created`,
    (done) => {
      const invalidNewUser = FakeData.generateRandomUser();
      invalidNewUser.id = 1;
      client.post('/api/users')
      .send(invalidNewUser)
      .end((error, response) => {
        expect(response.status).to.equal(400);
        done();
      });
    });

    it('should not allow Users with Duplicate Email address to be created',
    (done) => {
      client.post('/api/users')
      .send(newRegularUser)
      .end((error, response) => {
        expect(response.status).to.equal(409);
        done();
      });
    });

    it('should not allow an Admin User to be created',
    (done) => {
      const newAdminUser = FakeData.generateRandomUser(1);
      client.post('/api/users')
      .send(newAdminUser)
      .end((error, response) => {
        expect(response.status).to.equal(403);
        done();
      });
    });

    it('should not allow Users with invalid Role type to be created',
    (done) => {
      const invalidRoleUser = FakeData.generateRandomUser('super-admin');
      client.post('/api/users')
      .send(invalidRoleUser)
      .end((error, response) => {
        expect(response.status).to.equal(400);
        done();
      });
    });

    it('should return a token if a Regular User is successfully created',
    (done) => {
      client.post('/api/users')
      .send(FakeData.generateRandomUser(2))
      .end((error, response) => {
        expect(response.status).to.equal(201);
        expect(response.body).to.have.property('token');
        done();
      });
    });

    it('should return public details of the created Regular User',
    (done) => {
      client.post('/api/users')
      .send(FakeData.generateRandomUser(2))
      .end((error, response) => {
        expect(response.status).to.equal(201);
        expect(response.body).to.have.property('firstName');
        expect(response.body).to.have.property('lastName');
        expect(response.body).to.have.property('email');
        expect(response.body).to.have.property('id');
        done();
      });
    });

    it('should not create a User if Required fields/attributes are missing',
    (done) => {
      const invalidUser = {};
      client.post('/api/users')
      .send(invalidUser)
      .end((error, response) => {
        expect(response.status).to.equal(400);
        done();
      });
    });

    it(`should make a User role be regular by default if no roleId
      is supplied`, (done) => {
      client.post('/api/users')
      .send(FakeData.generateRandomUser())
      .end((error, response) => {
        expect(response.status).to.equal(201);
        done();
      });
    });

    it(`should return a 400 status code if the User specify an invalid
    Role type`, (done) => {
      client.post('/api/users')
      .send(FakeData.generateRandomUser(10))
      .end((error, response) => {
        expect(response.status).to.equal(400);
        done();
      });
    });
  });

  describe('Login', () => {
    it('should allow login for valid Admin details', (done) => {
      const loginUser = { email: FakeData.AdminUser.email,
        password: FakeData.AdminUser.password
      };
      client.post('/api/users/login')
      .send(loginUser)
      .end((error, response) => {
        expect(response.status).to.equal(200);
        done();
      });
    });

    it('should return a TOKEN if Admin Logs in successfully', (done) => {
      client.post('/api/users/login')
      .send({
        email: FakeData.AdminUser.email,
        password: FakeData.AdminUser.password
      })
      .end((error, response) => {
        expect(response.status).to.equal(200);
        expect(response.body).to.have.property('token');
        adminUserToken = response.body.token;
        done();
      });
    });

    it('should not return a token if Admin Login is unsuccessful', (done) => {
      client.post('/api/users/login')
      .send({
        email: FakeData.AdminUser.email,
        password: 'iamAstark'
      })
      .end((error, response) => {
        expect(response.status).to.equal(401);
        expect(response.body).to.not.have.property('token');
        done();
      });
    });

    it('should return a token if a User Login is successful', (done) => {
      client.post('/api/users/login')
      .send({
        email: regularUser.email,
        password: regularUser.password

      })
      .end((error, response) => {
        expect(response.status).to.equal(200);
        expect(response.body).to.have.property('token');
        done();
      });
    });

    it('should ensure returned token does not contain sensitive data of the User',
    (done) => {
      client.post('/api/users/login')
      .send({

        email: regularUser.email,
        password: regularUser.password

      })
      .end((error, response) => {
        expect(response.status).to.equal(200);
        const tokenizedData = response.body.token.split('.')[1];
        const decodedToken = JSON.parse(
          new Buffer(tokenizedData, 'base64').toString()
        );
        expect(decodedToken).to.have.property('id');
        expect(decodedToken).to.not.have.property('password');

        done();
      });
    });

    it('should not return a token if Regular User Login is not successful', (done) => {
      client.post('/api/users/login')
      .send({

        email: regularUser.email,

        password: 'rituals'
      })
      .end((error, response) => {
        expect(response.status).to.equal(401);
        expect(response.body).to.not.have.property('token');
        done();
      });
    });

    it('should not login an unregistered User',
    (done) => {
      const unRegisteredUser = FakeData.generateRandomUser(2);
      client.post('/api/users/login')
      .send({
        email: unRegisteredUser.email,
        password: unRegisteredUser.password
      })
      .end((error, response) => {
        expect(response.status).to.equal(404);
        done();
      });
    });

    it('should not login a user if email is not provided',
    (done) => {
      client.post('/api/users/login')
      .send({

        password: regularUser.password

      })
      .end((error, response) => {
        expect(response.status).to.equal(400);
        done();
      });
    });

    it('should not login a user if password is not provided',
    (done) => {
      client.post('/api/users/login')
      .send({

        email: regularUser.email

      })
      .end((error, response) => {
        expect(response.status).to.equal(400);
        done();
      });
    });
  });

  describe('Search Users', () => {

    it('should not allow a registered User access to list of users',

    (done) => {
      client.get('/api/users')
      .set({ 'x-access-token': regularUserToken })
      .end((error, response) => {

        expect(response.status).to.equal(403);

        expect(response.body).to.be.instanceof(Object);
        done();
      });
    });

    it('should allow an admin access to list of users', (done) => {
      client.get('/api/users')
      .set({ 'x-access-token': adminUserToken })
      .end((error, response) => {
        expect(response.status).to.equal(200);
        expect(response.body).to.be.instanceOf(Object);
        done();
      });
    });

    it('should not allow unauthorized users to list of users', (done) => {
      client.get('/api/users')
     .end((error, response) => {
       expect(response.status).to.equal(401);
       done();
     });
    });
  });

  describe('Find User', () => {
    it('should allow a valid user with valid token fetch another user',
    (done) => {
      client.get(`/api/users/${regularUserId + 1}`)
      .set({ 'x-access-token': regularUserToken })
      .end((error, response) => {
        expect(response.status).to.equal(200);
        expect(response.body).to.be.instanceOf(Object);
        done();
      });
    });


    it('should allow an admin User fetch another user',

    (done) => {
      client.get(`/api/users/${regularUserId}`)
      .set({ 'x-access-token': adminUserToken })
      .end((error, response) => {
        expect(response.status).to.equal(200);
        expect(response.body).to.be.instanceOf(Object);
        done();
      });
    });

    it('should not accept unauthenticated requests',
    (done) => {
      client.get('/api/users/ytrpop')
      .set({ 'x-access-token': adminUserToken })
      .end((error, response) => {
        expect(response.status).to.equal(400);
        expect(response.body.message).to.equal('Bad Request');
        done();
      });
    });

    it('should not allow unauthenticated search for a User', (done) => {
      client.get('/api/users/1')
      .end((error, response) => {
        expect(response.status).to.equal(401);
        expect(response.body.message).to.equal('Authentication Token Required');
        done();
      });
    });


    it('should accept offsets when fetching Users', (done) => {
      const searchOffset = 3;
      client.get(`/api/users/?offset=${searchOffset}`)
      .set({ 'x-access-token': adminUserToken })
      .end((error, response) => {
        expect(response.status).to.equal(200);
        expect(response.body).to.be.instanceof(Object);
        done();
      });
    });

    it('should not accept invalid offsets',
    (done) => {
      const invalidSearchOffset = -1;
      client.get(`/api/users/?offset=${invalidSearchOffset}`)
      .set({ 'x-access-token': adminUserToken })
      .end((error, response) => {
        expect(response.status).to.equal(400);
        expect(response.body.message).to.equal('Invalid Offset');
        done();
      });
    });
  });

  describe('Update User', () => {
    it('should not allow a regular user update another User', (done) => {
      client.put(`/api/users/${regularUserId + 1}`)
      .set({ 'x-access-token': regularUserToken })
      .send({ password: 'new password' })
      .end((error, response) => {
        expect(response.status).to.equal(403);
        done();
      });
    });


    it('should allow a user Update his password if Token is provided',
    (done) => {
      regularUser.newPassword = 'new password';

      client.put(`/api/users/${regularUserId}`)
      .send({
        password: regularUser.newPassword
      })
      .set({ 'x-access-token': regularUserToken })
      .end((error, response) => {
        expect(response.status).to.equal(200);

        done();
      });
    });


    it(`should return a 403 status code indication it does NOT
    allow a regular User Update to an Admin User`,
    (done) => {
      client.put(`/api/users/${regularUserId}`)
      .send({
        roleId: 1
      })
      .set({ 'x-access-token': regularUserToken })
      .end((error, response) => {
        expect(response.status).to.equal(403);
        done();
      });
    });

    it(`should return a 403 status code indication it does NOT
    allow update of a User ID`,
    (done) => {
      client.put(`/api/users/${regularUserId}`)
      .send({
        id: 4
      })
      .set({ 'x-access-token': regularUserToken })
      .end((error, response) => {
        expect(response.status).to.equal(400);
        done();
      });
    });

    it('should Allow a User Login with the updated password',
    (done) => {
      client.post('/api/users/login')
      .send({
        email: regularUser.email,
        password: regularUser.newPassword
      })
      .end((error, response) => {
        expect(response.status).to.equal(200);
        done();
      });
    });

    it('should NOT Allow a User Login with the old password',
    (done) => {
      client.post('/api/users/login')
      .send({
        email: regularUser.email,
        password: regularUser.password
      })
      .end((error, response) => {
        expect(response.status).to.equal(401);
        done();
      });
    });


    it(`should Allow an Admin with a valid token update a regular
    User password`,
    (done) => {

      regularUser.adminSetPassword = 'admin set password';
      client.put(`/api/users/${regularUserId}`)
      .send({
        password: regularUser.adminSetPassword
      })
      .set({ 'x-access-token': adminUserToken })
      .end((error, response) => {
        expect(response.status).to.equal(200);
        done();
      });
    });

    it(`should return a 404 response when an Admin tries to update
    a user that does NOT exist`,
    (done) => {


      regularUser.adminSetPassword = 'admin set password';
      client.put(`/api/users/${1000}`)
      .send({
        password: regularUser.adminSetPassword
      })
      .set({ 'x-access-token': adminUserToken })
      .end((error, response) => {
        expect(response.status).to.equal(404);
        done();
      });
    });

    it(`should NOT allow a User Login with the old password already
    updated by an Admin`,
    (done) => {
      client.post('/api/users/login')
      .send({
        email: regularUser.email,
        password: regularUser.newPassword
      })
      .end((error, response) => {
        expect(response.status).to.equal(401);
        done();
      });
    });


    it('should Allow a User Login with the new password updated by an Admin',
    (done) => {
      client.post('/api/users/login')
      .send({
        email: regularUser.email,
        password: regularUser.adminSetPassword
      })
      .end((error, response) => {
        expect(response.status).to.equal(200);


        regularUserToken = response.body.token;
        done();
      });
    });

    it('should NOT allow a User update his profile without a valid Token',
    (done) => {
      client.put(`/api/users/${regularUserId}`)
      .set({ 'x-access-token': 'invalidToken' })
      .send({ firstName: 'newMan' })
      .end((error, response) => {
        expect(response.status).to.equal(401);
        done();
      });
    });
  });

  describe('Logout', () => {
    const newRegularUser = FakeData.generateRandomUser(2);
    before((done) => {
      client.post('/api/users')
      .send(newRegularUser)
      .end((error, response) => {
        newRegularUser.token = response.body.token;
        newRegularUser.id = response.body.id;
        done();
      });
    });

    it('should Fail to Logout an Admin User with an invalid token',
    (done) => {
      client.post('/api/users/logout')
      .set({ 'x-access-token': 'invalidtoken' })
      .end((error, response) => {
        expect(response.status).to.equal(401);
        done();
      });
    });

    it('should Successfully Logout an Admin User with a valid token',
    (done) => {
      client.post('/api/users/logout')
      .set({ 'x-access-token': adminUserToken })
      .end((error, response) => {
        expect(response.status).to.equal(200);
        done();
      });
    });

    it('should Fail to Logout an Admin User with an Expired token',
    (done) => {
      client.post('/api/users/logout')
      .set({ 'x-access-token': adminUserToken })
      .end((error, response) => {
        expect(response.status).to.equal(401);
        done();
      });
    });

    it('should Fail to Logout a Regular User with an invalid token',
    (done) => {
      client.post('/api/users/logout')
      .set({ 'x-access-token': 'invalidtoken' })
      .end((error, response) => {
        expect(response.status).to.equal(401);
        done();
      });
    });

    it('should Successfully Logout a Regular User with a valid token',
    (done) => {
      client.post('/api/users/logout')
      .set({ 'x-access-token': newRegularUser.token })
      .end((error, response) => {
        expect(response.status).to.equal(200);
        done();
      });
    });
  });

  describe('Delete User', () => {
    const currentAdminUser = Object.assign({}, FakeData.AdminUser);
    before((done) => {
      client.post('/api/users/login')
      .send(currentAdminUser)
      .end((error, response) => {
        currentAdminUser.token = response.body.token;
        currentAdminUser.id = response.body.id;
        done();
      });
    });

    it(`should NOT allow a Non-Admin User with a valid token delete
    another User`,
    (done) => {
      client.delete(`/api/users/${regularUserId + 1}`)
      .set({ 'x-access-token': regularUserToken })
      .end((error, response) => {
        expect(response.status).to.equal(403);
        done();
      });
    });

    it('should NOT allow a User with an invalid Token delete another User',
    (done) => {
      client.delete(`/api/users/${regularUserId + 1}`)
      .set({ 'x-access-token': 'invalidToken' })
      .end((error, response) => {
        expect(response.status).to.equal(401);
        done();
      });
    });

    it('should allow an Admin user with Valid Token delete another User',
    (done) => {
      client.delete(`/api/users/${regularUserId}`)
      .set({ 'x-access-token': currentAdminUser.token })
      .end((error, response) => {
        expect(response.status).to.equal(200);
        done();
      });
    });

    it('should NOT allow an Admin user with invalid Token delete another User',
    (done) => {
      client.delete(`/api/users/${regularUserId}`)
      .set({ 'x-access-token': 'invalid token' })
      .end((error, response) => {
        expect(response.status).to.equal(401);
        done();
      });
    });

    it(`should NOT allow an Admin user with valid Token delete a User that does
    not exist`, (done) => {
      client.delete(`/api/users/${regularUserId + 10000}`)
      .set({ 'x-access-token': currentAdminUser.token })
      .end((error, response) => {
        expect(response.status).to.equal(404);
        done();
      });
    });

    it('should not allow deletion of admin User', (done) => {
      client.delete(`/api/users/${1}`)
      .set({ 'x-access-token': currentAdminUser.token })
      .end((error, response) => {
        expect(response.status).to.equal(403);
        done();
      });
    });
  });
});
