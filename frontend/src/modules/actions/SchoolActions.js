import {
  FETCH_SCHOOLS_REQUEST,
  CREATE_SCHOOL_REQUEST,
  FETCH_REPORT_REQUEST,
  DELETE_SCHOOL_REQUEST,
  UPDATE_SCHOOL_REQUEST,
  CREATE_CLEANUP_REQUEST,
  FETCH_SCHOOLS_CLEANING_DETAILS,
  UPDATE_CLEANUP_REQUEST,
  FETCH_ROOM_SPECS_REQUEST,
} from '../reducers/SchoolReducer';

export const fetchSchools = (payload) => ({ type: FETCH_SCHOOLS_REQUEST, payload });
export const createSchool = (payload) => ({ type: CREATE_SCHOOL_REQUEST, payload });
export const updateSchool = (payload) => ({ type: UPDATE_SCHOOL_REQUEST, payload });
export const fetchReport = (payload) => ({ type: FETCH_REPORT_REQUEST, payload });
export const deleteSchool = (payload) => ({ type: DELETE_SCHOOL_REQUEST, payload });
export const createCleanUp = (payload) => ({ type: CREATE_CLEANUP_REQUEST, payload });
export const fetchSchoolsCleaningDetails = (payload) => ({ type: FETCH_SCHOOLS_CLEANING_DETAILS, payload });
export const updateCleanupDetail = (payload) => ({ type: UPDATE_CLEANUP_REQUEST, payload });
export const fetchRoomSpecs = (payload) => ({ type: FETCH_ROOM_SPECS_REQUEST, payload });
