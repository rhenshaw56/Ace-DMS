import axios from 'axios';
import types from './actionTypes';

/**
 * Function to dispatch action type of LOAD_ROLE
 * @export
 * @param {Array} roles
 * @returns {Object} action
 */
export function loadRole(roles) {
  return {
    type: types.LOAD_ROLE,
    roles
  };
}
/**
 * Function to dispatch action type of DELETE_ROLE
 * @export
 * @param {Array} roles
 * @returns {Object} action
 */
export function deleteCurrentRole() {
  return {
    type: types.DELETE_ROLE,
  };
}

/**
 * Function to dispatch action type of DELETE_ROLE
 * @export
 * @param {Array} roles
 * @returns {Object} action
 */
export function loadRoles() {
  return dispatch => axios.get('/api/roles').then((res) => {
    dispatch(loadRole(res.data.roles));
  });
}

/**
 * Async Function to handle saving of new roles
 * @export
 * @param {Object} role
 * @returns {Object} dispatch
 */
export function saveRole(role) {
  return dispatch => axios.post('api/roles', role).then((response) => {
    if (response.data) {
      dispatch(loadRoles());
    }
  });
}

/**
 * Async Function to handle updating roles
 * @export
 * @param {Number} roleId
 * @returns {Object} dispatch
 */
export function updateRole(roleId) {
  return dispatch => axios.put(`/roles/${roleId}`).then(() => {
    dispatch(loadRoles());
  });
}

/**
 * Async Function to handle deletion of roles
 * @export
 * @param {Number} id
 * @returns {Object} dispatch
 */
export function deleteRole(id) {
  return dispatch => axios.delete(`/api/roles/${id}`).then(() => {
    dispatch(loadRoles());
  });
}
