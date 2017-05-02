import isEmpty from 'lodash/isEmpty';
import initialState from './initialState';
import types from '../actions/actionTypes';

export default (state = initialState, action = {}) => {
  switch (action.type) {
  case types.SETUP_USER:
    return {
      isLoggedIn: !isEmpty(action.user),
      user: action.user
    };
  default: return state;
  }
};
