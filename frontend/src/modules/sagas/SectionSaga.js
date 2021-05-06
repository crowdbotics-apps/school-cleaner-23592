import Cookies from 'js-cookie';
import { all, call, put, takeLatest } from 'redux-saga/effects';

import { Axios } from '../../api/axios';
import { getSimplifiedError } from '../../utils/error';
import { getHeader } from '../../utils/utility';
import {
  FETCH_SECTIONS_REQUEST,
  FETCH_SECTIONS_SUCCESS,
  FETCH_SECTIONS_ERROR,
  CREATE_SECTION_REQUEST,
  CREATE_SECTION_SUCCESS,
  CREATE_SECTION_ERROR,
  FETCH_ROOM_REQUEST,
  FETCH_ROOM_SUCCESS,
  FETCH_ROOM_ERROR,
  CREATE_ROOM_REQUEST,
  CREATE_ROOM_SUCCESS,
  CREATE_ROOM_ERROR,
  DELETE_SECTION_REQUEST,
  DELETE_ROOM_REQUEST,
  UPDATE_ROOM_REQUEST,
  GET_SPECIFIC_ROOM_FAIL,
  GET_SPECIFIC_ROOM_SUCCESS,
  GET_SPECIFIC_ROOM_REQUEST,
  EDIT_SECTION_REQUEST,
} from '../reducers/SectionReducer';

import { FETCH_SCHOOLS_SUCCESS, FETCH_REPORT_SUCCESS } from '../reducers/SchoolReducer';

async function fetchSchools(districtId) {
  return await Axios.get(`/api/v1/school/?district=${districtId}`, getHeader());
}

async function fetchSections(schoolId) {
  return await Axios.get(`/api/v1/section/?school=${schoolId}`, getHeader());
}

function* handleFetchSections(data) {
  try {
    const response = yield call(fetchSections, data.payload);
    if (response) {
      yield put({
        type: FETCH_SECTIONS_SUCCESS,
        payload: response,
      });
    }
  } catch (error) {
    yield put({
      type: FETCH_SECTIONS_ERROR,
      error: getSimplifiedError(error),
    });
  }
}

async function createSection({ name, school }) {
  return await Axios.post(
    `/api/v1/section/`,
    {
      name,
      school,
    },
    getHeader()
  );
}

async function fetchReports(schoolId) {
  return await Axios.get(`/api/v1/school/${schoolId}/report/`, getHeader());
}

function* handleCreateSection({ payload }) {
  try {
    const response = yield call(createSection, payload);
    if (response) {
      const getSection = yield call(fetchSections, payload.school);
      yield put({
        type: FETCH_SECTIONS_SUCCESS,
        payload: getSection,
      });

      const school = yield call(fetchSchools, payload.district);
      yield put({
        type: FETCH_SCHOOLS_SUCCESS,
        payload: school,
      });

      const report = yield call(fetchReports, payload.school);
      yield put({
        type: FETCH_REPORT_SUCCESS,
        payload: report,
      });

      yield put({
        type: CREATE_SECTION_SUCCESS,
        payload: response,
      });
    }
  } catch (error) {
    yield put({
      type: CREATE_SECTION_ERROR,
      error: getSimplifiedError(error),
    });
  }
}

async function updateSection(data) {
  return await Axios.patch(`/api/v1/section/${data.id}/`, { name: data.name }, getHeader());
}

function* handleUpdateSection(data) {
  try {
    const response = yield call(updateSection, data.payload);
    const newSection = yield call(fetchSections, data.payload.school);
    yield put({
      type: FETCH_SECTIONS_SUCCESS,
      payload: newSection,
    });
    // if (response) {
    //   yield put({
    //     type: FETCH_ROOM_SUCCESS,
    //     payload: response
    //   });
    // }
  } catch (error) {
    // yield put({
    //   type: FETCH_ROOM_ERROR,
    //   error: getSimplifiedError(error),
    // });
  }
}

async function createRoom(data) {
  return await Axios.post(`/api/v1/room/`, data, getHeader());
}

function* handleCreateRoom({ payload }) {
  try {
    const response = yield call(createRoom, payload.roomDetail);
    if (response) {
      const newRoom = yield call(fetchRoom, payload.sectionDetails.id);
      yield put({
        type: FETCH_ROOM_SUCCESS,
        payload: newRoom,
      });
      // yield put(handleFetchRoom(response.id));
      const getSection = yield call(fetchSections, payload.school);
      yield put({
        type: FETCH_SECTIONS_SUCCESS,
        payload: getSection,
      });
      const school = yield call(fetchSchools, payload.district);
      yield put({
        type: FETCH_SCHOOLS_SUCCESS,
        payload: school,
      });
      const report = yield call(fetchReports, payload.school);
      yield put({
        type: FETCH_REPORT_SUCCESS,
        payload: report,
      });

      // yield put({
      //   type: FETCH_ROOM_SUCCESS,
      //   payload: response,
      // });
    }
  } catch (error) {
    yield put({
      type: CREATE_ROOM_ERROR,
      error: getSimplifiedError(error),
    });
  }
}

async function fetchRoom(id) {
  return await Axios.get(`/api/v1/room/?section=${id}`, getHeader());
}

function* handleFetchRoom(data) {
  try {
    const response = yield call(fetchRoom, data.payload);
    if (response) {
      yield put({
        type: FETCH_ROOM_SUCCESS,
        payload: response,
      });
    }
  } catch (error) {
    yield put({
      type: FETCH_ROOM_ERROR,
      error: getSimplifiedError(error),
    });
  }
}

async function deleteSection(id) {
  return await Axios.delete(`/api/v1/section/${id}/`, getHeader());
}

function* handleDeleteSection(data) {
  try {
    const response = yield call(deleteSection, data.payload.sectionId);
    const getSection = yield call(fetchSections, data.payload.school);
    yield put({
      type: FETCH_SECTIONS_SUCCESS,
      payload: getSection,
    });
    const school = yield call(fetchSchools, data.payload.district);
    yield put({
      type: FETCH_SCHOOLS_SUCCESS,
      payload: school,
    });
    // if (response) {
    //   yield put({
    //     type: FETCH_ROOM_SUCCESS,
    //     payload: response
    //   });
    // }
  } catch (error) {
    // yield put({
    //   type: FETCH_ROOM_ERROR,
    //   error: getSimplifiedError(error),
    // });
  }
}

async function deleteRoom(id) {
  return await Axios.delete(`/api/v1/room/${id}/`, getHeader());
}

function* handleDeleteRoom(data) {
  try {
    const response = yield call(deleteRoom, data.payload.roomId);
    const newRoom = yield call(fetchRoom, data.payload.sectionDetails.id);
    yield put({
      type: FETCH_ROOM_SUCCESS,
      payload: newRoom,
    });
    const getSection = yield call(fetchSections, data.payload.school);
    yield put({
      type: FETCH_SECTIONS_SUCCESS,
      payload: getSection,
    });
    const school = yield call(fetchSchools, data.payload.district);
    yield put({
      type: FETCH_SCHOOLS_SUCCESS,
      payload: school,
    });
    const report = yield call(fetchReports, data.payload.school);
    yield put({
      type: FETCH_REPORT_SUCCESS,
      payload: report,
    });
    // if (response) {
    //   yield put({
    //     type: FETCH_ROOM_SUCCESS,
    //     payload: response
    //   });
    // }
  } catch (error) {
    // yield put({
    //   type: FETCH_ROOM_ERROR,
    //   error: getSimplifiedError(error),
    // });
  }
}

async function updateRoom(data) {
  return await Axios.patch(`/api/v1/room/${data.id}/`, data.data, getHeader());
}

function* handleUpdateRoom(data) {
  try {
    const response = yield call(updateRoom, data.payload);
    const newRoom = yield call(fetchRoom, data.payload.sectionDetail.id);
    yield put({
      type: FETCH_ROOM_SUCCESS,
      payload: newRoom,
    });
    // if (response) {
    //   yield put({
    //     type: FETCH_ROOM_SUCCESS,
    //     payload: response
    //   });
    // }
  } catch (error) {
    // yield put({
    //   type: FETCH_ROOM_ERROR,
    //   error: getSimplifiedError(error),
    // });
  }
}

async function getSpecificRoom(id) {
  return await Axios.get(`/api/v1/room/${id}`, getHeader());
}

function* handleSpecificRoom(data) {
  try {
    const response = yield call(getSpecificRoom(data.payload.id));
    data.payload.setRoomDetails(response);
    yield put({
      type: GET_SPECIFIC_ROOM_SUCCESS,
      payload: response,
    });
  } catch (error) {
    yield put({
      type: GET_SPECIFIC_ROOM_FAIL,
      error: getSimplifiedError(error),
    });
  }
}

export default all([
  takeLatest(FETCH_SECTIONS_REQUEST, handleFetchSections),
  takeLatest(CREATE_SECTION_REQUEST, handleCreateSection),
  takeLatest(EDIT_SECTION_REQUEST, handleUpdateSection),

  takeLatest(CREATE_ROOM_REQUEST, handleCreateRoom),
  takeLatest(FETCH_ROOM_REQUEST, handleFetchRoom),
  takeLatest(DELETE_SECTION_REQUEST, handleDeleteSection),
  takeLatest(DELETE_ROOM_REQUEST, handleDeleteRoom),
  takeLatest(UPDATE_ROOM_REQUEST, handleUpdateRoom),
  takeLatest(GET_SPECIFIC_ROOM_REQUEST, handleSpecificRoom),
]);
