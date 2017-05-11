import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/App';
import Signup from './components/authentication/Signup/Signup';
import Login from './components/authentication/Signin';
import DashBoard from './components/Dashboard';
import Editor from './components/Documents/Editor';
import ErrorPage from './views/Error';
import UserManagement from './components/admin/UserManagement/UserManagement';
import DocumentManager from './components/admin/DocumentManager/DocumentManager';
import RoleManager from './components/admin/RoleManager/RoleManager';
import Profile from './components/Profile';
import { authenticate } from './auth';


export default (

  <Route path="/" component={App} >
    <IndexRoute component={DashBoard} onEnter={authenticate} />
    <Route path="/login" component={Login} />
    <Route path="/signup" component={Signup} />
    <Route path="/editor" component={Editor} onEnter={authenticate} />
    <Route path="/documents" component={DocumentManager} />
    <Route path="/users" component={UserManagement} />
    <Route path="/roles" component={RoleManager} />
    <Route path="/profile" component={Profile} />
    <Route path="/privateDocs" component={DashBoard} />
    <Route path="/profile" component={DashBoard} />
    <Route path="/roleDocs" component={DashBoard} />
    <Route path="*" component={ErrorPage} />
  </Route>
);

