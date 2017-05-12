import ResponseHandler from './ResponseHandler';

/**
 * Class for formatting custom errors
 * @class ErrorHandler
 */
class ErrorHandler {
  /** Function to parse errors
   * @static
   * @param {Object} errors
   * @returns {Object} ErrorMessage
   * @memberOf ErrorHandler
   */
  static parseErrors(errors) {
    return errors.map(error => ({ message: error.message }));
  }

  /** Function to handle request errors
   * @static
   * @param {any} response
   * @param {any} error
   * @returns {Object}; errorBOdy
   * @memberOf ErrorHandler
   */
  static handleRequestError(response, error) {
    switch (error.name) {
    case 'SequelizeValidationError' || 'SequelizeUniqueConstraintError' : {
      const customErrors = ErrorHandler.parseErrors(error.errors);
      return ResponseHandler.send400(response, customErrors);
    }
    case 'SequelizeForeignKeyConstraintError' : {
      return ResponseHandler.send400(
        response,
        { message: error.message }
      );
    }
    default: {
      return ResponseHandler.send400(response);
    }
    }
  }
}
export default ErrorHandler;
