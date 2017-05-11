import axios from 'axios';
import types from './actionTypes';


export function loadRole(roles) {
  return {
    type: types.LOAD_ROLE,
    roles
  };
}

export function setCurrentRole(id) {
  return {
    type: types.SET_CURRENT,
    id
  };
}

export function deleteCurrentRole() {
  return {
    type: types.DELETE_ROLE,
  };
}

export function loadRoles() {
  return dispatch => axios.get('/api/roles').then((res) => {
    dispatch(loadRole(res.data.roles));
  });
}

export function saveRole(role) {
  return dispatch => axios.post('/roles', role).then(() => {
    dispatch(loadRoles());
  });
}

export function updateRole(role) {
  return (dispatch, getState) => {
    const roleId = getState().currentlySelected.selectedRole;
    return axios.put(`/roles/${roleId}`, role).then(() => {
      dispatch(loadRoles());
    });
  };
}

export function deleteRole(id) {
  return dispatch => axios.delete(`/roles/${id}`).then(() => {
    dispatch(loadRoles());
  });
}
