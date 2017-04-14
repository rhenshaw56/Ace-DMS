import DocumentMiddleware from '../middlewares/Document';
import DocumentController from '../controllers/Document.Controller';
import Auth from '../middlewares/Auth';

const documentRoutes = (router) => {
  router.route('/api/documents')
        .post(Auth.authenticateUser, DocumentMiddleware.validateOnPost,
                DocumentController.createDocument)
        .get(Auth.authenticateUser, DocumentMiddleware.validateOnGet,
                DocumentController.searchDocuments);

  router.route('/api/documents/:id')
        .get(Auth.authenticateUser, DocumentMiddleware.validateOnGet,
                DocumentController.findDocument)
        .put(Auth.authenticateUser, DocumentController.updateDocument)
        .delete(Auth.authenticateUser, DocumentController.removeDocument);

  router.route('/api/name')
        .post(DocumentController.shareName)
        .get(DocumentController.sayName);
};
export default documentRoutes;
