import RoleMiddleware from '../middlewares/Role';
import RoleController from '../controllers/RoleController';
import Auth from '../middlewares/Auth';

const roleRoutes = (router) => {
  /**
 * @swagger
 * definition:
 *   NewRole:
 *     type: object
 *     required:
 *       - title
 *     properties:
 *       title:
 *         type: string
 *   Role:
 *     allOf:
 *       - $ref: '#/definitions/NewRole'
 *       - required:
 *         - id
 *       - properties:
 *         id:
 *           type: integer
 *           format: int64
 */
  router.route('/api/roles')
        /**
     * @swagger
     * /api/roles:
     *   post:
     *     description: Creates a role
     *     tags:
     *      - Create Role
     *     produces:
     *      - application/json
     *     parameters:
     *       - name: Authorization
     *         in:  header
     *         description: an authorization token
     *         required: true
     *         type: string
     *         schema:
     *           $ref: '#/definitions/Role'
     *     responses:
     *       201:
     *         description: roles
     *         schema:
     *          type: object
     */
    .post(Auth.authenticateUser, RoleMiddleware.validateOnPost,
            RoleController.createRole);

  router.route('/api/roles/:id')
             /**
     * @swagger
     * /api/roles/{id}:
     *   get:
     *     description: Returns a role
     *     tags:
     *      - Returns a Role by id
     *     produces:
     *      - application/json
     *     parameters:
     *       - name: Authorization
     *         in:  header
     *         description: an authorization token
     *         required: true
     *         type: string
     *         schema:
     *           $ref: '#/definitions/Role'
     *     responses:
     *       201:
     *         description: roles
     *         schema:
     *          type: object
     */
    .get(Auth.authenticateUser, RoleMiddleware.validateOnGet,
            RoleController.retrieveRole);

  router.route('/api/roles')
            /**
     * @swagger
     * /api/roles:
     *   post:
     *     description: Return all roles
     *     tags:
     *      - Return all roles
     *     produces:
     *      - application/json
     *     parameters:
     *       - name: Authorization
     *         in:  header
     *         description: an authorization token
     *         required: true
     *         type: string
     *         schema:
     *           $ref: '#/definitions/Role'
     *     responses:
     *       201:
     *         description: roles
     *         schema:
     *          type: object
     */
    .get(Auth.authenticateUser, RoleMiddleware.validateOnGet,
            RoleController.retrieveRoles);

  router.route('/api/roles/:id')
                /**
     * @swagger
     * /api/roles/{id}:
     *   put:
     *     description: Updates a role
     *     tags:
     *      - Updates a role
     *     produces:
     *      - application/json
     *     parameters:
     *       - name: Authorization
     *         in:  header
     *         description: an authorization token
     *         required: true
     *         type: string
     *         schema:
     *           $ref: '#/definitions/Role'
     *     responses:
     *       201:
     *         description: roles
     *         schema:
     *          type: object
     */
   .put(Auth.authenticateUser, RoleMiddleware.validateOnPut,
              RoleController.updateRole);
  router.route('/api/roles/:id')
                    /**
     * @swagger
     * /api/roles/{id}:
     *   put:
     *     description: Deletes a role
     *     tags:
     *      - Deletes a role
     *     produces:
     *      - application/json
     *     parameters:
     *       - name: Authorization
     *         in:  header
     *         description: an authorization token
     *         required: true
     *         type: string
     *         schema:
     *           $ref: '#/definitions/Role'
     *     responses:
     *       201:
     *         description: roles
     *         schema:
     *          type: object
     */
   .delete(Auth.authenticateUser, RoleMiddleware.validateOnDelete,
                RoleController.removeRole);
};
export default roleRoutes;
