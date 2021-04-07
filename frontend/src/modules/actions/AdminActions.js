import { FETCH_ADMINS_REQUEST } from '../reducers/AdminReducer';
    
export const fetchAdmins = (payload) => ({ type: FETCH_ADMINS_REQUEST, payload });
  