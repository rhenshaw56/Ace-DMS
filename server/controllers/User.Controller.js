import model from '../models';
import Auth from '../middlewares/auth';
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
         ResponseHandler.send409(response);
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

  // check: (req, res) => {
  //   res.status(200).send({ message: `Inv successfullly` });
  // }
  // static createUser(req, res) {
  //   res.send({ message: 'i am in the controller'});
  // }
}
export default UserController;
