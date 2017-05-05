import DocumentMiddleware from '../middlewares/Document';
import DocumentController from '../controllers/DocumentController';
import Auth from '../middlewares/Auth';

const documentRoutes = (router) => {
  /**
 * @swagger
 * definitions:
 *   NewDocument:
 *     type: object
 *     required:
 *       - title
 *       - content
 *     properties:
 *       title:
 *         type: string
 *       content:
 *         type: text
 *   Document:
 *     allOf:
 *       - $ref: '#/definitions/NewDocument'
 *       - required:
 *         - id
 *       - properties:
 *         id:
 *           type: integer
 *           format: int64
 */
  router.route('/api/documents')
            /**
     * @swagger
     * /api/documents:
     *   post:
     *     description: Creates a document
     *     tags:
     *      - Create Document
     *     produces:
     *      - application/json
     *     parameters:
     *       - name: Authorization
     *         in: header
     *         description: a valid token
     *         required: true
     *         type: string
     *       - name: body
     *         description: User object
     *         in:  body
     *         required: true
     *         type: string
     *         schema:
     *           $ref: '#/definitions/Document'
     *     responses:
     *       200:
     *         description: users
     *         schema:
     *          type: object
     */
     .post(Auth.authenticateUser, DocumentMiddleware.validateOnPost,
                DocumentController.createDocument)
      /** @swagger
      *  /api/documents/?limit=4&offset=2:
      *   get:
      *     description: Returns a maximumum {limit} number of documents from the the {offset}
      *     tags:
      *       - Get documents
      *     produces:
      *        - application/json
      *     parameters:
      *        - name: Authorization
      *          in: header
      *          description: a valid token
      *          required: true
      *          type: string
      *     responses:
      *        200:
      *          description: get documents from the database
      *          schema:
      *            type: array
      *            items:
      *              $ref: '#/definitions/Document'
      */
      .get(Auth.authenticateUser, DocumentMiddleware.validateOnGet,
                DocumentController.searchDocuments);

  router.route('/api/documents/:id')
            /** @swagger
      *  /api/documents/{id}:
      *   get:
      *     description: Returns a document specified by id
      *     tags:
      *       - Get single document
      *     produces:
      *        - application/json
      *     parameters:
      *        - name: Authorization
      *          in: header
      *          description: a valid token
      *          required: true
      *          type: string
      *     responses:
      *        200:
      *          description: get documents from the database
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
     *     description: Update  a document
     *     tags:
     *      - Update a Document
     *     produces:
     *      - application/json
     *     parameters:
     *       - name: Authorization
     *         in: header
     *         description: a valid token
     *         required: true
     *         type: string
     *       - name: body
     *         description: User object
     *         in:  body
     *         required: true
     *         type: string
     *     responses:
     *       200:
     *         description: users
     *         schema:
     *          type: object,
     *          items:
     *            $ref: '#/definitions/Document'
     */
     .put(Auth.authenticateUser, DocumentController.updateDocument)
         /**
     * @swagger
     * /api/documents/{id}:
     *    delete:
     *      description: Deletes the document by the specified id
     *      tags:
     *        - Delete document
     *      produces:
     *        - application/json
     *      parameters:
     *        - name: Authorization
     *          in: header
     *          description: a valid token
     *          required: true
     *          type: string
     *      responses:
     *        200:
     *          description: users
     *          schema:
     *            type: array
     *            items:
     *              $ref: '#/definitions/Document'
     */
     .delete(Auth.authenticateUser, DocumentController.removeDocument);
    /**
 * @swagger
 * definitions:
 *   NewDocument:
 *     type: object
 *     required:
 *       - title
 *       - content
 *     properties:
 *       title:
 *         type: string
 *       content:
 *         type: text
 *   Document:
 *     allOf:
 *       - $ref: '#/definitions/NewDocument'
 *       - required:
 *         - id
 *       - properties:
 *         id:
 *           type: integer
 *           format: int64
 */
  router.route('/api/search/documents')
            /**
   * @swagger
   * /api/users/search/documents?q={doctitle}:
   *    get:
   *      description: finds the documents by its title
   *      tags:
   *        - returns document
   *      produces:
   *        - application/json
   *      parameters:
   *        - name: Authorization
   *          in: header
   *          description: a valid token
   *          required: true
   *          type: string
   *        - in: query
   *          name: q
   *          description: document belonging to a registred user
   *          required: true
   *          type: string
   *      responses:
   *        200:
   *          description: user
   *          schema:
   *            type: object
   */
     .get(DocumentController.retrieveDocByIdentifier);
};

export default documentRoutes;
