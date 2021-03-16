export const SIGNUP_REQUEST = 'SIGNUP_REQUEST';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_ERROR = 'SIGNUP_ERROR';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';

export const FORGOT_PASSWORD_REQUEST = 'FORGOT_PASSWORD_REQUEST';
export const FORGOT_PASSWORD_SUCCESS = 'FORGOT_PASSWORD_SUCCESS';
export const FORGOT_PASSWORD_ERROR = 'FORGOT_PASSWORD_ERROR';

export const CHANGE_PASSWORD_REQUEST = 'CHANGE_PASSWORD_REQUEST';
export const CHANGE_PASSWORD_SUCCESS = 'CHANGE_PASSWORD_SUCCESS';
export const CHANGE_PASSWORD_ERROR = 'CHANGE_PASSWORD_ERROR';

export const RESET_PASSWORD_REQUEST = 'RESET_PASSWORD_REQUEST';
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS';
export const RESET_PASSWORD_ERROR = 'RESET_PASSWORD_ERROR';



const block = {
  loading: false,
  error: '',
  success: false,
};

const initialState = {
  signup: { ...block },
  login: { ...block },
  forgotPassword: { ...block },
  changePassword: { ...block },
  resetPassword: { ...block },
};

export const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGNUP_REQUEST:
      return { ...state, signup: { ...state.signup, loading: true } };
    case SIGNUP_SUCCESS:
      return {
        ...state,
        signup: { ...state.signup, loading: false, success: true },
      };
    case SIGNUP_ERROR:
      return {
        ...state,
        signup: { ...state.signup, loading: false, error: action.error },
      };

    case LOGIN_REQUEST:
      return { ...state, login: { ...state.login, loading: true } };
    case LOGIN_SUCCESS:
      return {
        ...state,
        login: { ...state.login, loading: false, success: true },
      };
    case LOGIN_ERROR:
      return {
        ...state,
        login: { ...state.login, loading: false, error: action.error },
      };

    case FORGOT_PASSWORD_REQUEST:
      return {
        ...state,
        forgotPassword: { ...state.forgotPassword, loading: true },
      };
    case FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        forgotPassword: {
          ...state.forgotPassword,
          loading: false,
          success: true,
        },
      };
    case FORGOT_PASSWORD_ERROR:
      return {
        ...state,
        forgotPassword: {
          ...state.forgotPassword,
          loading: false,
          error: action.error,
        },
      };

    case RESET_PASSWORD_REQUEST:
      return {
        ...state,
        resetPassword: { ...state.resetPassword, loading: true },
      };
    case RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        resetPassword: {
          ...state.resetPassword,
          loading: false,
          success: true,
        },
      };
    case RESET_PASSWORD_ERROR:
      return {
        ...state,
        resetPassword: {
          ...state.resetPassword,
          loading: false,
          error: action.error,
        },
    };  

    case CHANGE_PASSWORD_REQUEST:
      return {
        ...state,
        changePassword: { ...state.changePassword, loading: true },
      };
    case CHANGE_PASSWORD_SUCCESS:
      return {
        ...state,
        changePassword: {
          ...state.changePassword,
          loading: false,
          success: true,
        },
      };
    case CHANGE_PASSWORD_ERROR:
      return {
        ...state,
        changePassword: {
          ...state.changePassword,
          loading: false,
          error: action.error,
        },
      };

    default:
      return state;
  }
};
