import jwt from 'jsonwebtoken';
import responseHandler from '../helpers/ResponseHandler';
import db from '../models';

const secret = process.env.SECRET;
const userDb = db.User;

/**
 * @export
 * @class Auth
 */
export default class Auth {

  /**
   * Function to generate Tokens for users
   * @static
   * @param {Object} user
   * @returns {Object} tokenBody
   * @memberOf Auth
   */
  static generateToken(user) {
    return jwt.sign(
      {
        id: user.id,
        email: user.email,
        userName: user.userName,
      }, secret, { expiresIn: 57600 });
  }
   /**
   * Function to retrieve Tokens for users
   * @static
   * @param {Object}req
   * @returns {String} token
   * @memberOf Auth
   */
  static retrieveToken(req) {
    const token = req.body.token
     || req.query.token
     || req.headers['x-access-token']
     || req.headers.authorization;
    return token;
  }
  /**
   * Function to verify Tokens for users
   * @static
   * @param {String}token
   * @returns {Object} message
   * @memberOf Auth
   */
  static verifyToken(token) {
    try {
      return jwt.verify(token, secret);
    } catch (e) {
      return { success: false, message: 'Failed to authenticate token' };
    }
  }

  /**
   * Function to authenticate users
   * @static
   * @param {Object} request
   * @param {Objective} response
   * @param {CallBack} next
   * @returns {Object} authentication message
   * @memberOf Auth
   */
  static authenticateUser(request, response, next) {
    const token = Auth.retrieveToken(request);
    if (token) {
      const decoded = Auth.verifyToken(token);
      if (decoded) {
        userDb.findById(decoded.id, {
          attributes: ['currentToken', 'roleId']
        })
        .then((user) => {
          if (user && user.currentToken) {
            request.decoded = decoded;
            request.decoded.roleId = user.roleId;
            next();
          } else {
            const body = { message: 'Invalid Token' };
            responseHandler.send401(response, body);
          }
        });
      } else {
        const body = { message: 'Invalid Token' };
        responseHandler.send401(response, body);
      }
    } else {
      const body = { message: 'Authentication Token Required' };
      responseHandler.send401(response, body);
    }
  }

  /**
   * Function to activate Tokens for users
   * @static
   * @param {Object} user
   * @param {String} currentToken
   * @returns {none} none
   * @memberOf Auth
   */
  static activateToken(response, currentToken) {
    return response.header('x-auth', currentToken);
  }

   /**
    * Function to verify admin user
   * @static
   * @param {Number} roleId
   * @returns {Boolean} value
   * @memberOf Auth
   */
  static verifyAdmin(roleId) {
    return Number(roleId) === 1;
  }

  static validateLogin(data) {
    let status = true;
    if (!data.authProvider.email) {
      status = false;
      throw new Error('No Email Provided!');
    }
    if (!data.authProvider.password) {
      status = false;
      throw new Error('No Password Provided!');
    }
    return status;
  }
}
