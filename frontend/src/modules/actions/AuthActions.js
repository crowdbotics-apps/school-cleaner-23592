import {
    SIGNUP_REQUEST,
    FORGOT_PASSWORD_REQUEST,
    LOGIN_REQUEST,
    CHANGE_PASSWORD_REQUEST,
    RESET_PASSWORD_REQUEST
  } from '../reducers/AuthReducer';
  
  export const signup = (payload) => ({ type: SIGNUP_REQUEST, payload });
  
  export const login = (payload) => ({ type: LOGIN_REQUEST, payload });
  
  export const forgotPassword = (payload) => ({
    type: FORGOT_PASSWORD_REQUEST,
    payload,
  });
  
  export const resetPassword = (payload) => ({
    type: RESET_PASSWORD_REQUEST,
    payload,
  });

  export const changePassword = (payload) => ({
    type: CHANGE_PASSWORD_REQUEST,
    payload,
  });
  