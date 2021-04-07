import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import { AuthReducer } from './reducers/AuthReducer';
import { DistrictReducer } from './reducers/DistrictReducer';
import { UserReducer } from './reducers/UserReducer';
import { AdminReducer } from './reducers/AdminReducer';

export default (history) =>
  combineReducers({
    router: connectRouter(history),
    auth: AuthReducer,
    district: DistrictReducer,
    admin: AdminReducer,
    user: UserReducer,
  });
