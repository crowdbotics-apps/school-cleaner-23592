import Cookies from 'js-cookie';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import { Axios } from '../../api/axios';
import { getSimplifiedError } from '../../utils/error';
import { getHeader } from '../../utils/utility';
import {
  FETCH_ADMINS_REQUEST,
  FETCH_ADMINS_SUCCESS,
  FETCH_ADMINS_ERROR,
  DISTRIC_EMPLOYEES_REQUEST,
  DISTRIC_EMPLOYEES_SUCCESS,
  DISTRIC_EMPLOYEES_FAILURE
} from '../reducers/AdminReducer';

async function fetchAdmin() {
  return await Axios.get(`/api/v1/admin-users/`, getHeader());
}

async function getDistrictEmployeesAPI( id ) {
  console.log('idddddddddddddddd', id);
  return await Axios.get(`/api/v1/admin-users/?district=${id}`, getHeader());
}

function* getDistricEmployees({ payload }) {
  console.log('payloadddd', payload);
  try {
    const response = yield call(getDistrictEmployeesAPI, payload);
    console.log('responseeeee', response);
    if (response) {
      yield put({
        type: DISTRIC_EMPLOYEES_SUCCESS,
        payload: response
      });
    }
  } catch (error) {
    console.log('errrorrr', error);
    yield put({
      type: DISTRIC_EMPLOYEES_FAILURE,
      error: getSimplifiedError(error),
    });
  }
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
  takeLatest(DISTRIC_EMPLOYEES_REQUEST, getDistricEmployees),
  takeLatest(FETCH_ADMINS_REQUEST, handleFetchAdmins)
]);
