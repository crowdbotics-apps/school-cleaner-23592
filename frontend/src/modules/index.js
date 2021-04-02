import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import { AuthReducer } from './reducers/AuthReducer';
import { DistrictReducer } from './reducers/DistrictReducer';
import { UserReducer } from './reducers/UserReducer';

export default (history) =>
  combineReducers({
    router: connectRouter(history),
    auth: AuthReducer,
    district: DistrictReducer,
    user: UserReducer,
  });
