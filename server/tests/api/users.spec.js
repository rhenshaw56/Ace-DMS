import { expect } from 'chai';
import supertest from 'supertest';
import db from '../../models';
import app from '../../server';
import SpecSeeders from '../helpers/SpecSeeders';
import FakeData from '../helpers/SpecFakers';

const client = supertest.agent(app);
const testUser = FakeData.generateRandomUser(2);
let token;
let testUserId;

describe('Users Requests:', () => {
  before((done) => {
    db.sequelize.sync({ force: true })
    .then(() => {
      SpecSeeders.populateRoleTable();
      done();
    });
  });
  // before((done) => {
  //   db.sequelize.authenticate()
  //   .then(() => {
  //     db.User.destroy({
  //       where: {
  //         roleId: 1
  //       }
  //     }).then(() => done());
  //   });
  // });

  describe('Create User', () => {
    // before((done) => {
    //   SpecSeeders.init()
    //   .then(() => {
    //     client.post('/api/users')
    //     .send(testUser)
    //     .end((error, response) => {
    //       // token = response.body.token;
    //       // testUserId = response.body.id;
    //       done();
    //     });
    //   });
    // });

    // after((done) => {
    //   db.sequelize.sync({ force: false })
    // .then(() => {
    //   done();
    // });
    // });
    before((done) => {
      db.sequelize.authenticate()
      .then(() => {
        db.User.destroy({
          where: {
            roleId: 1
          }
        }).then(() => done());
      });
    });
  });
  it('*should successfully signup users', (done) => {
    client.post('/api/users')
    .send(testUser)
    .send(testUser)
    .end((error, response) => {
      expect(response.status).to.equal(201);
      done();
    });
  });
  it('should return a status code of 400 if User specifies Id during creation',
    (done) => {
      const invalidUser = FakeData.generateRandomUser();
      invalidUser.id = 1;
      client.post('/api/users')
       .send(invalidUser)
       .end((error, response) => {
         expect(response.status).to.equal(400);
         done();
       });
    });
  it('*should not signup users with duplicate emails', (done) => {
    client.post('/api/users')
    .send(testUser)
    .send(testUser)
    .end((error, response) => {
      expect(response.status).to.equal(409);
      done();
    });
  });
  it('should not allow a user to signup as Admin', (done) => {
    const fakeAdminUser = FakeData.generateRandomUser(1);
    client.post('/api/users')
       .send(fakeAdminUser)
      .end((error, response) => {
        expect(response.status).to.equal(403);
        done();
      });
  });
  it('*should return tokens after succefully registering users',
    (done) => {
      client.post('/api/users')
      .send(FakeData.generateRandomUser(2))
      .end((error, response) => {
        expect(response.status).to.equal(201);
        expect(response.body).to.have.property('token');
        done();
      });
    });
  it('should return details of the created User',
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
  it('should not return password of the registered User',
    (done) => {
      client.post('/api/users')
      .send(FakeData.generateRandomUser(2))
      .end((error, response) => {
        expect(response.status).to.equal(201);
        expect(response.body).to.not.have.property('password');
        done();
      });
    });
  it(`*should by default assign roles of Regular User if no roleId
      is specified on signup`, (done) => {
    client.post('/api/users')
      .send(FakeData.generateRandomUser())
      .end((error, response) => {
        expect(response.status).to.equal(201);
        done();
      });
  });
  it('should return a 400 status code for a an invalid roleId', (done) => {
    client.post('/api/users')
      .send(FakeData.generateRandomUser(10))
      .end((error, response) => {
        expect(response.status).to.equal(400);
        done();
      });
  });
});

