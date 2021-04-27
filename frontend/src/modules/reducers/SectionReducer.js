export const FETCH_SECTIONS_REQUEST = 'FETCH_SECTIONS_REQUEST';
export const FETCH_SECTIONS_SUCCESS = 'FETCH_SECTIONS_SUCCESS';
export const FETCH_SECTIONS_ERROR = 'FETCH_SECTIONS_ERROR';

export const CREATE_SECTION_REQUEST = 'CREATE_SECTION_REQUEST';
export const CREATE_SECTION_SUCCESS = 'CREATE_SECTION_SUCCESS';
export const CREATE_SECTION_ERROR = 'CREATE_SECTION_ERROR';

export const FETCH_ROOM_REQUEST = 'FETCH_ROOM_REQUEST';
export const FETCH_ROOM_SUCCESS = 'FETCH_ROOM_SUCCESS';
export const FETCH_ROOM_ERROR = 'FETCH_ROOM_ERROR'

export const CREATE_ROOM_REQUEST = 'CREATE_ROOM_REQUEST';
export const CREATE_ROOM_SUCCESS = 'CREATE_ROOM_SUCCESS';
export const CREATE_ROOM_ERROR = 'CREATE_ROOM_ERROR';

export const DELETE_SECTION_REQUEST = 'DELETE_SECTION_REQUEST';
export const DELETE_SECTION_SUCCESS = 'DELETE_SECTION_SUCCESS';
export const DELETE_SECTION_ERROR = 'DELETE_SECTION_ERROR';

export const DELETE_ROOM_REQUEST = 'DELETE_ROOM_REQUEST';

export const UPDATE_ROOM_REQUEST = 'UPDATE_ROOM_REQUEST';

const block = {
	loading: false,
	error: '',
	success: false,
};

const initialState = {
	sections: { ...block, data: [] },
	room: { ...block, data: [] }
};

export const SectionReducer = (state = initialState, action) => {
	switch (action.type) {
		case FETCH_SECTIONS_REQUEST:
			return { ...state, sections: { ...state.sections, loading: true } };
		case FETCH_SECTIONS_SUCCESS:
			return {
				...state,
				sections: { ...state.sections, loading: false, success: true, data: action.payload },
			};
		case FETCH_SECTIONS_ERROR:
			return {
				...state,
				sections: { ...state.sections, loading: false, error: action.error },
			};

		case CREATE_SECTION_REQUEST:
			return { ...state, createSection: { ...state.createSection, loading: true } };
		case CREATE_SECTION_SUCCESS:
			let s = state.districts.data;
			s.push(action.payload)
			return {
				...state,
				createSection: { ...state.createSection, loading: false, success: true, data: action.payload },
				districts: { ...state.districts, data: s }
			};
		case CREATE_SECTION_ERROR:
			return {
				...state,
				createSection: { ...state.createSection, loading: false, error: action.error },
			};

		case FETCH_ROOM_REQUEST:
			return { ...state, room: { ...state.room, loading: true } };
		case FETCH_ROOM_SUCCESS:
			return {
				...state,
				room: { ...state.room, loading: false, success: true, data: action.payload },
			};
		case FETCH_ROOM_ERROR:
			return {
				...state,
				room: { ...state.room, loading: false, error: action.error },
			};

		case CREATE_ROOM_REQUEST:
			return { ...state, createRoom: { ...state.createRoom, loading: true } };
		case CREATE_ROOM_SUCCESS:
			s = state.districts.data;
			s.push(action.payload)
			return {
				...state,
				createRoom: { ...state.createRoom, loading: false, success: true, data: action.payload },
				districts: { ...state.districts, data: s }
			};
		case CREATE_ROOM_ERROR:
			return {
				...state,
				createRoom: { ...state.createRoom, loading: false, error: action.error },
			};
		default:
			return state;
	}
};
