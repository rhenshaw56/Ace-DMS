import UserMiddleware from '../middlewares/Users';
import UserController from '../controllers/UserController';
import Auth from '../middlewares/Auth';

const userRoutes = (router) => {
/**
 * @swagger
 * definition:
 *   NewUser:
 *     type: object
 *     required:
 *       - firstname
 *       - lastname
 *       - email
 *       - password
 *     properties:
 *       firstName:
 *         type: string
 *       lastName:
 *         type: string
 *       password:
 *         type: string
 *         format: password
 *       email:
 *         type: string
 *   User:
 *     allOf:
 *       - $ref: '#/definitions/NewUser'
 *       - required:
 *         - id
 *       - properties:
 *         id:
 *           type: integer
 *           format: int64
 */
  router.route('/api/users')
    /**
     * @swagger
     * /api/users:
     *   post:
     *     description: Creates a user
     *     tags:
     *      - Create User
     *     produces:
     *      - application/json
     *     parameters:
     *       - name: body
     *         description: User object
     *         in:  body
     *         required: true
     *         type: string
     *         schema:
     *           $ref: '#/definitions/NewUser'
     *     responses:
     *       201:
     *         description: users
     *         schema:
     *          type: object
     */
    .post(UserMiddleware.validateOnCreate, UserController.createUser)
        /**
     * @swagger
     * /api/users:
     *   get:
     *     description: Gets a list of all users
     *     tags:
     *      - Get Users List
     *     produces:
     *      - application/json
     *     parameters:
     *        - name: Authorization
     *          in: header
     *          description: an authorization header
     *          required: true
     *          type: string
     *     responses:
     *        200:
     *          description: users
     *          schema:
     *            type: array
     *            items:
     *              $ref: '#/definitions/User'
     */
    .get(Auth.authenticateUser,
      UserMiddleware.validateGetRequest,
      UserController.searchUsers);
  /**
 * @swagger
 * definition:
 *   Login:
 *     type: object
 *     required:
 *       - email
 *       - password
 *     properties:
 *       password:
 *         type: string
 *         format: password
 *       email:
 *         type: string
 *         format: email
 */
  router.route('/api/users/login')
   /**
     * @swagger
     * /api/users/login:
     *   post:
     *     description: Signs in a user
     *     tags:
     *      - Signs in a user
     *     produces:
     *      - application/json
     *     parameters:
     *       - name: body
     *         description: User object
     *         in:  body
     *         required: true
     *         type: string
     *         schema:
     *           $ref: '#/definitions/Login'
     *     responses:
     *       201:
     *         description: users
     *         schema:
     *          type: object
     */

    .post(UserController.logIn);

  router.route('/api/users/logout')
    .post(Auth.authenticateUser, UserController.logOut);

  router.route('/api/users/:id')
         /**
     * @swagger
     * /api/users/{id}:
     *   post:
     *     description: Return a single user by id
     *     tags:
     *      - Return a single user by id
     *     produces:
     *      - application/json
     *     parameters:
     *       - name: body
     *         description: User object
     *         in:  body
     *         required: true
     *         type: string
     *         schema:
     *           $ref: '#/definitions/User'
     *     responses:
     *       201:
     *         description: users
     *         schema:
     *          type: array
     */
    .get(Auth.authenticateUser,
        UserMiddleware.validateGetRequest,
        UserController.findUser)
          /**
     * @swagger
     * /api/users/{id}:
     *   put:
     *     description: Updates details of a single user by id
     *     tags:
     *      - Updates user details
     *     produces:
     *      - application/json
     *     parameters:
     *       - name: body
     *         description: User object
     *         in:  body
     *         required: true
     *         type: integer
     *         schema:
     *           $ref: '#/definitions/User'
     *     responses:
     *       201:
     *         description: users
     *         schema:
     *          type: array
     */
    .put(Auth.authenticateUser,
        UserMiddleware.validateOnUpdate,
        UserController.updateUserDetails)
         /**
     * @swagger
     * /api/users/{id}:
     *   delete:
     *     description: Deletes a user by id
     *     tags:
     *      - Deletes a user by id
     *     produces:
     *      - application/json
     *     parameters:
     *       - name: body
     *         description: User object
     *         in:  body
     *         required: true
     *         type: string
     *         schema:
     *           $ref: '#/definitions/User'
     *     responses:
     *       201:
     *         description: users
     *         schema:
     *          type: array
     */
    .delete(Auth.authenticateUser,
        UserMiddleware.validateOnDelete,
        UserController.removeUser);

  router.route('/api/users/:id/documents')
        /**
   * @swagger
   * /api/users/{id}/documents:
   *    get:
   *      description: Returns the documents belonging to the user of id
   *      tags:
   *        - Returns Documents of A User
   *      produces:
   *        - application/json
   *      parameters:
   *        - name: Authorization
   *          in: header
   *          description: an authorization header
   *          required: true
   *          type: string
   *      responses:
   *        200:
   *          description: user's documents
   *          schema:
   *            type: object
   */
    .get(Auth.authenticateUser,
      UserController.retrieveUserDocuments);
  router.route('/api/search/users')
  /**
   * @swagger
   * /api/users/search/users?q={johndoe@gmail.com}:
   *    get:
   *      description: Returns the user
   *      tags:
   *        - Finds a user by email
   *      produces:
   *        - application/json
   *      parameters:
   *        - name: Authorization
   *          in: header
   *          description: an authorization header
   *          required: true
   *          type: string
   *        - in: query
   *          name: q
   *          description: email of a registred user
   *          required: true
   *          type: string
   *      responses:
   *        200:
   *          description: user
   *          schema:
   *            type: object
   */
    .get(Auth.authenticateUser, UserController.retrieveUserByIdentifier);
};
export default userRoutes;
