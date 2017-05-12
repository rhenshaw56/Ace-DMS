import { expect } from 'chai';
import userReducer from '../../src/reducers/user';

const users = [
  {
    id: 1,
    firstName: 'Rowland',
    email: 'henshaw@gmail.com'
  },
  {
    id: 2,
    firstName: 'Luggard',
    email: 'luggard@gmail.com'
  },
  {
    id: 3,
    firstName: 'niyi',
    email: 'niyi@gmail.com'

  }
];
const updatedState = {
  allUsers: [],
  selectedUser: {},
  userDetails: false,
  isLoggedIn: false,
  viewMode: false
};
const initialState = {
  allUsers: [],
  selectedUser: {},
  userDetails: false,
  isLoggedIn: false,
  viewMode: false
};
let currentState;

describe('User reducer', () => {
  it('should return the initial state as the default case', () => {
    expect(userReducer({}, [])).to.eql({});
  });

  it(`should signup a user in the store and
       return the state with all users`, () => {
    const user = {
      id: 7,
      firstName: 'bibi',
      lastName: 'wonder',
    };

    const action = { type: 'SIGNUP_USER', user };
    currentState = userReducer(initialState, action);
    expect(currentState.users.firstName).to.eql(user.firstName);
  });

  it('should initialise all users into the store', () => {
    const action = { type: 'INIT_ALL_USERS', users };
    currentState = userReducer(initialState, action);
    expect(currentState.allUsers.length).to.eql(3);
  });

  it('should update state on user delete', () => {
    expect(currentState.allUsers.length).to.eql(3);
    const action = { type: 'DELETE_USER', id: 3 };
    currentState = userReducer(currentState, action);
    expect(currentState.allUsers.length).to.eql(2);
  });
});
