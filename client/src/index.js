import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import axios from 'axios';
import 'material-ui';
import 'materialize-css';
import jwtDecode from 'jwt-decode';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import configureStore from './store/configureStore';
import routes from './routes';
import { setAuthorizationToken } from './auth/';
import { setCurrentUser } from './actions/userActions';
import './style/main.scss';



const store = configureStore();

if (localStorage.jwtToken) {
  setAuthorizationToken(localStorage.jwtToken);
  axios.defaults.headers.common.Authorization = localStorage.jwtToken;
  store.dispatch(setCurrentUser(jwtDecode(localStorage.jwtToken)));
}

render(
  <MuiThemeProvider >
    <Provider store={store} >
      <Router history={browserHistory} routes={routes} />
    </Provider>
  </MuiThemeProvider>,
  document.getElementById('root')
);
