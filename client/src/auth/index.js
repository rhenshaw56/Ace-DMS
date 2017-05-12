import axios from 'axios';
import { browserHistory } from 'react-router';

export const retrieveToken = () => localStorage.token;

export const currentUser = () => JSON.parse(localStorage.user);

export const isAuthenticated = () => {
  if (localStorage.getItem('jwtToken') !== null) {
    return true;
  }
  return false;
};
export const authenticate = (nextState, replace, callback) => {
  if (!isAuthenticated()) {
    replace('/login');
  }
  return callback();
};
export const authorizeUser = (token) => {
  if (token) {
    axios.defaults.headers.common.Authorization = token;
  } else {
    delete axios.defaults.headers.common.Authorization;
  }
};
export const setAuthorizationToken = (token) => {
  if (token) {
    axios.defaults.headers.common.Authorization = token;
  } else {
    delete axios.defaults.headers.common.Authorization;
  }
};


