export const GET_USER_REQUEST = 'GET_USER_REQUEST';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const GET_USER_ERROR = 'GET_USER_ERROR';

export const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST';
export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
export const FETCH_USERS_ERROR = 'FETCH_USERS_ERROR';

const block = {
  loading: false,
  error: '',
  success: false,
};

const initialState = {
  user: { ...block, data: null },
  users: { ...block, data: [] },
};

export const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_REQUEST:
      return { ...state, user: { ...state.user, loading: true } };
    case GET_USER_SUCCESS:
      return {
        ...state,
        user: { ...state.user, loading: false, success: true, data: action.payload },
      };
    case GET_USER_ERROR:
      return {
        ...state,
        user: { ...state.user, loading: false, error: action.error },
      };

    case FETCH_USERS_REQUEST:
      return { ...state, users: { ...state.user, loading: true } };
    case FETCH_USERS_SUCCESS:
      return {
        ...state,
        user: { ...state.users, loading: false, success: true, data: action.payload },
      };
    case FETCH_USERS_ERROR:
      return {
        ...state,
        user: { ...state.users, loading: false, error: action.error },
      };

    default:
      return state;
  }
};
