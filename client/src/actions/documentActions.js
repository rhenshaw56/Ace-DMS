import axios from 'axios';
import { browserHistory } from 'react-redux';
import types from './actionTypes';

export function loadDocuments(documents) {
  return { type: types.LOAD_DOCUMENT, documents };
}

export function createDocument(document) {
  return {
    type: types.CREATE_DOCUMENT,
    document
  };
}

export function setDocument(id) {
  return {
    type: types.SETUP_DOCUMENT,
    id
  };
}

export function deleteDocument() {
  return {
    type: types.DELETE_DOCUMENT,
  };
}
export function editDocument(document) {
  return {
    type: types.EDIT_DOCUMENT,
    document
  };
}

export function displayCurrentDocument(id) {
  return {
    type: types.DISPLAY_DOCUMENT,
    id
  };
}


export function loadUserDocument() {
  return (dispatch, getState) => axios.get(
      `/api/users/${getState().auth.user.id}/documents`).then((res) => {
        dispatch(loadDocuments(res.data.documents));
      });
}


export function loadAllDocument() {
  return dispatch => axios.get('/api/documents').then((res) => {
    dispatch(loadDocuments(res.data.documents));
  });
}

export function saveDocument(document) {
  return dispatch => axios.post('/api/documents/', document).then(() => {
    dispatch(deleteDocument());
  });
}

export function updateDocument(document) {
  return dispatch => axios.put(`/api/documents/${document.id}`, document)
  .then(() => {
    dispatch(loadUserDocument());
  });
}


export function deleteDocumentById(id) {
  return dispatch => axios.delete(`/api/documents/${id}`).then(() => {
    dispatch(loadAllDocument());
  });
}
