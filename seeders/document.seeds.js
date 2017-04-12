'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert('Documents', [
      {
        title: 'Test Document 1',
        content: 'Alice in wonderland with her boyfriend',
        ownerId: 1,
        ownerRoleId: 1,
        access: 'private',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Test Document 2',
        content: 'The fellowship of the ring starring jack bauer',
        ownerId: 2,
        ownerRoleId: 2,
        access: 'role',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Test Document 3',
        content: 'This is the child of my brain, the product of my endeavour',
        ownerId: 2,
        ownerRoleId: 2,
        access: 'public',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Test Document 4',
        content: 'In the mist, there was ice and fire and magic!',
        ownerId: 2,
        ownerRoleId: 2,
        access: 'public',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Test Document 5',
        content: 'You only live once',
        ownerId: 2,
        ownerRoleId: 2,
        access: 'public',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Test Document 6',
        content: 'My destiny is to lead and yours is to follow',
        ownerId: 2,
        access: 'public',
        ownerRoleId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Test Document 7',
        content: 'The land was filled with fire and snow',
        ownerId: 2,
        ownerRoleId: 2,
        access: 'public',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Test Document 8',
        content: 'To pimp a butterfly',
        ownerId: 2,
        ownerRoleId: 2,
        access: 'role',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Test Document 9',
        content: 'How i wonder how fairer you could be',
        ownerId: 2,
        ownerRoleId: 2,
        access: 'public',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Test Document 10',
        content: 'I am the GOAT',
        ownerId: 2,
        ownerRoleId: 2,
        access: 'public',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Test Document 11',
        content: 'excellence passion integrity commitment',
        ownerId: 2,
        ownerRoleId: 2,
        access: 'public',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {
      returning: true
    });
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
    return queryInterface.bulkDelete('Documents', null, {});
  }
};
