import { expect } from 'chai';
import supertest from 'supertest';
import db from '../../models';
import app from '../../server';
import SpecSeeders from '../helpers/SpecSeeders';
import FakeData from '../helpers/SpecFakers';

const client = supertest.agent(app);
let token;
let testUserId;

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
describe('Users Request: ', () => {
  const testUser = FakeData.RegularUser1;
  const testAdminUser = FakeData.AdminUser;
});

