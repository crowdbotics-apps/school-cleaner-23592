import { all, call, put, takeLatest } from 'redux-saga/effects';
import Cookies from 'js-cookie';
import { Axios } from '../../api/axios';
import { getSimplifiedError } from '../../utils/error';
import {
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_ERROR,
  FORGOT_PASSWORD_ERROR,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  LOGIN_ERROR,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  CHANGE_PASSWORD_ERROR,
  CHANGE_PASSWORD_REQUEST,
  CHANGE_PASSWORD_SUCCESS,
} from '../reducers/AuthReducer';

async function signup({ first_name,last_name,email,phone_no,password,confirm_password,employer_code }) {
  return await Axios.post('/rest-auth/registration/', {
    first_name,
    last_name,
    email,
    phone_no,
    password,
    confirm_password,
    employer_code
  });
}
function* handleSignup({ payload }) {
  try {
    const response = yield call(signup, payload);
    // console.log('response', response);
    if (response) {
      yield put({
        type: SIGNUP_SUCCESS,
      });
    }
  } catch (error) {
    yield put({
      type: SIGNUP_ERROR,
      error: getSimplifiedError(error),
    });
  }
}

async function login({ email, password }) {
  return await Axios.post('/rest-auth', {
    username: email,
    password,
  });
}

function* handleLogin({ payload }) {
  try {
    const response = yield call(login, payload);
    // console.log('response :>> ', response);
    if (response.token) {
      const options = { path: '/' };
      Cookies.set('token', response.token, options);
      yield put({
        type: LOGIN_SUCCESS,
      });
    }
  } catch (error) {
    yield put({
      type: LOGIN_ERROR,
      error: getSimplifiedError(error),
    });
  }
}

async function forgotPassword({ email, reset_url }) {
  // return await Axios.post('/password-reset/', {
  //   email,
  //   reset_url,
  // });
}
function* handleForgotPassword({ payload }) {
  try {
    const { data, status } = yield call(forgotPassword, payload);
    if (status === 200 && data.status === 'OK') {
      yield put({
        type: FORGOT_PASSWORD_SUCCESS,
      });
    }
  } catch (error) {
    yield put({
      type: FORGOT_PASSWORD_ERROR,
      error: getSimplifiedError(error),
    });
  }
}

async function changePassword({ token, password }) {
  // return await Axios.post('/password-reset/confirm/', {
  //   token,
  //   password,
  // });
}
function* handleResetPassword({ payload }) {
  try {
    const { status } = yield call(changePassword, payload);
    if (status === 200) {
      yield put({
        type: CHANGE_PASSWORD_SUCCESS,
      });
    }
  } catch (error) {
    yield put({
      type: CHANGE_PASSWORD_ERROR,
      error: getSimplifiedError(error),
    });
  }
}

export default all([
  takeLatest(SIGNUP_REQUEST, handleSignup),
  takeLatest(LOGIN_REQUEST, handleLogin),
  takeLatest(FORGOT_PASSWORD_REQUEST, handleForgotPassword),
  takeLatest(CHANGE_PASSWORD_REQUEST, handleResetPassword),
]);