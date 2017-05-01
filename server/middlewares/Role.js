import ResponseHandler from '../helpers/ResponseHandler';
import Auth from './Auth';

export default class Role {
  static validateOnGet(request, response, next) {
    if (!Auth.verifyAdmin(request.decoded.roleId)) {
      ResponseHandler.send403(
        response,
        { message: 'Admin Privilege Required' }
      );
    } else if (request.query && Number(request.query.limit) < 1) {
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
  static validateOnPost(request, response, next) {
    if (!Auth.verifyAdmin(request.decoded.roleId)) {
      ResponseHandler.send403(
                response,
                { message: 'Invalid Operation! You cannot create Roles.' }
            );
    } else if (request.body.id) {
      ResponseHandler.send404(
                response,
                { message: 'You dont have access yet' }
            );
    } else {
      next();
    }
  }

  static validateOnDelete(request, response, next) {
    const userRoleId = request.decoded.roleId;
    const userId = Number(request.params.id);
    if (!Auth.verifyAdmin(userRoleId)) {
      ResponseHandler.send403(
                response,
                { message: 'Contact an Admin to perform this operation' }
            );
    } else if (userId === 1 || userId === 2) {
      ResponseHandler.send403(
                response,
                { message: 'This Role cannot be deleted' }
            );
    } else {
      next();
    }
  }

  static validateOnPut(request, response, next) {
    const userId = Number(request.params.id);
    if (Auth.verifyAdmin(request.decoded.roleId)) {
      ResponseHandler.send403(
                response,
                { message: 'Contact an Admin to perform this operation' }
            );
    } else if (userId === 1 || userId === 2) {
      ResponseHandler.send403(
                response,
                { message: 'This Role cannot be Edited' }
            );
    } else {
      next();
    }
  }
}
