import UserRoutes from './User.Routes';
import auth from '../middlewares/Auth';
import UsersMiddleware from '../middlewares/Users';
import UserController from '../controllers/User.Controller';

const Routes = (router, swaggerSpec) => {
    console.log('indexxxx');
    UserRoutes(router, swaggerSpec);
};

export default Routes;
