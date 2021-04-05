export const GET_DISTRICT_REQUEST = 'GET_DISTRICT_REQUEST';
export const GET_DISTRICT_SUCCESS = 'GET_DISTRICT_SUCCESS';
export const GET_DISTRICT_ERROR = 'GET_DISTRICT_ERROR';

export const UPDATE_DISTRICT_REQUEST = 'UPDATE_DISTRICT_REQUEST';
export const UPDATE_DISTRICT_SUCCESS = 'UPDATE_DISTRICT_SUCCESS';
export const UPDATE_DISTRICT_ERROR = 'UPDATE_DISTRICT_ERROR';

export const DELETE_DISTRICT_REQUEST = 'DELETE_DISTRICT_REQUEST';
export const DELETE_DISTRICT_SUCCESS = 'DELETE_DISTRICT_SUCCESS';
export const DELETE_DISTRICT_ERROR = 'DELETE_DISTRICT_ERROR';

export const FETCH_DISTRICTS_REQUEST = 'FETCH_DISTRICTS_REQUEST';
export const FETCH_DISTRICTS_SUCCESS = 'FETCH_DISTRICTS_SUCCESS';
export const FETCH_DISTRICTS_ERROR = 'FETCH_DISTRICTS_ERROR';

export const CREATE_DISTRICT_REQUEST = 'CREATE_DISTRICT_REQUEST';
export const CREATE_DISTRICT_SUCCESS = 'CREATE_DISTRICT_SUCCESS';
export const CREATE_DISTRICT_ERROR = 'CREATE_DISTRICT_ERROR';

export const GENERATE_CODE_REQUEST = 'GENERATE_CODE_REQUEST';
export const GENERATE_CODE_SUCCESS = 'GENERATE_CODE_SUCCESS';
export const GENERATE_CODE_ERROR = 'GENERATE_CODE_ERROR';


const block = {
  loading: false,
  error: '',
  success: false,
};

const initialState = {
  districts: { ...block, data: []},
  getDistrict: { ...block, data: null},
  updateDistrict: { ...block, data: null },
  deleteDistrict: { ...block },
  createDistrict: { ...block, data: null },
  generateCode: { ...block, data: null}
};

export const DistrictReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_DISTRICT_REQUEST:
      return { ...state, getDistrict: { ...state.getDistrict, loading: true } };
    case GET_DISTRICT_SUCCESS:
      return {
        ...state,
        getDistrict: { ...state.getDistrict, loading: false, success: true, data: action.payload },
      };
    case GET_DISTRICT_ERROR:
      return {
        ...state,
        getDistrict: { ...state.getDistrict, loading: false, error: action.error },
      };


    case UPDATE_DISTRICT_REQUEST:
      return { ...state, updateDistrict: { ...state.updateDistrict, loading: true } };
    case UPDATE_DISTRICT_SUCCESS:
      let all = state.districts.data.filter(obj => obj.id != action.payload.id)
      all.push(action.payload)
      return {
        ...state,
        updateDistrict: { ...state.updateDistrict, loading: false, success: true, data: action.payload },
        districts: { ...state.districts, loading: false, success: true, data: all },
      };
    case UPDATE_DISTRICT_ERROR:
      return {
        ...state,
        updateDistrict: { ...state.updateDistrict, loading: false, error: action.error },
      };


    case DELETE_DISTRICT_REQUEST:
      return { ...state, deleteDistrict: { ...state.deleteDistrict, loading: true } };
    case DELETE_DISTRICT_SUCCESS:
      let b = state.districts.data.filter(ob => ob.id != action.payload)
      return {
        ...state,
        deleteDistrict: { ...state.deleteDistrict, loading: false, success: true },
        districts: { ...state.districts, loading: false, success: true, data: b },
      };
    case DELETE_DISTRICT_ERROR:
      return {
        ...state,
        deleteDistrict: { ...state.deleteDistrict, loading: false, error: action.error },
      };


    case FETCH_DISTRICTS_REQUEST:
      return { ...state, districts: { ...state.districts, loading: true } };
    case FETCH_DISTRICTS_SUCCESS:
      return {
        ...state,
        districts: { ...state.districts, loading: false, success: true, data: action.payload },
      };
    case FETCH_DISTRICTS_ERROR:
      return {
        ...state,
        districts: { ...state.districts, loading: false, error: action.error },
      };
    

    case CREATE_DISTRICT_REQUEST:
      return { ...state, createDistrict: { ...state.createDistrict, loading: true } };
    case CREATE_DISTRICT_SUCCESS:
      let s = state.districts.data;
      s.push(action.payload)
      return {
        ...state,
        createDistrict: { ...state.createDistrict, loading: false, success: true, data: action.payload },
        districts: { ...state.districts, data: s}
      };
    case CREATE_DISTRICT_ERROR:
      return {
        ...state,
        createDistrict: { ...state.createDistrict, loading: false, error: action.error },
      };


    case GENERATE_CODE_REQUEST:
      return { ...state, generateCode: { ...state.generateCode, loading: true } };
    case GENERATE_CODE_SUCCESS:
      return {
        ...state,
        generateCode: { ...state.generateCode, loading: false, success: true, data: action.payload },
      };
    case GENERATE_CODE_ERROR:
      return {
        ...state,
        generateCode: { ...state.generateCode, loading: false, error: action.error },
      };

    default:
      return state;
  }
};
