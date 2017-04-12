import { expect } from 'chai';
import supertest from 'supertest';
import should from 'should';

import app from '../../server';
import db from '../../models';
import SpecSeeders from '../helpers/SpecSeeders';
import FakeData from '../helpers/SpecFakers';

const client = supertest.agent(app);
const roleData = FakeData.RegularRole;
const regularUser = FakeData.generateRandomUser(2);
let regularUserToken;
let regularUserId;

describe('Users:', () => {
  before((done) => {
    SpecSeeders.init()
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
  });
});
