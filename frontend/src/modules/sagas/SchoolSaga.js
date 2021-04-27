import Cookies from 'js-cookie';
import { all, call, put, takeLatest } from 'redux-saga/effects';

import { Axios } from '../../api/axios';
import { getSimplifiedError } from '../../utils/error';
import { getHeader } from '../../utils/utility';
import { DELETE_DISTRICT_ERROR } from '../reducers/DistrictReducer';
import {
  FETCH_SCHOOLS_REQUEST,
  FETCH_SCHOOLS_SUCCESS,
  FETCH_SCHOOLS_ERROR,
  CREATE_SCHOOL_REQUEST,
  CREATE_SCHOOL_SUCCESS,
  CREATE_SCHOOL_ERROR,
  FETCH_REPORT_REQUEST,
  FETCH_REPORT_SUCCESS,
  FETCH_REPORT_ERROR,
  DELETE_SCHOOL_REQUEST,
  DELETE_SCHOOL_SUCCESS,
  DELETE_SCHOOL_ERROR
} from '../reducers/SchoolReducer';

async function fetchSchools(districtId) {
  return await Axios.get(`/api/v1/school/?district=${districtId}`, getHeader());
}

function* handleFetchSchools(data) {
  try {
    const response = yield call(fetchSchools, data.payload);
    if (response) {
      yield put({
        type: FETCH_SCHOOLS_SUCCESS,
        payload: response
      });
    }
  } catch (error) {
    yield put({
      type: FETCH_SCHOOLS_ERROR,
      error: getSimplifiedError(error),
    });
  }
};

async function createSchool({ name, image, district }) {
  return await Axios.post(`/api/v1/school/`, {
    name,
    image,
    district
  }, getHeader());
};

function* handleCreateSchool({ payload }) {
  try {
    const response = yield call(createSchool, payload);
    if (response) {
      yield put({
        type: CREATE_SCHOOL_SUCCESS,
        payload: response
      });
    }
  } catch (error) {
    yield put({
      type: CREATE_SCHOOL_ERROR,
      error: getSimplifiedError(error),
    });
  }
};

async function fetchReports(schoolId) {
  return await Axios.get(`/api/v1/school/${schoolId}/report/`, getHeader());
}

function* handleFetchReports(data) {
  try {
    const response = yield call(fetchReports, data.payload);
    if (response) {
      yield put({
        type: FETCH_REPORT_SUCCESS,
        payload: response
      });
    }
  } catch (error) {
    yield put({
      type: FETCH_REPORT_ERROR,
      error: getSimplifiedError(error),
    });
  }
};

async function deleteSchool(schoolId) {
  return await Axios.delete(`/api/v1/school/${schoolId}/`, getHeader());
}
function* handelDeleteSchool(data) {
  try {
    const response = yield call(deleteSchool, data.payload);
    if (response) {
      yield put({
        type: DELETE_SCHOOL_SUCCESS,
        payload: response
      });
    }
  } catch (error) {
    yield put({
      type: DELETE_SCHOOL_ERROR,
      error: getSimplifiedError(error),
    });
  }
}

export default all([
  takeLatest(FETCH_SCHOOLS_REQUEST, handleFetchSchools),
  takeLatest(CREATE_SCHOOL_REQUEST, handleCreateSchool),
  takeLatest(FETCH_REPORT_REQUEST, handleFetchReports),
  takeLatest(DELETE_SCHOOL_REQUEST, handelDeleteSchool),

]);


