import UserHandler from './user';
// import db from '../../models';

const links = [
  {
    id: 1,
    url: 'http://graphql.org/',
    description: 'The Best Query Language'
  },
  {
    id: 2,
    url: 'http://dev.apollodata.com',
    description: 'Awesome GraphQL Client'
  },
];

const resolver = {
  Query: {
    allUsers: (root, data, db) => UserHandler.getAllUsers(root, data, db),
  },
  Mutation: {
    createUser: async (root, data, db) => UserHandler.creatUser(root, data, db),
  }
};

export default resolver;
