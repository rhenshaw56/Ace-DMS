import { expect } from 'chai';
import decode from 'jwt-decode';
import jwt from 'jsonwebtoken';
import Auth from '../../middlewares/Auth';
import FakeData from '../helpers/SpecFakers';

const user = FakeData.RegularUser;
const userToken = Auth.generateToken(user);

describe('Auth', () => {
  describe('Generates Token', () => {
    it('should generate token for a valid user', () => {
      const newUser = FakeData.RandomUser;
      const token = Auth.generateToken(newUser);
      const decodedToken = decode(token);
      expect(token).to.be.string;
      expect(decodedToken.email).to.equal(newUser.email);
      expect(decodedToken.firstName).to.equal(newUser.firstName);
    });
  });
  describe('Verifies Token', () => {
    it('should verify token  for valid user', () => {
      expect(Auth.verifyToken(userToken)).to.be.user;
    });
    it('should verify invalid tokens', () => {
      const invalidToken = jwt.sign('me', 'withMyAwesomeSecret');
      const status = Auth.verifyToken(invalidToken);
      expect(status.success).to.be.false;
      expect(status.message).to.equal('Failed to authenticate token');
    });
  });
});

