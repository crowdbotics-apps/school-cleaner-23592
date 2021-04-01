import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

// we will connect our reducers here
import { AuthReducer } from './reducers/AuthReducer';
import { DistrictReducer } from './reducers/DistrictReducer';

export default (history) =>
  combineReducers({
    router: connectRouter(history),
    auth: AuthReducer,
    district: DistrictReducer,
  });
