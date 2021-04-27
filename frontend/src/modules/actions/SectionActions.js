import {
    FETCH_SECTIONS_REQUEST,
    CREATE_SECTION_REQUEST,
    FETCH_ROOM_REQUEST,
    CREATE_ROOM_REQUEST,
    DELETE_SECTION_REQUEST,
    DELETE_ROOM_REQUEST,
    UPDATE_ROOM_REQUEST
} from '../reducers/SectionReducer';

export const fetchSections = (payload) => ({ type: FETCH_SECTIONS_REQUEST, payload });

export const createSection = (payload) => ({ type: CREATE_SECTION_REQUEST, payload });

export const deleteSection = (payload) => ({ type: DELETE_SECTION_REQUEST, payload });

export const fetchRoom = (payload) => ({ type: FETCH_ROOM_REQUEST, payload });

export const createRoom = (payload) => ({ type: CREATE_ROOM_REQUEST, payload });

export const deleteRoom = (payload) => ({ type: DELETE_ROOM_REQUEST, payload });

export const editRoom = (payload) => ({ type: UPDATE_ROOM_REQUEST, payload });