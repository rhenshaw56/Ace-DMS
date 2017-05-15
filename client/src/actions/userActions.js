import axios from 'axios';
import toastr from 'toastr';
import { browserHistory } from 'react-router';
import types from './actionTypes';
import { setAuthorizationToken } from '../auth';


/**
 * Function to dispatch action type of INIT_USERS
 * @export
 * @param {Array} users
 * @returns {Object} action
 */
export function loadUser(users) {
  return {
    type: types.INIT_USERS,
    users
  };
}

/**
 * Function to dispatch action type of INIT_ALL_USERS
 * @export
 * @param {Object} users
 * @returns {Object} action
 */
export function loadAllUsers(users) {
  return {
    type: types.INIT_ALL_USERS,
    users
  };
}

/**
 * Function to dispatch action type of SETUP_USER
 * @export
 * @param {Object} user
 * @returns {Object} action
 */
export function setCurrentUser(user) {
  return {
    type: types.SETUP_USER,
    user
  };
}

/**
 * Function to dispatch action type of SET_SELECTED_USER
 * @export
 * @param {Number} id - userId
 * @returns {Object} action
 */
export function setSelectedUser(id) {
  return {
    type: types.SET_SELECTED_USER,
    id
  };
}

/**
 * Function to dispatch action type of DISPLAY_USER
 * @export
 * @param {Object} user
 * @returns {Object} action
 */
export function displayUser(user) {
  return {
    type: types.DISPLAY_USER,
    user
  };
}

/**
 * Function to dispatch action type of DELETE_USER
 * @export
 * @param {Number} id - userId
 * @returns {Object} action
 */
export function deleteSelectedUser(id) {
  return {
    type: types.DELETE_USER,
    id
  };
}

/**
 * Function to dispatch action type of SIGNUP_USER
 * @export
 * @param {Object} user
 * @returns {Object} action
 */
export function createUser(user) {
  return { type: types.SIGNUP_USER, user };
}

/**
 * Function to dispatch action type of SEARCH_ALL_USERS
 * @export
 * @param {Object} email - user email
 * @returns {Object} action
 */
export function getUser(email) {
  return { type: types.SEARCH_ALL_USERS, email };
}

/**
 * Function to dispatch action type of EDIT_USER
 * @export
 * @param {Object} user
 * @returns {Object} action
 */
export function updateUser(user) {
  return {
    type: types.EDIT_USER,
    user
  };
}

/**
 * Function to dispatch action type of LOGIN_USER
 * @export
 * @param {Object} token
 * @returns {Object} action
 */
export function loginUser(token) {
  localStorage.setItem('token', token);
  return {
    type: types.LOGIN_USER,
    payload: {
      token
    }
  };
}

/**
 * Function to dispatch action type of GET_USERS
 * @export
 * @param {Object} users
 * @returns {Object} action
 */
export function populateSearchList(users) {
  return {
    type: types.GET_USERS,
    users
  };
}

/**
 * Async Function to handle signup request
 * @export
 * @param {Object} user
 * @returns {Object} dispatch
 */
export function signup(user) {
  return dispatch => axios.post('/api/users', user)
    .then((res) => {
      const token = res.data.token;
      dispatch(createUser(res.data));
      localStorage.setItem('jwtToken', token);
      setAuthorizationToken(token);
      axios.defaults.headers.common.Authorization = token;
      dispatch(setCurrentUser(res.data));
    });
}

/**
 * Async Function to handle loading of all users to the store
 * @export
 * @param {Number} limit
 * @param {Number} offset
 * @returns {Object} action
 */
export function loadUsers(limit, offset) {
  return dispatch => axios.get(`/api/users?limit=${limit}&offset=${offset}`).then((res) => {
    dispatch(loadUser(res.data));
  });
}

/** 
 * Async Function to handle loading of all users
 * @export
 * @param {Number} id
 * @returns {Object} dispatch
 */
export function initUsers() {
  return dispatch => axios.get('/api/users').then((res) => {
    dispatch(loadAllUsers(res.data.users));
  });
}

/**
 * Async Function to handle initailization of all users
 * @export
 * @param {None} none
 * @returns {Object} dispatch
 */
export function getUsers() {
  return dispatch => axios.get('/api/initUsers').then((res) => {
    dispatch(populateSearchList(res.data.users));
  });
}

/**
 * Async Function to handle updates of user details
 * @export
 * @param {Object} user
 * @param {Number} id
 * @returns {Object} dispatch
 */
export function editUser(user, id) {
  return dispatch => axios.put(`/api/users/${id}`, user).then((response) => {
    dispatch(updateUser(response.data));
    // dispatch(setCurrentUser(response.data));
  });
}

/**
 * Async Function to handle searching of a user by id
 * @export
 * @param {Number} id
 * @returns {Object} dispatch
 */
export function findUser(id) {
  return dispatch => axios.get(`/api/users/${id}`)
    .then((res) => {
      dispatch(getUser(res.data.user.name));
    });
}
/**
 * Async Function to handle deletion of a user
 * @export
 * @param {Number} id
 * @returns {Object} dispatch
 */
export function deleteUser(id) {
  return dispatch => axios.delete(`/api/users/${id}`)
    .then(() => {
      dispatch(deleteSelectedUser(id));
    });
}
/**
 * Async Function to handle user login
 * @export
 * @param {Object} user
 * @returns {Object} dispatch
 */
export function login(user) {
  return dispatch => axios.post('/api/users/login', user)
  .then((response) => {
    if (response.status === 200) {
      const token = response.data.token;
      localStorage.setItem('jwtToken', token);
      axios.defaults.headers.common.Authorization = token;
      console.log('lact', response.data);
      dispatch(setCurrentUser(response.data));
      browserHistory.push('/');
    } else if (response.status === 401) {
      return toastr.error('User does not exist!');
    } else {
      return toastr.error('Invalid Login details!');
    }
  }).catch(() => {
    return toastr.error('Invalid Login details!');
  });
}

export function initApp(user) {
  return dispatch => dispatch(init(user));
}
export function init(user) {
  return {
    type: 'INIT_APP',
    user
  };
}

/**
 * Function to handle logout
 * @export
 * @param {Object} user
 * @returns {Object} dispatch
 */
export function logout() {
  return (dispatch) => {
    const token = localStorage.getItem('jwtToken');
    localStorage.removeItem('jwtToken');
    setAuthorizationToken(false);
    dispatch(setCurrentUser({}));
  };
}
