export const GET_USER_REQUEST = 'GET_USER_REQUEST';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const GET_USER_ERROR = 'GET_USER_ERROR';

const block = {
  loading: false,
  error: '',
  success: false,
};

const initialState = {
  user: { ...block, data: {} },
};

export const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_REQUEST:
      return { ...state, user: { ...state.user, loading: true } };
    case GET_USER_SUCCESS:
      return {
        ...state,
        user: { ...state.user, loading: false, success: true },
      };
    case GET_USER_ERROR:
      return {
        ...state,
        user: { ...state.user, loading: false, error: action.error },
      };

    default:
      return state;
  }
};
