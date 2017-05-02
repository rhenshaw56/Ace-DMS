import jwt from 'jsonwebtoken';
import responseHandler from '../helpers/ResponseHandler';
import db from '../models';

const secret = process.env.SECRET;
const userDb = db.User;

export default class Auth {

  static generateToken(user) {
    return jwt.sign(
      {
        id: user.id,
        roleId: user.roleId,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName
      }, secret, { expiresIn: 57600 });
  }

  static retrieveToken(req) {
    const token = req.body.token
     || req.query.token
     || req.headers['x-access-token']
     || req.headers.authorization;
    return token;
  }

  static verifyToken(token) {
    try {
      return jwt.verify(token, secret);
    } catch (e) {
      return { success: false, message: 'Failed to authenticate token' };
    }
  }
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
  static activateToken(user, currentToken) {
    return user.update({ currentToken });
  }
  static verifyAdmin(roleId) {
    return Number(roleId) === 1;
  }
}
