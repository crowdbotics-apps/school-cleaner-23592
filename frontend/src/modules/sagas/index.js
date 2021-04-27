import { all } from 'redux-saga/effects';
import AuthSaga from './AuthSaga';
import DistrictSaga from './DistrictSaga';
import AdminSaga from './AdminSaga';
import SchoolSaga from './SchoolSaga';
import SectionSaga from './SectionSaga'; 

export function* sagas() {
  yield all([AuthSaga, DistrictSaga, AdminSaga, SchoolSaga, SectionSaga]);
}
