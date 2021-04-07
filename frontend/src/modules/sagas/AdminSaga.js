import Cookies from 'js-cookie';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import { Axios } from '../../api/axios';
import { getSimplifiedError } from '../../utils/error';
import { getHeader } from '../../utils/utility';
import {
  FETCH_ADMINS_REQUEST,
  FETCH_ADMINS_SUCCESS,
  FETCH_ADMINS_ERROR
} from '../reducers/AdminReducer';

async function fetchAdmin() {
  return await Axios.get(`/api/v1/admin-users/`, getHeader());
}

function* handleFetchAdmins() {
  try {
    const response = yield call(fetchAdmin);
    if (response) {
      yield put({
        type: FETCH_ADMINS_SUCCESS,
        payload: response
      });
    }
  } catch (error) {
    yield put({
      type: FETCH_ADMINS_ERROR,
      error: getSimplifiedError(error),
    });
  }
}

export default all([
  takeLatest(FETCH_ADMINS_REQUEST, handleFetchAdmins)
]);
