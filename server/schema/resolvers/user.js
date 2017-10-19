// import model from '../../models';
import Auth from '../../middlewares/Auth';
import ErrorHandler from '../../helpers/ErrorHandler';
import ResponseHandler from '../../helpers/ResponseHandler';
import filter from '../../helpers/queryFilter';

/**
 * @class UserHandler
 */
class UserHandler {

  static async getAllUsers(root, data, { db: { User }, req }) {
    const queryOptions = { ...data };
    if (data) {
      const user = await User.findOne(queryOptions);
      if (user) {
        return Object.assign(
          {},
          UserHandler.formatUserDetails(user),
        );
      }
      throw new Error('User Not Found!');
    }
    return User.find({});
  }

  /**
   * GraphQL handler that handles request for new users
   * @static
   * @param {Object} root
   * @param {Object} data
   * @returns {Object} db
   * @memberOf UserHandler
   */
  static async createUser(root, data, { db: { User }, req, res }) {
    const newUser = {
      userName: data.userName,
      email: data.authProvider.email,
      password: data.authProvider.password,
    };

    const existingUser = await User.find({
      $or: [{ email: newUser.email }, { userName: newUser.userName }]
    });
    if (existingUser.length > 0) {
      throw new Error('This user already already exist.');
    }
    const user = await User.create(newUser);
    const token = Auth.generateToken(user);
    Auth.activateToken(res, token);
    return Object.assign(
                 {},
                 UserHandler.formatUserDetails(user, token),
               );
  }

  /** GraphQL handler to handle login action for users
   * @static
   * @param {Object} root
   * @param {Object} data
   * @returns {Object} db
   * @memberOf UserHandler
   */
  static async signInUser(root, data, { db: { User }, req, res }) {
    if (Auth.validateLogin(data)) {
      const registeredUser = await User.findOne({
        email: data.authProvider.email
      });
      if (registeredUser) {
        if (registeredUser.comparePassword(
          data.authProvider.password,
          registeredUser)
        ) {
          const token = Auth.generateToken(registeredUser);
          Auth.activateToken(res, token);
          return Object.assign(
            {},
            UserHandler.formatUserDetails(registeredUser, token),
          );
        }
        throw new Error('Password does not match!.');
      } else {
        throw new Error('Invalid Email! User is not Registered!.');
      }
    }
  }
  /**
   * Function used to format output data for user details
   * @static
   * @param {Object} user
   * @param {String} token
   * @returns {Object} user
   * @memberOf UserController
   */
  static formatUserDetails(user, token) {
    return {
      id: user.id,
      email: user.email,
      userName: user.firstName,
      roles: user.roles,
      token
    };
  }

  /** Function to handle login action for users
   * @static
   * @param {Object} request
   * @param {Object} response
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
  /** Function to handle logout actions for users
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
    const userRoleId = request.decoded.roleId;
    if (Auth.verifyAdmin(userRoleId)) {
      const search = request.query.search;
      const limit = request.query.limit;
      const paged = request.query.page;
      let terms = {};
      if (search) {
        const searchList = search.split(/\s+/);
        terms = {
          $or: [{ firstName: { $iLike: { $any: searchList } } },
        { lastName: { $iLike: { $any: searchList } } },
        { email: { $iLike: { $any: searchList } } }]
        };
      }
      const queryBuilder = filter(request, undefined, terms);
      model.User.findAndCountAll(queryBuilder)
      .then((users) => {
        if (users.rows.length > 0) {
          const pageSize = limit || users.count;
          const pageCount = Math.ceil(users.count / limit) || 1;
          ResponseHandler.sendResponse(
          response,
          200,
            {
              users: users.rows
              .map(user => UserController.formatUserDetails(user)),
              total: users.count,
              page_size: pageSize,
              page_count: pageCount,
              page: paged
            }
        );
        } else {
          ResponseHandler.send404(response);
        }
      });
    } else {
      ResponseHandler.send403(response);
    }
  }
  /** Function to find a user by id
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
  /** Function to update user details
   * @static
   * @param {Object} request
   * @param {Object} response
   * @returns {Object} response
   * @memberOf UserController
   */
  static updateUserDetails(request, response) {
    const userRole = request.decoded.roleId;
    const userId = request.decoded.id;
    if (userRole === 1 || userId === Number(request.params.id)) {
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
    } else {
      ResponseHandler.send403(response);
    }
  }
  /** Function to delete a user
   * @static
   * @param {Object} request
   * @param {Object} response
   * @returns {Object} response
   * @memberOf UserController
   */
  static removeUser(request, response) {
    const userId = Number(request.params.id);
    model.User.findOne({
      where: {
        id: userId
      }
    })
    .then((foundUser) => {
      if (foundUser) {
        if (!Auth.verifyAdmin(foundUser.roleId)) {
          ResponseHandler.sendResponse(
        response,
        200,
        { message: 'User Deleted' }
      );
        } else {
          ResponseHandler.send403(response);
        }
      } else {
        ResponseHandler.send404(response);
      }
    })
    .catch((error) => {
      ErrorHandler.handleRequestError(response, error);
    });
  }
 /** Function to retrieve a user's documents
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
  /** Function to retrieve a user by email
   * @static
   * @param {Object} request
   * @param {Object} response
   * @returns {Object} response
   * @memberOf UserController
   */
  static retrieveUserByIdentifier(request, response) {
    if (request.query.q) {
      model.User.find({ where: { email: { $like: request.query.q } } })
       .then((foundUser) => {  //eslint-disable-line
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

  /**
   * Function to initialise users in app
   * @static
   * @param {Object} request
   * @param {Object} response
   * @returns {Object} response
   * @memberof UserController
   */
  static initUsers(request, response) {
    model.User.findAndCount({ where: { roleId: 2 } })
       .then((foundUsers) => {  //eslint-disable-line
         if (foundUsers) {
           return ResponseHandler.sendResponse(
                  response,
                      200,
             {
               users: foundUsers.rows
                .map(user => UserController.formatUserDetails(user)),
             }
                  );
         }
       }).catch(err => ResponseHandler.sendResponse(
           response,
           404,
           { status: false, message: err }
         ));
  }
}

export default UserHandler;
