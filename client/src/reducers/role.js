import types from '../actions/actionTypes';
import initialState from './initialState';


export default function roleReducer(state = initialState.manageRoles, action) {
  switch (action.type) {
  case types.LOAD_ROLE:
    return Object.assign({}, ...state, { roles: action.roles });

  default:
    return state;
  }
}
