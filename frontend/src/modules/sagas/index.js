import { all } from 'redux-saga/effects';
import AuthSaga from './AuthSaga';
import DistrictSaga from './DistrictSaga';
import AdminSaga from './AdminSaga';

export function* sagas() {
  yield all([AuthSaga, DistrictSaga, AdminSaga]);
}
