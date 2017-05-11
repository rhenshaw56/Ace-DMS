import model from '../models';
import Auth from '../middlewares/Auth';
import ErrorHandler from '../helpers/ErrorHandler';
import ResponseHandler from '../helpers/ResponseHandler';

/**
 * @class RoleController
 */
class RoleController {
  /** Function to create a new role
   * @static
   * @param {Object} request
   * @param {Object} response
   * @returns {Object} response
   * @memberOf RoleController
   */
  static createRole(request, response) {
    model.Role.create(request.body)
    .then((role) => {
      ResponseHandler.sendResponse(
        response,
        201,
        {
          id: role.id,
          title: role.title
        }
      );
    })
    .catch((error) => {
      ErrorHandler.handleRequestError(
        response,
        error
      );
    });
  }
 /** Function to retrieve a role by id
   * @static
   * @param {Object} request
   * @param {Object} response
   * @returns {Object} response
   * @memberOf RoleController
   */
  static retrieveRole(request, response) {
    model.Role.findById(request.params.id, {
      attributes: ['id', 'title', 'createdAt']
    })
    .then((role) => {
      if (role) {
        ResponseHandler.sendResponse(
          response,
          200,
          role
        );
      } else {
        ResponseHandler.send404(response);
      }
    })
    .catch((error) => {
      ErrorHandler.handleRequestError(
        response,
        error
      );
    });
  }

  /** Function to get all roles
   * @static
   * @param {Object} request
   * @param {Object} response
   * @returns {Object} response
   * @memberOf RoleController
   */
  static retrieveRoles(request, response) {
    const search = request.query.search;
    const limit = request.query.limit;
    const offset = request.query.offset;
    const page = request.query.page;
    const queryBuilder = {
      attributes: ['id', 'title', 'createdAt'],
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
        $or: [{ title: { $iLike: { $any: searchList } } }]
      };
    }
    model.Role.findAndCountAll(queryBuilder)
    .then((roles) => {
      if (roles.rows.length > 0) {
        ResponseHandler.sendResponse(
          response,
          200,
          {
            roles: roles.rows,
            total: roles.count
          }
        );
      } else {
        ResponseHandler.send404(response);
      }
    });
  }
 /** Function to edit roles
   * @static
   * @param {Object} request
   * @param {Object} response
   * @returns {Object} response
   * @memberOf RoleController
   */
  static updateRole(request, response) {
    model.Role.update(request.body, {
      where: {
        id: request.params.id
      }
    })
    .then((update) => {
      if (update[0] === 1) {
        ResponseHandler.sendResponse(
          response,
          200,
          { message: 'Update Successful' }
        );
      } else {
        ResponseHandler.send404(response);
      }
    });
  }
  /** Function to delete roles
   * @static
   * @param {Object} request
   * @param {Object} response
   * @returns {Object} response
   * @memberOf RoleController
   */
  static removeRole(request, response) {
    const id = request.params.id;
    model.Role.destroy({
      where: { id }
    })
    .then((status) => {
      if (status) {
        ResponseHandler.sendResponse(
          response,
          200,
          { message: 'Role removed Successfully' }
        );
      } else {
        ResponseHandler.send404(response);
      }
    });
  }
}
export default RoleController;
