export const FETCH_SCHOOLS_REQUEST = 'FETCH_SCHOOLS_REQUEST';
export const FETCH_SCHOOLS_SUCCESS = 'FETCH_SCHOOLS_SUCCESS';
export const FETCH_SCHOOLS_ERROR = 'FETCH_SCHOOLS_ERROR';

export const CREATE_SCHOOL_REQUEST = 'CREATE_SCHOOL_REQUEST';
export const CREATE_SCHOOL_SUCCESS = 'CREATE_SCHOOL_SUCCESS';
export const CREATE_SCHOOL_ERROR = 'CREATE_SCHOOL_ERROR';

export const FETCH_REPORT_REQUEST = 'FETCH_REPORT_REQUEST';
export const FETCH_REPORT_SUCCESS = 'FETCH_REPORT_SUCCESS';
export const FETCH_REPORT_ERROR = 'FETCH_REPORT_ERROR';

export const DELETE_SCHOOL_REQUEST = ' DELETE_SCHOOL_REQUEST';
export const DELETE_SCHOOL_SUCCESS = 'DELETE_SCHOOL_SUCCESS';
export const DELETE_SCHOOL_ERROR = 'DELETE_SCHOOL_ERROR';

const block = {
	loading: false,
	error: '',
	success: false,
};

const initialState = {
	schools: { ...block, data: [] },
	reports: { ...block, data: [] },
	deleteschool: { ...block, data: [] },
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
			s.push(action.payload)
			return {
				...state,
				createSchool: { ...state.createSchool, loading: false, success: true, data: action.payload },
				districts: { ...state.districts, data: s }
			};
		case CREATE_SCHOOL_ERROR:
			return {
				...state,
				createSchool: { ...state.createSchool, loading: false, error: action.error },
			};

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
