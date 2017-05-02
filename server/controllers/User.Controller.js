import model from '../models';
import Auth from '../middlewares/Auth';
import ErrorHandler from '../helpers/ErrorHandler';
import ResponseHandler from '../helpers/ResponseHandler';


/**
 * @class UserController
 */
class UserController {
  /**
   * Function used to format output data from this class
   * @static
   * @param {Object} user
   * @returns {Object} user
   * @memberOf UserController
   */
  static formatUserDetails(user, token) {
    return {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      createdAt: user.createdAt,
      token
    };
  }


  /**
   * Request handler that handles request for new users
   * @static
   * @param {Object} request
   * @param {Object} response
   * @returns {Object} response
   * @memberOf UserController
   */
  static createUser(request, response) {
    const user = request.body;
    user.roleId = user.roleId || 2;
    model.User.findOne({ where: { email: user.email } })
     .then((existingUser) => {
       if (existingUser) {
         return ResponseHandler.send409(response);
       }
       model.User.create(request.body)
        .then((newUser) => {
          const token = Auth.generateToken(newUser);
          Auth.activateToken(newUser, token)
           .then(() => {
             ResponseHandler.sendResponse(
               response,
               201,
               Object.assign(
                 {},
                 UserController.formatUserDetails(newUser, token),
                 { roleId: newUser.roleId }
               )
             );
           });
        })
        .catch((error) => {
          ErrorHandler.handleRequestError(response, error);
        });
     });
  }
  /**
   * @static
   * @param {any} request
   * @param {any} response
   * @returns {Object} response
   * @memberOf UserController
   */
  static logIn(request, response) {
    if (request.body.email && request.body.password) {
      const newUser = request.body;
      model.User.findOne({ where: { email: newUser.email } })
      .then((user) => {
        if (user) {
          if (user.verifyPassword(newUser.password)) {
            const token = Auth.generateToken(user);
            user.update({ currentToken: token })
            .then(() => {
              response.status(200).json({
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                roleId: user.roleId,
                id: user.id,
                createdAt: user.createdAt,
                token
              });
            });
          } else {
            ResponseHandler.send401(
              response,
              { message: 'Bad Login Details!' }
            );
          }
        } else {
          ResponseHandler.send404(response);
        }
      })
      .catch((error) => {
        response.send(error);
      });
    } else {
      ResponseHandler.send400(
        response,
        { message: 'Invalid Operation! Please Enter valid login details' }
      );
    }
  }
  /**
   * @static
   * @param {Object} request
   * @param {Object} response
   * @returns {Object} response
   * @memberOf UserController
   */
  static logOut(request, response) {
    model.User.findOne({ where: { id: request.decoded.id } })
    .then((user) => {
      user.update({ currentToken: null })
      .then(() => {
        ResponseHandler.sendResponse(
          response,
          200,
          { message: 'Successfully Logged out' }
        );
      });
    });
  }
   /**
   * @static
   * @param {Object} request
   * @param {Object} response
   * @returns {Object} response
   * @memberOf UserController
   */
  static searchUsers(request, response) {
    const search = request.query.search;
    const limit = request.query.limit;
    const offset = request.query.offset;
    const page = request.query.page;
    const queryBuilder = {
      order: '"createdAt" DESC'
    };
    if (limit) {
      queryBuilder.limit = limit;
    }
    if (offset) {
      queryBuilder.offset = offset;
    }
    if (page) {
      const pageLimit = limit || 10;
      queryBuilder.offset = (page * pageLimit) - pageLimit;
      queryBuilder.limit = pageLimit;
    }
    if (search) {
      const searchList = search.split(/\s+/);
      queryBuilder.where = {
        $or: [{ firstName: { $iLike: { $any: searchList } } },
        { lastName: { $iLike: { $any: searchList } } },
        { email: { $iLike: { $any: searchList } } }]
      };
    }
    model.User.findAndCountAll(queryBuilder)
    .then((users) => {
      if (users.rows.length > 0) {
        ResponseHandler.sendResponse(
          response,
          200,
          {
            users: users.rows
              .map(user => UserController.formatUserDetails(user)),
            total: users.count
          }
        );
      } else {
        ResponseHandler.send404(response);
      }
    });
  }
  /**
   * @static
   * @param {Object} request
   * @param {Object} response
   * @returns {Object} response
   * @memberOf UserController
   */
  static findUser(request, response) {
    const userId = Number(request.params.id);
    model.User.findById(userId)
    .then((user) => {
      if (user) {
        ResponseHandler.sendResponse(
          response,
          200,
          UserController.formatUserDetails(user)
        );
      }
    })
    .catch((error) => {
      ErrorHandler.handleRequestError(response, error);
    });
  }
  /**
   * @static
   * @param {Object} request
   * @param {Object} response
   * @returns {Object} response
   * @memberOf UserController
   */
  static updateUserDetails(request, response) {
    model.User.findById(request.params.id)
    .then((user) => {
      if (user) {
        user.update(request.body)
        .then((updatedUser) => {
          ResponseHandler.sendResponse(
            response,
            200,
            UserController.formatUserDetails(updatedUser)
          );
        })
        .catch((error) => {
          ErrorHandler.handleRequestError(response, error);
        });
      } else {
        ResponseHandler.send404(response);
      }
    });
  }
  /**
   * @static
   * @param {Object} request
   * @param {Object} response
   * @returns {Object} response
   * @memberOf UserController
   */
  static removeUser(request, response) {
    const userId = Number(request.params.id);
    model.User.destroy({
      where: {
        id: userId
      }
    })
    .then((deletedRow) => {
      if (deletedRow) {
        ResponseHandler.sendResponse(
        response,
        200,
        { message: 'User Deleted' }
      );
      } else {
        ResponseHandler.send404(response);
      }
    })
    .catch((error) => {
      ErrorHandler.handleRequestError(response, error);
    });
  }
 /**
   * @static
   * @param {Object} request
   * @param {Object} response
   * @returns {Object} response
   * @memberOf UserController
   */
  static retrieveUserDocuments(request, response) {
    const userId = Number(request.params.id);
    const userRoleId = request.decoded.roleId;
    const retrieverId = request.decoded.id;
    model.User.findById(userId, {
      attributes: [
        'id', 'firstName', 'lastName', 'email', 'roleId'],
      include: {
        model: model.Document,
        attributes: ['id', 'access', 'title', 'content', 'ownerId', 'createdAt']
      }
    })
    .then((user) => {
      if (user) {
        const documents = user.Documents.filter((document) => {
          if (Auth.verifyAdmin(userRoleId)) {
            return true;
          } else if ((document.access === 'public' ||
                      userRoleId === user.roleId) &&
                      document.access !== 'private') {
            return true;
          } else if (document.access === 'private' &&
                      document.ownerId === retrieverId) {
            return true;
          }
          return false;
        });
        const userDetails = Object.assign(
          {},
          UserController.formatUserDetails(user),
          { documents });
        ResponseHandler.sendResponse(
            response,
            200,
            userDetails
          );
      } else {
        ResponseHandler.send404(response);
      }
    });
  }
  /**
   * @static
   * @param {Object} request
   * @param {Object} response
   * @returns {Object} response
   * @memberOf UserController
   */
  static retrieveUserByIdentifier(request, response) {
    if (request.query.q) {
      model.User.find({ where: { email: request.query.q } })
       .then((foundUser) => {
         if (foundUser) {
           return ResponseHandler.sendResponse(
             response,
             302,
             UserController.formatUserDetails(foundUser)
            );
         }
       }).catch(err => ResponseHandler.sendResponse(
           response,
           404,
           { status: false, message: err }
         ));
    }
  }
}
export default UserController;
