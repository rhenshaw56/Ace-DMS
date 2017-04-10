import { expect } from 'chai';
import supertest from 'supertest';
import db from '../../models';
import app from '../../server';
import SpecSeeders from '../helpers/SpecSeeders';
import FakeData from '../helpers/SpecFakers';

const client = supertest.agent(app);

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
  describe('Creates Regular Users', () => {
    it('should return a status code of 201 after creating regular users', 
    (done) => {
      client.post('/api/users')
      .send(testUser)
      .end((err, res) => {
        expect(res.status).to.equal(201);
        done();
      })
    })
  });
});

