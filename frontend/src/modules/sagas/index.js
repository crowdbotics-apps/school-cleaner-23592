import { all } from 'redux-saga/effects';
import AuthSaga from './AuthSaga';
import DistrictSaga from './DistrictSaga';

export function* sagas() {
  yield all([AuthSaga, DistrictSaga]);
}
