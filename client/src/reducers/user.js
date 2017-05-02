import isEmpty from 'lodash/isEmpty';
import types from '../actions/actionTypes';
import initialState from './initialState';


export default function userReducer(state = initialState.manageUsers, action) {
  switch (action.type) {
  case types.SIGNUP_USER:
    return [
      ...state,
      Object.assign({}, { users: action.user })
    ];

  case types.GET_USER:
    return [
      ...state,
      Object.assign({}, { owner: action.name })
    ];
  case types.LOGIN_USER:
    return [
      ...state,
      Object.assign({}, { users: action.user })
    ];
  case types.LOGOUT_USER:
    return [
      ...state,
      {}
    ];
  case types.INIT_USERS:
    return Object.assign({}, ...state, {
      Users: action.users.user,
      pageCount: Math.ceil(action.users.pageMeta.total_count /
         action.users.pageMeta.limit) });

  case types.INIT_ALL_USERS:
    return Object.assign({}, ...state, {
      allUsers: action.users });
      
  case types.DISPLAY_USER:
    return Object.assign({}, state, { userDetails: !isEmpty(action.id) });

  case types.GET_USER_AUTH:
    return Object.assign({}, state, { authUser: action.user });
  default:
    return state;
  }
}

