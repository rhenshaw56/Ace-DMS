import UserMiddleware from '../middlewares/Users';
import UserController from '../controllers/User.Controller';
import Auth from '../middlewares/Auth';

const userRoutes = (router) => {
  router.route('/api/users')
    .post(UserMiddleware.validateOnCreate, UserController.createUser)
    .get(Auth.authenticateUser, UserMiddleware.validateGetRequest,
      UserController.searchUsers);

  router.route('/api/users/login')
    .post(UserController.logIn);

  router.route('/api/users/logout')
    .post(Auth.authenticateUser, UserController.logOut);

  router.route('/api/users/:id')
    .get(Auth.authenticateUser,
        UserMiddleware.validateGetRequest,
        UserController.findUser)
    .put(Auth.authenticateUser,
        UserMiddleware.validateOnUpdate,
        UserController.updateUserDetails)
    .delete(Auth.authenticateUser,
        UserMiddleware.validateOnDelete,
        UserController.removeUser);

  router.route('/api/users/:id/documents')
      .get(Auth.authenticateUser,
      UserController.retrieveUserDocuments);
  router.route('/api/search/users')
        .get(UserController.retrieveUserByIdentifier);
};
export default userRoutes;
