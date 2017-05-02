import { combineReducers } from 'redux';
import manageUsers from './user';
import auth from './auth';
import manageDocuments from './document';
import manageRoles from './role';



const rootReducer = combineReducers({
  // Add all reducers here
  auth,
  manageUsers,
  manageDocuments,
  manageRoles,
});

export default rootReducer;
