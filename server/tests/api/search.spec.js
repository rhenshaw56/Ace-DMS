import supertest from 'supertest';
import { expect } from 'chai';
import db from '../../models';
import app from '../../server';
import SpecHelper from '../helpers/SpecFakers';
import SeedHelper from '../helpers/SpecSeeders';

const client = supertest.agent(app);

describe('Search', () => {
  const adminUser = SpecHelper.AdminUser;
  before((done) => {
    SeedHelper.populateRoleTable()
    .then(() => {
      db.User.create(adminUser);
    })
    .then(() => {
      client.post('/api/users/login')
      .send({
        email: adminUser.email,
        password: adminUser.password
      })
      .end((error, response) => {
        adminUser.token = response.body.token;
        client.post('/api/users');
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

  describe('Documents', () => {
    it(`should return a 400 (bad request) status code if an invalid
    limit is specified`,
    (done) => {
      const searchLimit = -1;
      client.get(`/api/documents/?limit=${searchLimit}`)
      .set({ 'x-access-token': adminUser.token })
      .end((error, response) => {
        expect(response.status).to.equal(400);
        done();
      });
    });
  });

  describe('Users', () => {
    it('should return a 400 status code if an invalid limit is specified',
    (done) => {
      const searchLimit = -1;
      client.get(`/api/users/?limit=${searchLimit}`)
      .set({ 'x-access-token': adminUser.token })
      .end((error, response) => {
        expect(response.status).to.equal(400);
        done();
      });
    });

    it('should return Users ordered by creation date in descending order',
    (done) => {
      client.get('/api/users/')
      .set({ 'x-access-token': adminUser.token })
      .end((error, response) => {
        expect(response.status).to.equal(200);
        let oldestDate = Date.now();
        response.body.users.forEach((user) => {
          const createdDate = Date.parse(user.createdAt);
          expect(createdDate).to.be.lte(oldestDate);
          oldestDate = createdDate;
        });
        done();
      });
    });

    it('should return only users that match a specific query', (done) => {
      const searchText = adminUser.firstName;
      client.get(`/api/users/?search=${searchText}`)
      .set({ 'x-access-token': adminUser.token })
      .end((error, response) => {
        expect(response.status).to.equal(200);
        response.body.users.forEach(user =>
          expect(user.firstName).to.contain(searchText) ||
          expect(user.lastName).to.contain(searchText) ||
          expect(user.email).to.contain(searchText)
        );
        done();
      });
    });
  });

  describe('Roles', () => {
    it('should return Roles limited by a specified number', (done) => {
      const searchLimit = 2;
      client.get(`/api/roles/?limit=${searchLimit}`)
      .set({ 'x-access-token': adminUser.token })
      .end((error, response) => {
        expect(response.status).to.equal(200);
        expect(response.body.roles.length).to.equal(searchLimit);
        done();
      });
    });

    it('should return a 400 status code if an invalid limit is specified',
    (done) => {
      const searchLimit = -1;
      client.get(`/api/roles/?limit=${searchLimit}`)
      .set({ 'x-access-token': adminUser.token })
      .end((error, response) => {
        expect(response.status).to.equal(400);
        done();
      });
    });

    it('should return Roles ordered by creation date in descending order',
    (done) => {
      client.get('/api/roles/')
      .set({ 'x-access-token': adminUser.token })
      .end((error, response) => {
        expect(response.status).to.equal(200);
        let oldestDate = Date.now();
        response.body.roles.forEach((role) => {
          const createdDate = Date.parse(role.createdAt);
          expect(createdDate).to.be.lte(oldestDate);
          oldestDate = createdDate;
        });
        done();
      });
    });

    it('should return only Roles that match a specific query', (done) => {
      const searchText = 'regular';
      client.get(`/api/roles/?search=${searchText}`)
      .set({ 'x-access-token': adminUser.token })
      .end((error, response) => {
        expect(response.status).to.equal(200);
        response.body.roles.forEach(role =>
          expect(role.title).to.contain(searchText)
        );
        done();
      });
    });
  });
});
