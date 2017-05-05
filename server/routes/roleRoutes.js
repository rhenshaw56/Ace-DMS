import RoleMiddleware from '../middlewares/Role';
import RoleController from '../controllers/RoleController';
import Auth from '../middlewares/Auth';

const roleRoutes = (router) => {
  router.route('/api/roles')
        .post(Auth.authenticateUser, RoleMiddleware.validateOnPost,
            RoleController.createRole);

  router.route('/api/roles/:id')
        .get(Auth.authenticateUser, RoleMiddleware.validateOnGet,
            RoleController.retrieveRole);

  router.route('/api/roles')
        .get(Auth.authenticateUser, RoleMiddleware.validateOnGet,
            RoleController.retrieveRoles);

  router.route('/api/roles/:id')
        .put(Auth.authenticateUser, RoleMiddleware.validateOnPut,
              RoleController.updateRole);
  router.route('/api/roles/:id')
        .delete(Auth.authenticateUser, RoleMiddleware.validateOnDelete,
                RoleController.removeRole);
};
export default roleRoutes;
