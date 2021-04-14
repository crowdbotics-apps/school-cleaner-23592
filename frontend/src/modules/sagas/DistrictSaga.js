import Cookies from 'js-cookie';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import { Axios } from '../../api/axios';
import { getSimplifiedError } from '../../utils/error';
import { getHeader } from '../../utils/utility';
import {
  GET_DISTRICT_REQUEST,
  GET_DISTRICT_SUCCESS,
  GET_DISTRICT_ERROR,
  UPDATE_DISTRICT_REQUEST,
  UPDATE_DISTRICT_SUCCESS,
  UPDATE_DISTRICT_ERROR,
  DELETE_DISTRICT_REQUEST,
  DELETE_DISTRICT_SUCCESS,
  DELETE_DISTRICT_ERROR,
  FETCH_DISTRICTS_REQUEST,
  FETCH_DISTRICTS_SUCCESS,
  FETCH_DISTRICTS_ERROR,
  CREATE_DISTRICT_REQUEST,
  CREATE_DISTRICT_SUCCESS,
  CREATE_DISTRICT_ERROR,
  GENERATE_CODE_REQUEST,
  GENERATE_CODE_SUCCESS,
  GENERATE_CODE_ERROR,
  // DISTRIC_EMPLOYEES_REQUEST,
  // DISTRIC_EMPLOYEES_SUCCESS,
  // DISTRIC_EMPLOYEES_FAILURE
} from '../reducers/DistrictReducer';


// async function getDistrictEmployeesAPI( id ) {
//   console.log('idddddddddddddddd', id);
//   return await Axios.get(`/api/v1/admin-users/?district=${id}`, getHeader());
// }

// function* getDistricEmployees({ payload }) {
//   console.log('payloadddd', payload);
//   try {
//     const response = yield call(getDistrictEmployeesAPI, payload);
//     console.log('responseeeee', response);
//     if (response) {
//       yield put({
//         type: DISTRIC_EMPLOYEES_SUCCESS,
//         payload: response
//       });
//     }
//   } catch (error) {
//     console.log('errrorrr', error);
//     yield put({
//       type: DISTRIC_EMPLOYEES_FAILURE,
//       error: getSimplifiedError(error),
//     });
//   }
// }

async function getDistrict({ id }) {
  return await Axios.get(`/api/v1/district/${id}/`, getHeader());
}

function* handleGetDistrict({ payload }) {
  try {
    const response = yield call(getDistrict, payload);
    if (response) {
      yield put({
        type: GET_DISTRICT_SUCCESS,
        payload: response
      });
    }
  } catch (error) {
    yield put({
      type: GET_DISTRICT_ERROR,
      error: getSimplifiedError(error),
    });
  }
}


async function updateDistrict({ id, name, logo, code, admins }) {
  return await Axios.patch(`/api/v1/district/${id}/`, {
    name,
    code,
    logo,
    admins
  }, getHeader());
}

function* handleUpdateDistrict({ payload }) {
  try {
    const response = yield call(updateDistrict, payload);
    handleFetchDistricts()
    if (response) {
      yield put({
        type: UPDATE_DISTRICT_SUCCESS,
        payload: response
      });
    }
  } catch (error) {
    yield put({
      type: UPDATE_DISTRICT_ERROR,
      error: getSimplifiedError(error),
    });
  }
}


async function deleteDistrict(id) {
  return await Axios.delete(`/api/v1/district/${id}/`, getHeader());
}

function* handleDeleteDistrict({ payload }) {
  try {
    const response = yield call(deleteDistrict, payload);
    yield put({
      type: DELETE_DISTRICT_SUCCESS,
      payload: payload
    });
  } catch (error) {
    yield put({
      type: DELETE_DISTRICT_ERROR,
      error: getSimplifiedError(error),
    });
  }
}


async function fetchDistricts() {
  return await Axios.get(`/api/v1/district/`, getHeader());
}

function* handleFetchDistricts() {
  try {
    const response = yield call(fetchDistricts);
    if (response) {
      yield put({
        type: FETCH_DISTRICTS_SUCCESS,
        payload: response
      });
    }
  } catch (error) {
    yield put({
      type: FETCH_DISTRICTS_ERROR,
      error: getSimplifiedError(error),
    });
  }
}


async function createDistrict({ name, code, logo, admins }) {
  return await Axios.post(`/api/v1/district/`, {
    name,
    code,
    logo,
    admins,
  }, getHeader());
}

function* handleCreateDistrict({ payload }) {
  try {
    const response = yield call(createDistrict, payload);
    if (response) {
      yield put({
        type: CREATE_DISTRICT_SUCCESS,
        payload: response
      });
    }
  } catch (error) {
    yield put({
      type: CREATE_DISTRICT_ERROR,
      error: getSimplifiedError(error),
    });
  }
}


async function generateCode() {
  return await Axios.get(`/api/v1/district/district-code/`, getHeader());
}

function* handleGenerateCode() {
  try {
    const response = yield call(generateCode);
    if (response) {
      yield put({
        type: GENERATE_CODE_SUCCESS,
        payload: response.code
      });
    }
  } catch (error) {
    yield put({
      type: GENERATE_CODE_ERROR,
      error: getSimplifiedError(error),
    });
  }
}

export default all([
  // takeLatest(DISTRIC_EMPLOYEES_REQUEST, getDistricEmployees),
  takeLatest(GET_DISTRICT_REQUEST, handleGetDistrict),
  takeLatest(UPDATE_DISTRICT_REQUEST, handleUpdateDistrict),
  takeLatest(DELETE_DISTRICT_REQUEST, handleDeleteDistrict),
  takeLatest(FETCH_DISTRICTS_REQUEST, handleFetchDistricts),
  takeLatest(CREATE_DISTRICT_REQUEST, handleCreateDistrict),
  takeLatest(GENERATE_CODE_REQUEST, handleGenerateCode)
]);
