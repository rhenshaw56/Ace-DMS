import faker from 'faker';

const fakes = {
  AdminUser: {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    roleId: 1
  },
  RandomUser: {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    roleId: 3
  },
  RegularUser: {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    roleId: 2
  },
  RegularUser1: {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    roleId: 2
  },
  RegularUser2: {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    roleId: 2
  },
  RegularUser3: {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    roleId: 2
  },
  RegularUser4: {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    roleId: 2
  },
  RegularUser5: {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    roleId: 2
  },
  RegularUser6: {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    roleId: 2
  },
  RegularUser7: {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    roleId: 2
  },
  RegularUser8: {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    roleId: 2
  },
  RegularUser9: {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    roleId: 2
  },
  RegularRole: {
    title: 'regular'
  },
  AdminRole: {
    title: 'admin'
  },
  publicDocument: {
    title: faker.company.catchPhrase(),
    access: 'public',
    content: faker.lorem.paragraph(),
    ownerId: 1,
    ownerRoleId: 1
  },
  publicDocument1: {
    title: faker.company.catchPhrase(),
    access: 'public',
    content: faker.lorem.paragraph(),
    ownerId: 7,
    ownerRoleId: 2
  },
  publicDocument2: {
    title: faker.company.catchPhrase(),
    access: 'public',
    content: faker.lorem.paragraph(),
    ownerId: 6,
    ownerRoleId: 2
  },
  publicDocument3: {
    title: faker.company.catchPhrase(),
    access: 'public',
    content: faker.lorem.paragraph(),
    ownerId: 5,
    ownerRoleId: 2
  },
  privateDocument: {
    title: faker.company.catchPhrase(),
    access: 'private',
    content: faker.lorem.paragraph(),
    ownerId: 1,
    ownerRoleId: 1
  },
  privateDocument1: {
    title: faker.company.catchPhrase(),
    access: 'private',
    content: faker.lorem.paragraph(),
    ownerId: 6,
    ownerRoleId: 2
  },
  privateDocument2: {
    title: faker.company.catchPhrase(),
    access: 'private',
    content: faker.lorem.paragraph(),
    ownerId: 3,
    ownerRoleId: 2
  },
  privateDocument3: {
    title: faker.company.catchPhrase(),
    access: 'private',
    content: faker.lorem.paragraph(),
    ownerId: 1,
    ownerRoleId: 1
  },
  roleDocument: {
    title: faker.company.catchPhrase(),
    access: 'role',
    content: faker.lorem.paragraph(),
    ownerId: 4,
    ownerRoleId: 2
  },
  roleDocument1: {
    title: faker.company.catchPhrase(),
    access: 'role',
    content: faker.lorem.paragraph(),
    ownerId: 3,
    ownerRoleId: 2
  },
  roleDocument2: {
    title: faker.company.catchPhrase(),
    access: 'role',
    content: faker.lorem.paragraph(),
    ownerId: 1,
    ownerRoleId: 1
  },
  roleDocument3: {
    title: faker.company.catchPhrase(),
    access: 'role',
    content: faker.lorem.paragraph(),
    ownerId: 2,
    ownerRoleId: 2
  },

  alterUserDetail(userDetails, newValue) {
    return Object.assign({}, userDetails, newValue);
  },

  generateRandomUser(roleId) {
    return {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      roleId
    };
  },
  generateRandomRole(roleTitle) {
    return {
      title: roleTitle
    };
  },
  generateRandomDocument(accessLevel) {
    return {
      title: faker.company.catchPhrase(),
      access: accessLevel,
      content: faker.lorem.paragraph()
    };
  }
};
export default fakes;
