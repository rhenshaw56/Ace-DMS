import model from '../models';
import Auth from '../middlewares/Auth';
import ErrorHandler from '../helpers/ErrorHandler';
import ResponseHandler from '../helpers/ResponseHandler';

// const user = db.user;

class UserController {

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
              { message: 'Wrong password!' }
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
  static logOut(request, response) {
    const id = request.body.id;
    model.User.findById(id)
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
}
export default UserController;
