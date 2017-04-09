import auth from '../middlewares/Auth';
import UserMiddleware from '../middlewares/Users';
import UserController from '../controllers/User.Controller';

const UserRoutes = (router) => {
  router.route('/api/users/signup')
    .post(UserMiddleware.validateOnCreate, UserController.createUser);
  router.route('/api/users/login')
    .post(UserController.login);
};
export default UserRoutes;
