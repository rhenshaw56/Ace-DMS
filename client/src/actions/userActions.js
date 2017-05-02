import axios from 'axios';
import jwtDecode from 'jwt-decode';
import toastr from 'toastr';
import { browserHistory } from 'react-router';
import types from './actionTypes';
import { setAuthorizationToken } from '../auth';



export function loadUser(users) {
  return {
    type: types.INIT_USERS,
    users
  };
}


export function loadAllUsers(users) {
  return {
    type: types.INIT_ALL_USERS,
    users
  };
}


export function setCurrentUser(user) {
  return {
    type: types.SETUP_USER,
    user
  };
}


export function setSelectedUser(id) {
  return {
    type: types.SET_SELECTED_USER,
    id
  };
}


export function displaySelectedUser(id) {
  return {
    type: types.DISPLAY_USER,
    id
  };
}


export function deleteSelectedUser() {
  return {
    type: types.DELETE_USER,
  };
}


export function createUser(user) {
  return { type: types.SIGNUP_USER, user };
}


export function getUser(name) {
  return { type: types.SEARCH_ALL_USERS, name };
}


export function updateUser(user) {
  return {
    type: types.EDIT_USER,
    user
  };
}


export function loginUser(token) {
  localStorage.setItem('token', token);
  return {
    type: types.LOGIN_USER,
    payload: {
      token
    }
  };
}


export function getUserAuth(user) {
  return {
    type: types.GET_USER_AUTH,
    user
  };
}


export function loginUserFailure() {
  return {
    type: types.USER_LOGIN_FAILURE
  };
}


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


export function loadUsers(limit, offset) {
  return dispatch => axios.get(`/api/users?limit=${limit}&offset=${offset}`).then((res) => {
    dispatch(loadUser(res.data));
  });
}


export function initUsers() {
  return dispatch => axios.get('/api/users').then((res) => {
    dispatch(loadAllUsers(res.data.users));
  });
}


export function getAuthUser(id) {
  return dispatch => axios.get(`/api/users/${id}`).then((res) => {
    dispatch(getUserAuth(res.data.user));
  });
}


export function updateUserAdmin(user, id) {
  return dispatch => axios.put(`/api/users/${id}`, user).then(() => {
    dispatch(loadUsers());
  });
}


export function editUser(user, id) {
  return dispatch => axios.put(`/api/users/${id}`, user).then(() => {
    dispatch(getUserAuth(id));
  });
}


export function signupAdmin(user) {
  return dispatch => axios.post('/api/users', user)
    .then(() => {
      dispatch(loadUsers());
    });
}

export function findUser(id) {
  return dispatch => axios.get(`/api/users/${id}`)
    .then((res) => {
      dispatch(getUser(res.data.user.name));
    });
}

export function deleteUser(id) {
  return dispatch => axios.delete(`/api/users/${id}`)
    .then(() => {
      dispatch(loadUsers());
    });
}

export function isUser(identifier) {
  return () => axios.get(`/api/search/users?q=${identifier}`);
}

export function login(user) {
  return dispatch => axios.post('/api/users/login', user)
  .then((response) => {
    if (response.status === 200) {
      const token = response.data.token;
      localStorage.setItem('jwtToken', token);
      axios.defaults.headers.common.Authorization = token;
      dispatch(setCurrentUser(response.data));
      browserHistory.push('/');
    } else if (response.status === 401) {
      return toastr.error('User does not exist!');
    } else {
      return toastr.error('Invalid Login details!');
    }  
  });
}


export function logout() {
  return (dispatch) => {
    const token = localStorage.getItem('jwtToken');
    localStorage.removeItem('jwtToken');
    setAuthorizationToken(false);
    dispatch(setCurrentUser({}));
    return axios.post('/api/users/logout', token);
  };
}
