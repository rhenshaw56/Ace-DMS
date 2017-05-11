/**
 * @export
 * @class ResponseHandler
 */
export default class ResponseHandler {
  /** Function to send custom response
   * @static
   * @param {any} response
   * @param {any} body
   * @returns {Object} response
   * @returns {Number} statusCode
   * @returns {Object} body
   * @memberOf ResponseHandler
   */
  static sendResponse(response, statusCode, body) {
    return response.status(statusCode).send(body);
  }
  /** Function to send response for a 400 status code error
   * @static
   * @param {Object} response
   * @param {Object} body
   * @returns {Object} response
   * @returns {Object} body
   * @memberOf ResponseHandler
   */
  static send400(response, body) {
    const message = body || { message: 'Bad Request' };
    return ResponseHandler.sendResponse(response, 400, message);
  }

  /** Function to send response for a 401 status code error
   * @static
   * @param {any} response
   * @param {any} body
   * @returns {Object} response
   * @returns {Object} body
   * @memberOf ResponseHandler
   */
  static send401(response, body) {
    const message = body || { message: 'Unauthorized Request' };
    return ResponseHandler.sendResponse(response, 401, message);
  }
    /** Function to send response for a 403 status code error
   * @static
   * @param {any} response
   * @param {any} body
   * @returns {Object} response
   * @returns {Object} body
   * @memberOf ResponseHandler
   */
  static send403(response, body) {
    const message = body ||
        { message: 'Forbidden Request, Permission required' };
    return ResponseHandler.sendResponse(response, 403, message);
  }
    /** Function to send response for a 404 status code error
   * @static
   * @param {any} response
   * @param {any} body
   * @returns {Object} response
   * @returns {Object} body
   * @memberOf ResponseHandler
   */
  static send404(response, body) {
    const message = body || { message: 'Not found' };
    return ResponseHandler.sendResponse(response, 404, message);
  }
   /** Function to send response for a 404 status code error
   * @static
   * @param {any} response
   * @param {any} body
   * @returns {Object} response
   * @returns {Object} body
   * @memberOf ResponseHandler
   */
  static send409(response, body) {
    const message = body || { message: 'Invalid Operation! User already Exist' };
    return ResponseHandler.sendResponse(response, 409, message);
  }
}
