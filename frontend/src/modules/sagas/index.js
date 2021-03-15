import { all } from 'redux-saga/effects';

import AuthSaga from './AuthSaga';

export function* sagas() {
  yield all([AuthSaga]);
}
