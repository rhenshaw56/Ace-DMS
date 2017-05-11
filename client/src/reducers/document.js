import isEmpty from 'lodash/isEmpty';
import types from '../actions/actionTypes';
import initialState from './initialState';

let newState;

/**
 * Reducer function for documents to handle document actions
 * @export
 * @param {Object} [state=initialState.manageDocuments]
 * @param {Object} action
 * @returns {Object} state - updated
 */
export default function documentReducer(
  state = initialState.manageDocuments, action) {
  switch (action.type) {
  case types.LOAD_DOCUMENT:
    return Object.assign({}, ...state, { documents: action.documents });

  case types.CREATE_DOCUMENT:
    newState = { ...state };
    newState.documents.push(action.document);
    return newState;

  case types.DELETE_DOCUMENT:
    newState = { ...state };
    newState.documents = [...state.documents].filter(document => document.id !== action.id);
    return newState;
  case types.DISPLAY_DOCUMENT:
    return Object.assign({}, state, { documentDetails: !isEmpty(action.id) });

  case types.EDIT_DOCUMENT:
    return Object.assign({}, state, { editMode: true }, { document: action.document });
  default:
    return state;
  }
}
