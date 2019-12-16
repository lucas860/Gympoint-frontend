import { combineReducers } from 'redux';

import auth from './auth/reducer';
import user from './user/reducer';
import help from './help/reducer';

export default combineReducers({
  auth,
  user,
  help,
});
