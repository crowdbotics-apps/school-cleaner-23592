import {
    FETCH_SCHOOLS_REQUEST,
    CREATE_SCHOOL_REQUEST,
    FETCH_REPORT_REQUEST,
    DELETE_SCHOOL_REQUEST,
} from '../reducers/SchoolReducer';

export const fetchSchools = (payload) => ({ type: FETCH_SCHOOLS_REQUEST, payload });

export const createSchool = (payload) => ({ type: CREATE_SCHOOL_REQUEST, payload });

export const fetchReport = (payload) => ({ type: FETCH_REPORT_REQUEST, payload });

export const deleteSchool = (payload) => ({ type: DELETE_SCHOOL_REQUEST, payload });