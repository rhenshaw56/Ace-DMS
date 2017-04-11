import { expect } from 'chai';
import db from '../../models';
import SpecSeeders from '../helpers/SpecSeeders';
import FakeData from '../helpers/SpecFakers';

const userDb = db.User;

describe('USER MODEL:-', () => {
  before((done) => {
    db.sequelize.sync({ force: true })
    .then(() => {
      SpecSeeders.populateRoleTable();
      done();
    });
  });
  after((done) => {
    db.sequelize.sync({ force: true })
    .then(() => {
      done();
    });
  });

  describe('Creates User', () => {
    it('should be able to create a regular user with valid data',
    (done) => {
      const user = FakeData.RegularUser;

      userDb.create(user)
      .then((createdUser) => {
        expect(user.firstName).to.equal(createdUser.firstName);
        expect(user.lastName).to.equal((createdUser.lastName));
        expect(user.email).to.equal(createdUser.email);
        expect(user.roleId).to.equal((createdUser.roleId));
        done();
      });
    });
    it('should be able to create an admin user',
    (done) => {
      const adminUser = FakeData.AdminUser;
      userDb.create(adminUser)
      .then((createdUser) => {
        expect(adminUser.firstName).to.equal(createdUser.firstName);
        expect(adminUser.lastName).to.equal((createdUser.lastName));
        expect(adminUser.email).to.equal(createdUser.email);
        expect(adminUser.roleId).to.equal((createdUser.roleId));
        done();
      });
    });
    it('should throw error when trying to create an already existing user',
    (done) => {
      const user = FakeData.RegularUser;
      userDb.create(user)
      .catch((error) => {
        expect(error).to.be.instanceOf(Error);
        done();
      });
    });
    it('should throw an error when creating a user with no firstName',
    (done) => {
      const field = { firstName: null };
      const user = FakeData.alterUserDetail(FakeData.RegularUser1, field);
      userDb.create(user)
      .catch((error) => {
        expect(error).to.be.instanceOf(Error);
        expect(error).to.be.instanceOf(Object);
        expect(error.errors).to.be.instanceOf(Array);
        done();
      });
    });
    it('should throw an error when creating a user with no lastName',
    (done) => {
      const field = { lastName: null };
      const user = FakeData.alterUserDetail(FakeData.RegularUser3, field);
      userDb.create(user)
      .catch((error) => {
        expect(error).to.be.instanceOf(Error);
        expect(error).to.be.instanceOf(Object);
        expect(error.errors).to.be.instanceOf(Array);
        done();
      });
    });
    it('should throw an error when creating a user with no roleId',
    (done) => {
      const field = { roleId: null };
      const user = FakeData.alterUserDetail(FakeData.RegularUser4, field);
      userDb.create(user)
      .catch((error) => {
        expect(error).to.be.instanceOf(Error);
        expect(error).to.be.instanceOf(Object);
        expect(error.errors).to.be.instanceOf(Array);
        done();
      });
    });
    it('should verify user passwords', (done) => {
      const field = { password: 'super-powers' };
      const user = FakeData.alterUserDetail(FakeData.RegularUser8, field);
      userDb.create(user)
      .then((newUser) => {
        const check = newUser.verifyPassword(user.password, newUser.password);
        expect(check).to.equal(true);
        done();
      });
    });
  });
  describe('Updates User', () => {
    let testUser = {};
    before((done) => {
      const field = { email: 'myemail@localhost.com' };
      const user = FakeData.alterUserDetail(FakeData.RegularUser1, field);
      userDb.create(user)
      .then((createdUser) => {
        testUser = createdUser;
        done();
      });
    });
    it('should allow updates of email for a user',
    (done) => {
      const newDetails = { email: 'anewemail@gmail.com' };
      userDb.update(newDetails, {
        where: { id: testUser.id }
      })
      .then(() => {
        userDb.findById(testUser.id)
        .then((foundUser) => {
          expect(foundUser.email).to.equal(newDetails.email);
          done();
        });
      });
    });
    it('should allow updates of firstName for a user',
    (done) => {
      const newDetails = { firstName: 'Franklin' };
      userDb.update(newDetails, {
        where: { id: testUser.id }
      })
      .then(() => {
        userDb.findById(testUser.id)
        .then((foundUser) => {
          expect(foundUser.firstName).to.equal(newDetails.firstName);
          done();
        });
      });
    });
    it('should allow updates of passwords on update', (done) => {
      const newDetails = { password: 'the-script-Vs-U2' };
      userDb.findById(testUser.id)
        .then((foundUser) => {
          foundUser.update(newDetails)
          .then(() => {
            const check = foundUser.verifyPassword(newDetails.password, foundUser.password);
            expect(check).to.equal(true);
            done();
          });
        });
    });
    it('should allow updates of LastName for a user',
    (done) => {
      const newDetails = { lastName: 'Longbottom' };
      userDb.update(newDetails, {
        where: { id: testUser.id }
      })
      .then(() => {
        userDb.findById(testUser.id)
        .then((foundUser) => {
          expect(foundUser.lastName).to.equal(newDetails.lastName);
          done();
        });
      });
    });
  });
  describe('Get Users', () => {
    let testUser = {};
    before((done) => {
      const field = { email: 'emailtoberead@grandpa.com' };
      const user = FakeData.alterUserDetail(FakeData.RegularUser4, field);
      userDb.create(user)
      .then((createdUser) => {
        testUser = createdUser;
        done();
      });
    });
    it('should return a user by id', (done) => {
      userDb.findById(testUser.id)
      .then((existingUser) => {
        expect(existingUser).to.be.instanceOf(Object);
        expect(existingUser.firstName).to.be.equal(testUser.firstName);
        expect(existingUser.email).to.be.equal(testUser.email);
        done();
      });
    });
    it('should find a user by email', (done) => {
      userDb.findOne({ where: { email: testUser.email } })
      .then((existingUser) => {
        expect(existingUser).to.be.instanceOf(Object);
        expect(existingUser.firstName).to.be.equal(testUser.firstName);
        expect(existingUser.id).to.be.equal(testUser.id);
        done();
      });
    });
    it('should return all users as an array of objects', (done) => {
      userDb.findAll()
      .then((users) => {
        expect(users).to.be.instanceOf(Array);
        users.forEach((user) => {
          expect(user).to.be.instanceOf(Object);
          expect(user).to.not.be.instanceOf(Array || String || Number);
        });
        done();
      });
    });
  });
  describe('Delete User', () => {
    let testUser = {};
    before((done) => {
      const field = { email: 'emailtobedeleted@long.com' };
      const user = FakeData.alterUserDetail(FakeData.RegularUser5, field);
      userDb.create(user)
      .then((createdUser) => {
        testUser = createdUser;
        done();
      });
    });
    it('should delete a user by id', (done) => {
      userDb.destroy({ where: { id: testUser.id } })
      .then((rowsDeleted) => {
        expect(rowsDeleted).to.be.equal(1);
        done();
      });
    });
    it('should delete a user by email', (done) => {
      userDb.destroy({ where: { email: 'emailtoberead@grandpa.com' } })
      .then((rowsDeleted) => {
        expect(rowsDeleted).to.be.equal(1);
        done();
      });
    });
    it('should not delete a non-existent user', (done) => {
      userDb.destroy({ where: { id: 56 } })
      .then((rowsDeleted) => {
        expect(rowsDeleted).to.be.equal(0);
        done();
      });
    });
  });
});
