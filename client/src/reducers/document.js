import isEmpty from 'lodash/isEmpty';
import types from '../actions/actionTypes';
import initialState from './initialState';


export default function documentReducer(
  state = initialState.manageDocuments, action) {
  switch (action.type) {
  case types.LOAD_DOCUMENT:
    return Object.assign({}, ...state, { documents: action.documents });

  case types.CREATE_DOCUMENT:
    return [
      ...state.documents,
      Object.assign({}, action.document)
    ];

  case types.DISPLAY_DOCUMENT:
    return Object.assign({}, state, { documentDetails: !isEmpty(action.id) });

  case types.EDIT_DOCUMENT:
    return Object.assign({}, state, { editMode: true }, { document: action.document });
  default:
    return state;
  }
}
