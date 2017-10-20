import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import axios from 'axios';
import { ApolloProvider, ApolloClient, createNetworkInterface } from 'react-apollo';
import 'material-ui';
import 'materialize-css';
import jwtDecode from 'jwt-decode';
import { Router, browserHistory } from 'react-router';
// import { Provider } from 'react-redux';
import 'materialize-css/dist/css/materialize.css';
import 'materialize-css/dist/js/materialize';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import configureStore from './store/configureStore';
import routes from './routes';
import { setAuthorizationToken } from './auth/';
import { setCurrentUser } from './actions/userActions';
import './style/main.scss';
import './style/google.css';

const networkInterface = createNetworkInterface({
  uri: '/graphql',
});
networkInterface.use([{
  applyMiddleware(req, next) {
    if (!req.options.headers) {
      req.options.headers = {};  // Create the header object if needed.
    }
    // get the authentication token from local storage if it exists
    const token = localStorage.getItem('token');
    req.options.headers.authorization = token || null;
    next();
  },
  applyAfterware({ response }, next) {
    console.log("respnse", response);
    next();
  }
}]);
const client = new ApolloClient({
  networkInterface,
});

const store = configureStore();


render(
  <MuiThemeProvider >
    <ApolloProvider store={store} client={client} >
      <Router history={browserHistory} routes={routes} />
    </ApolloProvider>
  </MuiThemeProvider>,
  document.getElementById('root')
);
