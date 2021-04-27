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
  UPDATE_ROOM_REQUEST
} from '../reducers/SectionReducer';

async function fetchSections(schoolId) {
  return await Axios.get(`/api/v1/section/?school=${schoolId}`, getHeader());
}

function* handleFetchSections(data) {
  try {
    const response = yield call(fetchSections, data.payload);
    if (response) {
      yield put({
        type: FETCH_SECTIONS_SUCCESS,
        payload: response
      });
    }
  } catch (error) {
    yield put({
      type: FETCH_SECTIONS_ERROR,
      error: getSimplifiedError(error),
    });
  }
};

async function createSection({ name, school }) {
  return await Axios.post(`/api/v1/section/`, {
    name,
    school
  }, getHeader());
}

function* handleCreateSection({ payload }) {
  try {
    const response = yield call(createSection, payload);
    if (response) {
      yield put({
        type: CREATE_SECTION_SUCCESS,
        payload: response
      });
    }
  } catch (error) {
    yield put({
      type: CREATE_SECTION_ERROR,
      error: getSimplifiedError(error),
    });
  }
}

async function createRoom(data) {
  return await Axios.post(`/api/v1/room/`, data, getHeader());
}

function* handleCreateRoom({ payload }) {
  try {
    const response = yield call(createRoom, payload);
    if (response) {
      yield put({
        type: CREATE_ROOM_SUCCESS,
        payload: response
      });
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
        payload: response
      });
    }
  } catch (error) {
    yield put({
      type: FETCH_ROOM_ERROR,
      error: getSimplifiedError(error),
    });
  }
};

async function deleteSection(id) {
  return await Axios.delete(`/api/v1/section/${id}/`, getHeader());
}

function* handleDeleteSection(data) {
  try {
    const response = yield call(deleteSection, data.payload);
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
};

async function deleteRoom(id) {
  return await Axios.delete(`/api/v1/room/${id}/`, getHeader());
}

function* handleDeleteRoom(data) {
  try {
    const response = yield call(deleteRoom, data.payload);
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
};

async function updateRoom(data) {
  return await Axios.patch(`/api/v1/room/${data.id}/`, data.data, getHeader());
}

function* handleUpdateRoom(data) {
  try {
    const response = yield call(updateRoom, data.payload);
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
};

export default all([
  takeLatest(FETCH_SECTIONS_REQUEST, handleFetchSections),
  takeLatest(CREATE_SECTION_REQUEST, handleCreateSection),

  takeLatest(CREATE_ROOM_REQUEST, handleCreateRoom),
  takeLatest(FETCH_ROOM_REQUEST, handleFetchRoom),
  takeLatest(DELETE_SECTION_REQUEST, handleDeleteSection),
  takeLatest(DELETE_ROOM_REQUEST, handleDeleteRoom),
  takeLatest(UPDATE_ROOM_REQUEST, handleUpdateRoom)

]);
