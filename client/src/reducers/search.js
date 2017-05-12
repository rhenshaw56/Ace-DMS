import types from '../actions/actionTypes';
import initialState from './initialState';


export default function roleReducer(state = initialState.manageSearch, action) {
  switch (action.type) {

  case types.GET_USERS:
    return Object.assign({}, ...state, { searchList: action.users });

  default:
    return state;
  }
}
