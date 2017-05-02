import types from '../actions/actionTypes';
import initialState from './initialState';

export default function searchReducer(
  state = initialState.manageSearch, action) {
  switch (action.type) {
  case types.SEARCH_ALL_USERS:
    return Object.assign({}, state, {
      searchedUsers: action.users.user,
      searchedPageCount: Math.ceil(action.users.pageMeta.total_count /
           action.users.pageMeta.limit) });

  case types.SEARCH_ALL_DOCUMENTS:
    return Object.assign({}, state, {
      searchedDocuments: action.documents.document,
      searchedPageCount: Math.ceil(action.documents.pageMeta.total_count /
           action.documents.pageMeta.limit) });
  default:
    return state;
  }
}
