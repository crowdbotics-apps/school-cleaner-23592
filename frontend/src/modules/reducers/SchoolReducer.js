import { FETCH_ROOM_SUCCESS } from './SectionReducer';

export const FETCH_SCHOOLS_REQUEST = 'FETCH_SCHOOLS_REQUEST';
export const FETCH_SCHOOLS_SUCCESS = 'FETCH_SCHOOLS_SUCCESS';
export const FETCH_SCHOOLS_ERROR = 'FETCH_SCHOOLS_ERROR';

export const CREATE_SCHOOL_REQUEST = 'CREATE_SCHOOL_REQUEST';
export const CREATE_SCHOOL_SUCCESS = 'CREATE_SCHOOL_SUCCESS';
export const CREATE_SCHOOL_ERROR = 'CREATE_SCHOOL_ERROR';

export const CREATE_CLEANUP_REQUEST = 'CREATE_CLEANUP_REQUEST';
export const CREATE_CLEANUP_SUCCESS = 'CREATE_CLEANUP_SUCCESS';
export const CREATE_CLEANUP_ERROR = 'CREATE_CLEANUP_ERROR';

export const UPDATE_SCHOOL_REQUEST = 'UPDATE_SCHOOL_REQUEST';
export const UPDATE_SCHOOL_SUCCESS = 'UPDATE_SCHOOL_SUCCESS';
export const UPDATE_SCHOOL_ERROR = 'UPDATE_SCHOOL_ERROR';

export const UPDATE_CLEANUP_REQUEST = 'UPDATE_CLEANUP_REQUEST';
export const UPDATE_CLEANUP_SUCCESS = 'UPDATE_CLEANUP_SUCCESS';
export const UPDATE_CLEANUP_ERROR = 'UPDATE_CLEANUP_ERROR';

export const FETCH_REPORT_REQUEST = 'FETCH_REPORT_REQUEST';
export const FETCH_REPORT_SUCCESS = 'FETCH_REPORT_SUCCESS';
export const FETCH_REPORT_ERROR = 'FETCH_REPORT_ERROR';

export const DELETE_SCHOOL_REQUEST = ' DELETE_SCHOOL_REQUEST';
export const DELETE_SCHOOL_SUCCESS = 'DELETE_SCHOOL_SUCCESS';
export const DELETE_SCHOOL_ERROR = 'DELETE_SCHOOL_ERROR';

export const FETCH_SCHOOLS_CLEANING_DETAILS = 'FETCH_SCHOOLS_CLEANING_DETAILS';
export const FETCH_SCHOOLS_CLEANING_DETAILS_SUCCESS = 'FETCH_SCHOOLS_CLEANING_DETAILS_SUCCESS';
export const FETCH_SCHOOLS_CLEANING_DETAILS_ERROR = 'FETCH_SCHOOLS_CLEANING_DETAILS_ERROR';

export const FETCH_ROOM_SPECS_REQUEST = 'FETCH_ROOM_SPECS_REQUEST';
export const FETCH_ROOM_SPECS_SUCCESS = 'FETCH_ROOM_SPECS_SUCCESS';
export const FETCH_ROOM_SPECS_ERROR = 'FETCH_ROOM_SPECS_ERROR';

const block = {
  loading: false,
  error: '',
  success: false,
};

const initialState = {
  schools: { ...block, data: [] },
  reports: { ...block, data: [] },
  room_specs: { ...block, data: [] },
  deleteschool: { ...block, data: [] },
  schoolCleaningDetails: { ...block, data: null },
};

export const SchoolReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SCHOOLS_REQUEST:
      return { ...state, schools: { ...state.schools, loading: true } };
    case FETCH_SCHOOLS_SUCCESS:
      return {
        ...state,
        schools: { ...state.schools, loading: false, success: true, data: action.payload },
      };
    case FETCH_SCHOOLS_ERROR:
      return {
        ...state,
        schools: { ...state.schools, loading: false, error: action.error },
      };

    case CREATE_SCHOOL_REQUEST:
      return { ...state, createSchool: { ...state.createSchool, loading: true } };
    case CREATE_SCHOOL_SUCCESS:
      let s = state.districts.data;
      s.push(action.payload);
      return {
        ...state,
        createSchool: { ...state.createSchool, loading: false, success: true, data: action.payload },
        districts: { ...state.districts, data: s },
      };
    case CREATE_SCHOOL_ERROR:
      return {
        ...state,
        createSchool: { ...state.createSchool, loading: false, error: action.error },
      };

    case CREATE_CLEANUP_REQUEST:
      return { ...state, createCleanup: { ...state.createCleanup, loading: true } };
    case CREATE_CLEANUP_SUCCESS:
      //   let s = state.districts.data;
      //   s.push(action.payload);
      return {
        ...state,
        createCleanup: { ...state.createCleanup, loading: false, success: true, data: action.payload },
        // districts: { ...state.districts, data: s },
      };
    case CREATE_CLEANUP_ERROR:
      return {
        ...state,
        createCleanup: { ...state.createCleanup, loading: false, error: action.error },
      };

    case UPDATE_SCHOOL_REQUEST: {
      return { ...state, loading: true };
    }
    case UPDATE_SCHOOL_SUCCESS: {
      return { ...state, editSchool: action.payload, loading: false };
    }
    case UPDATE_SCHOOL_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    }

    case FETCH_ROOM_SPECS_REQUEST: {
      return {
        ...state,
        room_specs: { room_specs: action.payload, loading: true },
      };
    }
    case FETCH_ROOM_SPECS_SUCCESS: {
      return {
        ...state,
        room_specs: { ...state.room_specs, loading: false, success: true, data: action.payload },
      };
    }

    case FETCH_ROOM_SPECS_ERROR: {
      return {
        ...state,
        room_specs: { ...state.room_specs, loading: false, error: action.error },
      };
    }

    case UPDATE_CLEANUP_REQUEST: {
      return { ...state, loading: true };
    }
    case UPDATE_CLEANUP_SUCCESS: {
      return { ...state, update: action.payload, loading: false };
    }
    case UPDATE_CLEANUP_ERROR: {
      return { ...state, loading: false, error: action.error };
    }

    case FETCH_REPORT_REQUEST:
      return { ...state, reports: { ...state.reports, loading: true } };
    case FETCH_REPORT_SUCCESS:
      return {
        ...state,
        reports: { ...state.reports, loading: false, success: true, data: action.payload },
      };
    case FETCH_REPORT_ERROR:
      return {
        ...state,
        reports: { ...state.reports, loading: false, error: action.error },
      };

    case FETCH_SCHOOLS_CLEANING_DETAILS:
      return { ...state, schoolCleaningDetails: { ...state.schoolCleaningDetails, loading: true } };
    case FETCH_SCHOOLS_CLEANING_DETAILS_SUCCESS:
      return {
        ...state,
        schoolCleaningDetails: { ...state.schoolCleaningDetails, loading: false, success: true, data: action.payload },
      };
    case FETCH_SCHOOLS_CLEANING_DETAILS_ERROR:
      return {
        ...state,
        schoolCleaningDetails: { ...state.schoolCleaningDetails, loading: false, error: action.error },
      };

    case DELETE_SCHOOL_REQUEST:
      return { ...state, deleteschool: { ...state.deleteschool, loading: true } };
    case DELETE_SCHOOL_SUCCESS:
      return {
        ...state,
        deleteschool: { ...state.deleteschool, loading: false, success: true, data: action.payload },
      };
    case DELETE_SCHOOL_ERROR:
      return {
        ...state,
        deleteschool: { ...state.deleteschool, loading: false, error: action.error },
      };
    default:
      return state;
  }
};
