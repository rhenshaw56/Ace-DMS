import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/App';
import About from './views/about';
import Signup from './components/authentication/Signup/Signup';
import Login from './components/authentication/Signin';
import DashBoard from './components/Dashboard';
import DocEditor from './components/Documents/DocEditor';
import Profile from './views/Profile';
import Role from './views/Role';
import ErrorPage from './views/Error';
import { authenticate, block } from './auth';


// import { authenticate } from '../utils/auth';
export default (
  
  <Route path="/" component={App} >
    <IndexRoute component={DashBoard} />
    <Route path="/login" component={Login} />
    <Route path="/signup" component={Signup} />
    <Route path="/editor" component={DocEditor} />
    <Route path="/about" component={About} />
    <Route path="*" component={ErrorPage} />
  </Route>
);

