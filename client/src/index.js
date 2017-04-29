import 'babel-polyfill';
import 'react-hot-loader';
import React from 'react';
import { render } from 'react-dom';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import configureStore from './store/configureStore';
import routes from './routes';
import { setAuthorizationToken } from './auth/';
import { setCurrentUser } from './actions/userActions';
import appInit from './utils/appInit';


const store = configureStore();
// console.log(store);
// appInit(store);

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
