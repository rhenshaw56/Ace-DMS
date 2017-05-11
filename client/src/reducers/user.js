import isEmpty from 'lodash/isEmpty';
import types from '../actions/actionTypes';
import initialState from './initialState';

let newState;

export default function userReducer(state = initialState.manageUsers, action) {
  switch (action.type) {
  case types.SIGNUP_USER:
    return Object.assign({}, ...state, { users: action.user });

  case types.LOGIN_USER:
    return Object.assign({}, ...state, { users: action.user });

  case types.LOGOUT_USER:
    return Object.assign({}, ...state, {});

  case types.INIT_USERS:
    return Object.assign({}, ...state, {
      Users: action.users.user,
      pageCount: Math.ceil(action.users.pageMeta.total_count /
         action.users.pageMeta.limit) });

  case types.INIT_ALL_USERS:
    return Object.assign({}, ...state, {
      allUsers: action.users });

  case types.DISPLAY_USER:
    return Object.assign({},
        state, { viewMode: true }, { selectedUser: action.user });

  case types.DELETE_USER:
    newState = { ...state };
    newState.allUsers = [...state.allUsers].filter(
      user => user.id !== action.id
      );
    return newState;

  default:
    return state;
  }
}

