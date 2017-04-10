import UserMiddleware from '../middlewares/Users';
import UserController from '../controllers/User.Controller';

const UserRoutes = (router) => {
  router.route('/api/users')
    .post(UserMiddleware.validateOnCreate, UserController.createUser)
    .get(UserController.findUser);

  router.route('/api/users/login')
    .post(UserController.logIn);
  router.route('/api/users/logout')
    .post(UserController.logOut);
};
export default UserRoutes;
