import userRoutes from './userRoutes';

import documentRoutes from './documentRoutes';
import roleRoutes from './roleRoutes';

const Routes = (router) => {
  userRoutes(router);
  documentRoutes(router);
  roleRoutes(router);
};

export default Routes;
