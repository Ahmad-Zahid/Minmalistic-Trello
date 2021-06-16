// Packages
import { combineReducers } from 'redux';

// Reducers
import userReducer from './users/reducer';

export default combineReducers({
  users: userReducer,
});
