import DocumentMiddleware from '../middlewares/Document';
import DocumentController from '../controllers/DocumentController';
import Auth from '../middlewares/Auth';

const documentRoutes = (router) => {
  /**
   * @swagger
   * definition:
   *    NewDocument:
   *      type: object
   *      required:
   *        - title
   *        - content
   *      properties:
   *        title: 
   *          type: string
   *        content:
   *          type: string
   *    Document:
   *      allOf:
   *        - $ref: '#definitions/NewDocument'
   *        - required:
   *        - id:
   *            type: integer
   *            format: int64
   */
  router.route('/api/documents')
            /**
     * @swagger
     * /api/documents:
     *   post:
     *     description: Creates a new document
     *     tags:
     *      - Create Document
     *     produces:
     *      - application/json
     *     parameters:
     *       - name: body
     *         description: User object
     *         in:  body
     *         required: true
     *         type: string
     *         schema:
     *           $ref: '#/definitions/NewDocument'
     *     responses:
     *       201:
     *         description: documents
     *         schema:
     *          type: object
     */
     .post(Auth.authenticateUser, DocumentMiddleware.validateOnPost,
                DocumentController.createDocument)
          /**
     * @swagger
     * /api/documents:
     *   get:
     *     description: Gets a list of all documents
     *     tags:
     *      - Get Document List
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
     *          description: documents
     *          schema:
     *            type: array
     *            items:
     *              $ref: '#/definitions/Document'
     */
      .get(Auth.authenticateUser, DocumentMiddleware.validateOnGet,
                DocumentController.searchDocuments);

  router.route('/api/documents/:id')
   /**
     * @swagger
     * /api/documents/{id}:
     *   get:
     *     description: Gets a document by Id
     *     tags:
     *      - Returns a single document
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
     *          description: documents
     *          schema:
     *            type: array
     *            items:
     *              $ref: '#/definitions/Document'
     */
     .get(Auth.authenticateUser, DocumentMiddleware.validateOnGet,
                DocumentController.findDocument)
               /**
     * @swagger
     * /api/documents/{id}:
     *   put:
     *     description: Updates a document by Id
     *     tags:
     *      - Returns a updated document
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
     *          description: documents
     *          schema:
     *            type: array
     *            items:
     *              $ref: '#/definitions/Document'
     */
     .put(Auth.authenticateUser, DocumentController.updateDocument)
   /**
     * @swagger
     * /api/documents/{id}:
     *   delete:
     *     description: Removes a document by Id
     *     tags:
     *      - Removes a document by Id
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
     *          description: documents
     *          schema:
     *            type: array
     *            items:
     *              $ref: '#/definitions/Document'
     */
     .delete(Auth.authenticateUser, DocumentController.removeDocument);

  router.route('/api/search/documents')
        /**
   * @swagger
   * /api/users/search/documents?q={DocumentTitle}:
   *    get:
   *      description: Returns the documents
   *      tags:
   *        - Finds a document by title
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
     .get(Auth.authenticateUser, DocumentMiddleware.validateOnGet,
     DocumentController.retrieveDocByIdentifier);
};

export default documentRoutes;
