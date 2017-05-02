import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/App';
import Signup from './components/authentication/Signup/Signup';
import Login from './components/authentication/Signin';
import DashBoard from './components/Dashboard';
import DocEditor from './components/Documents/DocEditor';
import ErrorPage from './views/Error';
import UserManagement from './components/admin/UserManagement/UserManagement';
import DocManager from './components/admin/DocManager/DocManager';
import RoleManager from './components/admin/RoleManager/RoleManager';
import { authenticate } from './auth';


export default (

  <Route path="/" component={App} >
    <IndexRoute component={DashBoard} onEnter={authenticate} />
    <Route path="/login" component={Login} />
    <Route path="/signup" component={Signup} />
    <Route path="/editor" component={DocEditor} onEnter={authenticate} />
    <Route path="/documents" component={DocManager} />
    <Route path="/roles" component={RoleManager} />
    <Route path="/users" component={UserManagement} />
    <Route path="*" component={ErrorPage} />
  </Route>
);

