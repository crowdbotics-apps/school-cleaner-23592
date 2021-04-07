import { all, call, put, takeLatest } from 'redux-saga/effects';
import { Axios } from '../../api/axios';
import { getSimplifiedError } from '../../utils/error';
import { getHeader } from '../../utils/utility';
import {
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_ERROR,
  FETCH_USERS_REQUEST,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_ERROR,
} from '../reducers/UserReducer';

async function getUserData({ id }) {
  return await Axios.get(`/rest-auth/user/${id}/`, getHeader());
}

function* handleGetUserData({ payload }) {
  try {
    const response = yield call(getUserData, payload);
    if (response) {
      yield put({
        type: GET_USER_SUCCESS,
        payload: response
      });
    }
  } catch (error) {
    yield put({
      type: GET_USER_ERROR,
      error: getSimplifiedError(error),
    });
  }
}

async function fetchUsers() {
  return await Axios.get(`/rest-auth/user/`, getHeader());
}

function* handleFetchUsers({ payload }) {
  try {

    const response = yield call(fetchUsers, payload);
    if (response) {
      yield put({
        type: FETCH_USERS_SUCCESS,
        payload: response
      });
    }
  } catch (error) {
    yield put({
      type: FETCH_USERS_ERROR,
      error: getSimplifiedError(error),
    });
  }
}

export default all(
  [takeLatest(GET_USER_REQUEST, handleGetUserData)],
  [takeLatest(FETCH_USERS_REQUEST, handleFetchUsers)]
);
