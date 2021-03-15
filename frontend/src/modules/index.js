import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

// we will connect our reducers here
import { AuthReducer } from './reducers/AuthReducer';

export default (history) =>
  combineReducers({
    router: connectRouter(history),
    auth: AuthReducer,
  });
