import UserHandler from './user';


const resolver = {
  Query: {
    getUser:
    (root, data, db, req) => UserHandler.getAllUsers(root, data, db, req),
    allUsers:
      (root, data, db, req) => UserHandler.getAllUsers(root, data, db, req),
  },
  Mutation: {
    createUser:
      async (root, data, db, req) => UserHandler.createUser(root, data, db, req),
    signInUser:
      async (root, data, db, req) => UserHandler.signInUser(root, data, db, req)
  }
};

export default resolver;
