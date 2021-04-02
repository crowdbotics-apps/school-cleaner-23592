import {
    GET_DISTRICT_REQUEST,
    UPDATE_DISTRICT_REQUEST,
    DELETE_DISTRICT_REQUEST,
    FETCH_DISTRICTS_REQUEST,
    CREATE_DISTRICT_REQUEST,
    GENERATE_CODE_REQUEST
  } from '../reducers/DistrictReducer';
  
  export const getDistrict = (payload) => ({ type: GET_DISTRICT_REQUEST, payload });
  
  export const updateDistrict = (payload) => ({ type: UPDATE_DISTRICT_REQUEST, payload });
  
  export const deleteDistrict = (payload) => ({ type: DELETE_DISTRICT_REQUEST, payload });
  
  export const fetchDistricts = (payload) => ({ type: FETCH_DISTRICTS_REQUEST, payload });

  export const createDistrict = (payload) => ({ type: CREATE_DISTRICT_REQUEST, payload });

  export const generateCode = (payload) => ({ type: GENERATE_CODE_REQUEST, payload });
  