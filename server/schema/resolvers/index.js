import UserHandler from './user';
import db from '../../models';

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
    allLinks: () => links,
    allUsers: (root, data) => UserHandler.getAllUsers(root, data),
  },
  Mutation: {
    createUser: async (root, data) => UserHandler.creatUser(root, data),
  }
};

export default resolver;
