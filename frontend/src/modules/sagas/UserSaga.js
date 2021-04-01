import { all, call, put, takeLatest } from 'redux-saga/effects';

import { Axios } from '../../api/axios';
import { getSimplifiedError } from '../../utils/error';
import {
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_ERROR,
} from '../reducers/UserReducer';

async function getUserSata() {
  return await Axios.get('/user/');
}
function* handleGetUserData() {
  try {
    const response = yield call(getUserSata);
    console.log('response', response);
    if (response) {
      yield put({
        type: GET_USER_SUCCESS,
      });
    }
  } catch (error) {
    yield put({
      type: GET_USER_ERROR,
      error: getSimplifiedError(error),
    });
  }
}

export default all([takeLatest(GET_USER_REQUEST, handleGetUserData)]);
