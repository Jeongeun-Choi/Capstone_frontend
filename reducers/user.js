import { createAction } from '../utils/createAction';
import produce from 'immer';

export const initialState = {
  logInLoading: false, //로그인 시도중
  logInDone: false,
  logInError: null,
  logOutLoading: false, //로그아웃 시도중
  logOutDone: false,
  logOutError: null,
  signUpLoading: false, //회원가입 시도중
  signUpDone: false,
  signUpError: null,

  me: {
    id: undefined,
    userName: undefined,
    email: undefined,
    phoneNumber: undefined,
    birthDate: undefined,

    locations: [], //활동지역
    categories: [], //관심분야

    preferGroups: [],
    applyGroups: [], //내가 지원한 모임
    joinGroups: [] //나의 모임
  }
};

export const LOAD_JOINGROUPS_REQUEST = 'LOAD_JOINGROUPS_REQUEST';
export const LOAD_JOINGROUPS_SUCCESS = 'LOAD_JOINGROUPS_SUCCESS';
export const LOAD_JOINGROUPS_FAILURE = 'LOAD_JOINGROUPS_FAILURE';

export const LOAD_APPLYGROUPS_REQUEST = 'LOAD_APPLYGROUPS_REQUEST';
export const LOAD_APPLYGROUPS_SUCCESS = 'LOAD_APPLYGROUPS_SUCCESS';
export const LOAD_APPLYGROUPS_FAILURE = 'LOAD_APPLYGROUPS_FAILURE';

export const LOG_IN_REQUEST = 'LOG_IN_REQUEST';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE';

export const LOG_OUT_REQUEST = 'LOG_OUT_REQUEST';
export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS';
export const LOG_OUT_FAILURE = 'LOG_OUT_FAILURE';

export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE';

export const ADD_LOCATION_REQUEST = 'ADD_LOCATION_REQUEST';
export const ADD_LOCATION_SUCCESS = 'ADD_LOCATION_SUCCESS';
export const ADD_LOCATION_FAILURE = 'ADD_LOCATION_FAILURE';

export const UPDATE_LOCATION_REQUEST = 'UPDATE_LOCATION_REQUEST';
export const UPDATE_LOCATION_SUCCESS = 'UPDATE_LOCATION_SUCCESS';
export const UPDATE_LOCATION_FAILURE = 'UPDATE_LOCATION_FAILURE';

export const DELETE_LOCATION_REQUEST = 'DELETE_LOCATION_REQUEST';
export const DELETE_LOCATION_SUCCESS = 'DELETE_LOCATION_SUCCESS';
export const DELETE_LOCATION_FAILURE = 'DELETE_LOCATION_FAILURE';

export const ADD_CATEGORY_REQUEST = 'ADD_CATEGORY_REQUEST';
export const ADD_CATEGORY_SUCCESS = 'ADD_CATEGORY_SUCCESS';
export const ADD_CATEGORY_FAILURE = 'ADD_CATEGORY_FAILURE';

export const UPDATE_CATEGORY_REQUEST = 'UPDATE_CATEGORY_REQUEST';
export const UPDATE_CATEGORY_SUCCESS = 'UPDATE_CATEGORY_SUCCESS';
export const UPDATE_CATEGORY_FAILURE = 'UPDATE_CATEGORY_FAILURE';

export const DELETE_CATEGORY_REQUEST = 'DELETE_CATEGORY_REQUEST';
export const DELETE_CATEGORY_SUCCESS = 'DELETE_CATEGORY_SUCCESS';
export const DELETE_CATEGORY_FAILURE = 'DELETE_CATEGORY_FAILURE';

export const loadJoingroupsRequestAction = createAction(
  LOAD_JOINGROUPS_REQUEST
);
export const loadJoingroupsSuccessAction = createAction(
  LOAD_JOINGROUPS_SUCCESS
);
export const loadJoingroupsFailureAction = createAction(
  LOAD_JOINGROUPS_FAILURE
);

export const loadApplyGroupsRequestAction = createAction(
  LOAD_APPLYGROUPS_REQUEST
);
export const loadApplyGroupsSuccessAction = createAction(
  LOAD_APPLYGROUPS_SUCCESS
);
export const loadApplyGroupsFailureAction = createAction(
  LOAD_APPLYGROUPS_FAILURE
);

export const loginRequestAction = createAction(LOG_IN_REQUEST);
export const loginSuccessAction = createAction(LOG_IN_SUCCESS);
export const loginFailureAction = createAction(LOG_IN_FAILURE);

export const logoutRequestAction = createAction(LOG_OUT_REQUEST);
export const logoutSuccessAction = createAction(LOG_OUT_SUCCESS);
export const logoutFailureAction = createAction(LOG_OUT_FAILURE);

export const signupRequestAction = createAction(SIGN_UP_REQUEST);
export const signupSuccessAction = createAction(SIGN_UP_SUCCESS);
export const signupFailureAction = createAction(SIGN_UP_FAILURE);

export const addLocationRequestAction = createAction(ADD_LOCATION_REQUEST);
export const addLocationSuccessAction = createAction(ADD_LOCATION_SUCCESS);
export const addLocationFailureAction = createAction(ADD_LOCATION_FAILURE);

export const updateLocationRequestAction = createAction(
  UPDATE_LOCATION_REQUEST
);
export const updateLocationSuccessAction = createAction(
  UPDATE_LOCATION_SUCCESS
);
export const updateLocationFailureAction = createAction(
  UPDATE_LOCATION_FAILURE
);

export const deleteLocationRequestAction = createAction(
  DELETE_LOCATION_REQUEST
);
export const deleteLocationSuccessAction = createAction(
  DELETE_LOCATION_SUCCESS
);
export const deleteLocationFailureAction = createAction(
  DELETE_LOCATION_FAILURE
);

export const addCategoryRequestAction = createAction(ADD_CATEGORY_REQUEST);
export const addCategorySuccessAction = createAction(ADD_CATEGORY_SUCCESS);
export const addCategoryFailureAction = createAction(ADD_CATEGORY_FAILURE);

export const updateCategoryRequestAction = createAction(
  UPDATE_CATEGORY_REQUEST
);
export const updateCategorySuccessAction = createAction(
  UPDATE_CATEGORY_SUCCESS
);
export const updateCategoryFailureAction = createAction(
  UPDATE_CATEGORY_FAILURE
);

export const deleteCategoryRequestAction = createAction(
  DELETE_CATEGORY_REQUEST
);
export const deleteCategorySuccessAction = createAction(
  DELETE_CATEGORY_SUCCESS
);
export const deleteCategoryFailureAction = createAction(
  DELETE_CATEGORY_FAILURE
);

const reducer = (state = initialState, action) => {
  return produce(state, draft => {
    switch (action.type) {
      case LOAD_JOINGROUPS_REQUEST: {
        break;
      }
      case LOAD_JOINGROUPS_SUCCESS: {
        draft.me.joinGroups = action.data.groups;
        break;
      }
      case LOAD_JOINGROUPS_FAILURE: {
        break;
      }
      case LOAD_JOINGROUPS_REQUEST: {
        break;
      }
      case LOAD_JOINGROUPS_SUCCESS: {
        draft.me.applyGroups = action.data.groups;
        break;
      }
      case LOAD_JOINGROUPS_FAILURE: {
        break;
      }
      case LOG_IN_REQUEST: {
        draft.logInLoading = true;
        draft.logInError = null;
        draft.logInDone = false;
        break;
      }
      case LOG_IN_SUCCESS: {
        draft.logInLoading = false;
        draft.logInDone = true;
        draft.me = action.data.info;
        break;
      }
      case LOG_IN_FAILURE: {
        draft.logInLoading = false;
        draft.logInError = action.error;
        break;
      }
      case SIGN_UP_REQUEST: {
        draft.signupLoading = true;
        draft.signupError = null;
        draft.signupDone = false;
        break;
      }
      case SIGN_UP_SUCCESS: {
        draft.signupLoading = false;
        draft.signupDone = true;
        break;
      }
      case SIGN_UP_FAILURE: {
        draft.signupLoading = false;
        draft.signupError = action.error;
        break;
      }
      case LOG_OUT_REQUEST: {
        draft.logOutLoading = true;
        draft.logOutError = null;
        draft.logOutDone = false;
        break;
      }
      case LOG_OUT_SUCCESS: {
        draft.logOutLoading = false;
        draft.logOutDone = true;
        draft.me = {};
        break;
      }
      case LOG_OUT_FAILURE: {
        draft.logOutLoading = false;
        draft.logOutError = action.error;
        break;
      }
      case ADD_LOCATION_REQUEST: {
        break;
      }
      case ADD_LOCATION_SUCCESS: {
        draft.me.locations = action.data;
        break;
      }
      case ADD_LOCATION_FAILURE: {
        break;
      }

      case UPDATE_LOCATION_REQUEST: {
        break;
      }
      case UPDATE_LOCATION_SUCCESS: {
        draft.me.locations = action.data;
        break;
      }
      case UPDATE_LOCATION_FAILURE: {
        break;
      }

      case DELETE_LOCATION_REQUEST: {
        break;
      }
      case DELETE_LOCATION_SUCCESS: {
        draft.me.locations = action.data;
        break;
      }
      case DELETE_LOCATION_FAILURE: {
        break;
      }
      case ADD_CATEGORY_REQUEST: {
        break;
      }
      case ADD_CATEGORY_SUCCESS: {
        draft.me.categories = action.data;
        break;
      }
      case ADD_CATEGORY_FAILURE: {
        break;
      }

      case UPDATE_CATEGORY_REQUEST: {
        break;
      }
      case UPDATE_CATEGORY_SUCCESS: {
        draft.me.categories = action.data;
        break;
      }
      case UPDATE_CATEGORY_FAILURE: {
        break;
      }

      case DELETE_CATEGORY_REQUEST: {
        break;
      }
      case DELETE_CATEGORY_SUCCESS: {
        draft.me.categories = action.data;
        break;
      }
      case DELETE_CATEGORY_FAILURE: {
        break;
      }
      default:
        return state;
    }
  });
};

export default reducer;
