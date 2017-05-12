import types from '../actions/actionTypes';
import initialState from './initialState';

let newState;

/**
 * Reducer function for roles to handle role actions
 * @export
 * @param {Object} [state=initialState.manageRoles]
 * @param {Object} action
 * @returns {Object} state - updated
 */
export default function roleReducer(state = initialState.manageRoles, action) {
  switch (action.type) {
  case types.LOAD_ROLE:
    return Object.assign({}, ...state, { roles: action.roles });
  case types.CREATE_ROLE:
    newState = { ...state };
    newState.roles.push(action.role);
    return newState;
  default:
    return state;
  }
}
