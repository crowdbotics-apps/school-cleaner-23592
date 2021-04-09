import { 
    FETCH_ADMINS_REQUEST,
    DISTRIC_EMPLOYEES_REQUEST
 } from '../reducers/AdminReducer';
    
export const getDistricEmployees = (payload) => ({type: DISTRIC_EMPLOYEES_REQUEST, payload});
export const fetchAdmins = (payload) => ({ type: FETCH_ADMINS_REQUEST, payload });
  