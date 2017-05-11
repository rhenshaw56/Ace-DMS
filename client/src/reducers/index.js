import { combineReducers } from 'redux';
import manageUsers from './user';
import auth from './auth';
import manageDocuments from './document';
import manageRoles from './role';
import manageSearch from './search';



const rootReducer = combineReducers({
  // Add all reducers here
  auth,
  manageUsers,
  manageDocuments,
  manageSearch,
  manageRoles
});

export default rootReducer;
