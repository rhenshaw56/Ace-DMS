

const bcrypt = require('bcrypt-nodejs');
const dotenv = require('dotenv');

dotenv.config();
module.exports = {
  up (queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */

    return queryInterface.bulkInsert('Users', [
      {
        email: process.env.ADMIN_EMAIL,
        firstName: process.env.ADMIN_FIRST_NAME,
        lastName: process.env.ADMIN_LAST_NAME,
        password: bcrypt.hashSync(process.env.ADMIN_PASSWORD, bcrypt.genSaltSync(8)),
        roleId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: 'grace@gmail.com ',
        firstName: 'grace',
        lastName: 'ekpo',
        password: bcrypt.hashSync('awesome', bcrypt.genSaltSync(8)),
        roleId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: 'joy@testMail.com',
        firstName: 'user2',
        lastName: 'users',
        password: bcrypt.hashSync('password', bcrypt.genSaltSync(8)),
        roleId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: 'chux@gmail.com',
        firstName: 'chux',
        lastName: 'ike',
        password: bcrypt.hashSync('password', bcrypt.genSaltSync(8)),
        roleId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: 'frank@gmail.com ',
        firstName: 'franck',
        lastName: 'eyo',
        password: bcrypt.hashSync('password', bcrypt.genSaltSync(8)),
        roleId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: 'japhet@testMail.com',
        firstName: 'japhet',
        lastName: 'henry',
        password: bcrypt.hashSync('password', bcrypt.genSaltSync(8)),
        roleId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {
      returning: true
    });
  },

  down (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
    queryInterface.bulkDelete('Users', null, {});
  }
};
