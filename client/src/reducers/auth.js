import isEmpty from 'lodash/isEmpty';
import initialState from './initialState';
import types from '../actions/actionTypes';

export default (state = initialState.manageUsers, action = {}) => {
  switch (action.type) {
  case types.SETUP_USER:
    return {
      isLoggedIn: window.localStorage.getItem('jwtToken') !== null,
      user: action.user
    };
  case types.EDIT_USER:
    return Object.assign({}, state, { user: action.user });
  default: return state;
  }
};
