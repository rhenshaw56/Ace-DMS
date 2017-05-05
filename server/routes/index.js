import userRoutes from './userRoutes';
import swagger from './swagger';
import documentRoutes from './documentRoutes';
import roleRoutes from './roleRoutes';

const Routes = (router) => {
  swagger(router);
  userRoutes(router);
  documentRoutes(router);
  roleRoutes(router);
};

export default Routes;
