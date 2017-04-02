import auth from '../middlewares/Auth';
import UserMiddleware from '../middlewares/Users';
import UserController from '../controllers/User.Controller';

const UserRoutes = (router) => {
  router.route('/api/signup/')
    .post(UserMiddleware.validateOnCreate, UserController.createUser);
};
export default UserRoutes;
