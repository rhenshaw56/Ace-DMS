import UserMiddleware from '../middlewares/Users';
import UserController from '../controllers/User.Controller';

const UserRoutes = (router) => {
  router.route('/api/users/signup')
    .post(UserMiddleware.validateOnCreate, UserController.createUser);
  router.route('/api/users/login')
    .post(UserController.logIn);
};
export default UserRoutes;
