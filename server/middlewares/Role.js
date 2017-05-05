import ResponseHandler from '../helpers/ResponseHandler';
import Auth from './Auth';

/**
 * @export
 * @class Role
 */
export default class Role {
  /**
   * Function to validate Get Request for roles
   * @static
   * @param {any} request
   * @param {any} response
   * @param {any} next
   * @returns {Object} validation message
   * @memberOf Role
   */
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
    /**
   * Function to validate Post Request for roles
   * @static
   * @param {any} request
   * @param {any} response
   * @param {any} next
   * @returns {Object} validation message
   * @memberOf Role
   */
  static validateOnPost(request, response, next) {
    if (!Auth.verifyAdmin(request.decoded.roleId)) {
      ResponseHandler.send403(
                response,
                { message: 'Invalid Operation! You cannot create Roles.' }
            );
    } else if (request.body.id) {
      ResponseHandler.send400(
                response,
                { message: 'You dont have access yet' }
            );
    } else {
      next();
    }
  }
  /**
   * Function to validate Delete Request for roles
   * @static
   * @param {any} request
   * @param {any} response
   * @param {any} next
   * @returns {Object} validation message
   * @memberOf Role
   */
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
  /**
   * Function to validate Put Request for roles
   * @static
   * @param {any} request
   * @param {any} response
   * @param {any} next
   * @returns {Object} validation message
   * @memberOf Role
   */
  static validateOnPut(request, response, next) {
    const userId = Number(request.params.id);
    if (!Auth.verifyAdmin(request.decoded.roleId)) {
      ResponseHandler.send403(
                response,
                { message: 'Contact an Admin to perform this operation' }
            );
    } else if (userId === 1 || userId === 2) {
      ResponseHandler.send403(
                response,
                { message: 'This Role cannot be Edited' }
            );
    } else if (request.body.id) {
      ResponseHandler.send400(
        response,
        { message: 'Role Id not to be specified on update' }
      );
    } else {
      next();
    }
  }
}
