import axios from 'axios';
import types from './actionTypes';

/**
 * Function to dispatch action type of LOAD_DOCUMENT
 * @export
 * @param {Array} documents
 * @returns {Object} action
 */
export function loadDocuments(documents) {
  return { type: types.LOAD_DOCUMENT, documents };
}

/**
 * Function to dispatch action type of CREATE_DOCUMENT
 * @export
 * @param {Object} document
 * @returns {Object} action
 */
export function createDocument(document) {
  return {
    type: types.CREATE_DOCUMENT,
    document
  };
}

/**
 * Function to dispatch action type of SETUP_DOCUMENT
 * @export
 * @param {Number} id
 * @returns {Object} action
 */
export function setDocument(id) {
  return {
    type: types.SETUP_DOCUMENT,
    id
  };
}

/**
 * Function to dispatch action type of DELETE_DOCUMENT
 * @export
 * @param {Number} id
 * @returns {Object} action
 */
export function deleteDocument(id) {
  return {
    type: types.DELETE_DOCUMENT,
    id
  };
}

/**
 * Function to dispatch action type of EDIT_DOCUMENT
 * @export
 * @param {Object} document
 * @returns {Object} action
 */
export function editDocument(document) {
  return {
    type: types.EDIT_DOCUMENT,
    document
  };
}

/**
 * Function to dispatch action type of DISPLAY_DOCUMENT
 * @export
 * @param {Number} id
 * @returns {Object} action
 */
export function displayCurrentDocument(id) {
  return {
    type: types.DISPLAY_DOCUMENT,
    id
  };
}

/**
 * Async Function to handle loading user documents
 * @export
 * @returns {Object} dispatch
 */
export function loadUserDocument() {
  return (dispatch, getState) => axios.get(
      `/api/users/${getState().auth.user.id}/documents`).then((res) => {
        dispatch(loadDocuments(res.data.documents));
      });
}

/**
 * Async Function to handle loading all user documents
 * @export
 * @returns {Object} dispatch
 */
export function loadAllDocument() {
  return dispatch => axios.get('/api/documents').then((res) => {
    dispatch(loadDocuments(res.data.documents));
  });
}

/**
 * Async Function to handle saving of documents
 * @export
 * @param {Object} document
 * @returns {Object} dispatch
 */
export function saveDocument(document) {
  return dispatch => axios.post('/api/documents/', document).then((response) => {
    dispatch(createDocument(response.data));
  });
}

/**
 * Async Function to handle updates on documents
 * @export
 * @param {Object} document
 * @returns {Object} dispatch
 */
export function updateDocument(document) {
  return dispatch => axios.put(`/api/documents/${document.id}`, document)
  .then(() => {
    dispatch(loadUserDocument());
  });
}

/**
 * Async Function to handle deletion of user documents by id
 * @export
 * @param {Object} id
 * @returns {Object} dispatch
 */
export function deleteDocumentById(id) {
  return dispatch => axios.delete(`/api/documents/${id}`).then(() => {
    dispatch(deleteDocument(id));
  });
}
