import { GET_USER_REQUEST } from '../reducers/UserReducer';
import { FETCH_USERS_REQUEST } from '../reducers/UserReducer';

export const getUserData = (payload) => ({ type: GET_USER_REQUEST, payload });

export const fetchUsers = (payload) => ({ type: FETCH_USERS_REQUEST, payload });
