export const FETCH_ADMINS_REQUEST = 'FETCH_ADMINS_REQUEST';
export const FETCH_ADMINS_SUCCESS = 'FETCH_ADMINS_SUCCESS';
export const FETCH_ADMINS_ERROR = 'FETCH_ADMINS_ERROR';

const block = { 
  loading: false,  
  error: '',   
  success: false,
};

const initialState = {
  admins: { ...block, data: []},
};

export const AdminReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ADMINS_REQUEST:
      return { ...state, admins: { ...state.admins, loading: true } };
    case FETCH_ADMINS_SUCCESS:
      return {
        ...state,
        admins: { ...state.admins, loading: false, success: true, data: action.payload },
      };
    case FETCH_ADMINS_ERROR:
      return {
        ...state,
        admins: { ...state.admins, loading: false, error: action.error },
      };
    
    default:
      return state;
  }
};
