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
  DELETE_SCHOOL_ERROR,
  UPDATE_SCHOOL_REQUEST,
  UPDATE_SCHOOL_SUCCESS,
  UPDATE_SCHOOL_ERROR,
  CREATE_CLEANUP_REQUEST,
  CREATE_CLEANUP_SUCCESS,
  CREATE_CLEANUP_ERROR,
  FETCH_SCHOOLS_CLEANING_DETAILS,
  FETCH_SCHOOLS_CLEANING_DETAILS_SUCCESS,
  FETCH_SCHOOLS_CLEANING_DETAILS_ERROR,
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
        payload: response,
      });
    }
  } catch (error) {
    yield put({
      type: FETCH_SCHOOLS_ERROR,
      error: getSimplifiedError(error),
    });
  }
}

async function createSchool({ name, image, district }) {
  return await Axios.post(
    `/api/v1/school/`,
    {
      name,
      image,
      district,
    },
    getHeader()
  );
}

function* handleCreateSchool({ payload }) {
  try {
    const response = yield call(createSchool, payload);
    if (response) {
      payload.modal(true);
      payload.schoolId(response.id);
      const school = yield call(fetchSchools, payload.district);
      // yield put({
      //   type: CREATE_SCHOOL_SUCCESS,
      //   payload: response,
      // });
      yield put({
        type: FETCH_SCHOOLS_SUCCESS,
        payload: school,
      });
    }
  } catch (error) {
    yield put({
      type: CREATE_SCHOOL_ERROR,
      error: getSimplifiedError(error),
    });
  }
}

async function createCleanup(data) {
  return await Axios.post(
    `/api/v1/equipment/`,
    {
      dust_cleaning: data.dust_cleaning,
      dust_cleaning_size: data.dust_cleaning_size,
      floor_burnishing: data.floor_burnishing,
      floor_burnishing_size: data.floor_burnishing_size,
      floor_mopping: data.floor_mopping,
      floor_mopping_size: data.floor_mopping_size,
      misting_table: data.misting_table,
      cleaning_table: data.cleaning_table,
      school: data.school,
    },
    getHeader()
  );
}

function* handleCreateCleanup({ payload }) {
  debugger;
  try {
    const response = yield call(createCleanup, payload);
    if (response) {
      // const school = yield call(fetchSchools, payload.district);
      yield put({
        type: CREATE_CLEANUP_SUCCESS,
        payload: response,
      });
      // yield put({
      //   type: FETCH_SCHOOLS_SUCCESS,
      //   payload: school,
      // });
    }
  } catch (error) {
    yield put({
      type: CREATE_SCHOOL_ERROR,
      error: getSimplifiedError(error),
    });
  }
}

async function fetchCleaningDetails(id) {
  return await Axios.get(`/api/v1/equipment/${id}`, getHeader());
}

function* handleFetchSchoolCleaningDetails(data) {
  debugger;
  try {
    const response = yield call(fetchCleaningDetails, data.payload);
    if (response) {
      yield put({
        type: FETCH_SCHOOLS_CLEANING_DETAILS_SUCCESS,
        payload: response,
      });
    }
  } catch (error) {
    yield put({
      type: FETCH_SCHOOLS_CLEANING_DETAILS_ERROR,
      error: getSimplifiedError(error),
    });
  }
}
async function editSchool(data) {
  return await Axios.patch(`/api/v1/school/${data.school}/`, data.data, getHeader());
}

function* handleEditSchool({ payload }) {
  try {
    const response = yield call(editSchool, payload);
    const allSchool = yield call(fetchSchools, payload.data.district);
    if (response) {
      yield put({
        type: FETCH_SCHOOLS_SUCCESS,
        payload: allSchool,
      });
    }
  } catch (error) {
    yield put({
      type: FETCH_REPORT_ERROR,
      error: getSimplifiedError(error),
    });
  }
}

async function fetchReports(schoolId) {
  return await Axios.get(`/api/v1/school/${schoolId}/report/`, getHeader());
}

function* handleFetchReports(data) {
  try {
    const response = yield call(fetchReports, data.payload);
    if (response) {
      yield put({
        type: FETCH_REPORT_SUCCESS,
        payload: response,
      });
    }
  } catch (error) {
    yield put({
      type: FETCH_REPORT_ERROR,
      error: getSimplifiedError(error),
    });
  }
}

async function deleteSchool(schoolId) {
  return await Axios.delete(`/api/v1/school/${schoolId}/`, getHeader());
}
function* handelDeleteSchool(data) {
  try {
    const response = yield call(deleteSchool, data.payload.id);

    const school = yield call(fetchSchools, data.payload.district);
    // yield put({
    //   type: CREATE_SCHOOL_SUCCESS,
    //   payload: response,
    // });
    yield put({
      type: FETCH_SCHOOLS_SUCCESS,
      payload: school,
    });
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
  takeLatest(UPDATE_SCHOOL_REQUEST, handleEditSchool),
  takeLatest(CREATE_CLEANUP_REQUEST, handleCreateCleanup),
  takeLatest(FETCH_SCHOOLS_CLEANING_DETAILS, handleFetchSchoolCleaningDetails),
]);
