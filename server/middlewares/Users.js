import ResponseHandler from '../helpers/ResponseHandler';
import auth from './Auth';

/**
 * @export
 * @class User
 */
export default class User {
  /**
   * @static
   * @param {any} req
   * @param {any} res
   * @param {any} next
   * @returns {Object} validation message
   * @memberOf User
   */
  static validateOnCreate(req, res, next) {
    const roleId = req.body.roleId;
    if (roleId && auth.verifyAdmin(roleId)) {
      ResponseHandler.send403(res,
        { message: 'Cannot create Admin User' }
      );
    } else if (req.body.id) {
      ResponseHandler.send400(res,
        { message: 'Invalid User Id' }
      );
    } else {
      next();
    }
  }
  /**
   * @static
   * @param {any} req
   * @param {any} res
   * @param {any} next
   * @returns {Object} validation message
   * @memberOf User
   */
  static validateOnDelete(req, res, next) {
    if (!auth.verifyAdmin(req.decoded.roleId)
     && req.params.id === req.decoded.roleId) {
      ResponseHandler.send403(res,
       { message: 'Admin cannot be deleted' }
     );
    } else if (!auth.verifyAdmin(req.decoded.roleId)) {
      ResponseHandler.send403(res,
          { message: 'Admin role required for this operation' });
    } else {
      next();
    }
  }
    /**
   * @static
   * @param {any} req
   * @param {any} res
   * @param {any} next
   * @returns {Object} validation message
   * @memberOf User
   */
  static validateOnUpdate(req, res, next) {
    if (req.body.id) {
      ResponseHandler.send400(res,
        { message: 'Invalid Operation! Cannot Change User ID' });
    } else if (req.body.email) {
      ResponseHandler.send400(res,
       { message: 'Invalid Operation! Cannot Change Email' });
    } else if (auth.verifyAdmin(req.decoded.roleId)) {
      next();
    } else {
      ResponseHandler.send403(res);
    }
  }
    /**
   * @static
   * @param {any} req
   * @param {any} res
   * @param {any} next
   * @returns {Object} validation message
   * @memberOf User
   */
  static validateGetRequest(req, res, next) {
    if (req.query && Number(req.query.limit) < 1) {
      ResponseHandler.send400(res,
        { message: 'Invalid Limit' }
      );
    } else if (req.query && Number(req.query.offset) < 0) {
      ResponseHandler.send400(res,
        { message: 'Invalid Offset' }
      );
    } else {
      next();
    }
  }
}


