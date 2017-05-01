import ResponseHandler from '../helpers/ResponseHandler';
import db from '../models';

export default class Document {
  static validateOnPost(request, response, next) {
    if (request.body.id) {
      ResponseHandler.send400(
        response,
        { message: 'Document ID Not Specifed' }
      );
    } else if (
      request.body &&
      request.body.title &&
      request.body.content
    ) {
      db.Document.findAll({
        where: {
          $and: [
            { ownerId: request.decoded.id },
            { title: request.body.title },
            { content: request.body.content }
          ]
        }
      }).then((documents) => {
        if (documents.length > 0) {
          ResponseHandler.sendResponse(
            response,
            409,
            { message: 'Multiple Documents Not Allowed' }
          );
        } else {
          next();
        }
      });
    } else {
      ResponseHandler.send400(
        response,
        { message: 'Required Fields Missing' }
      );
    }
  }

  static validateOnGet(request, response, next) {
    if (request.query && Number(request.query.limit) < 1) {
      ResponseHandler.send400(
        response,
        { message: 'Invalid Limit' }
      );
    } else if (request.query && Number(request.query.offset) < 0) {
      ResponseHandler.send400(
        response,
        { message: 'Invalid Offset' }
      );
    } else {
      next();
    }
  }
}
