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
    id: null,
    name: null,
    email: null,
    telephone: null,
    birthday: null,
    profileImg: null,
    locations: [], //활동지역
    categories: [], //관심분야

    preferGroups: [],
    applyGroups: [], //내가 지원한 모임
    joinGroups: [], //나의 모임
  },
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

export const WITHDRAW_MEMBER_REQUEST = 'WITHDRAW_MEMBER_REQUEST';
export const WITHDRAW_MEMBER_SUCCESS = 'WITHDRAW_MEMBER_SUCCESS';
export const WITHDRAW_MEMBER_FAILURE = 'WITHDRAW_MEMBER_FAILURE';

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

export const LOAD_MY_INFO_REQUEST = 'LOAD_MY_INFO_REQUEST';
export const LOAD_MY_INFO_SUCCESS = 'LOAD_MY_INFO_SUCCESS';
export const LOAD_MY_INFO_FAILURE = 'LOAD_MY_INFO_FAILURE';

export const UPDATE_MY_INFO_REQUEST = 'UPDATE_MY_INFO_REQUEST';
export const UPDATE_MY_INFO_SUCCESS = 'UPDATE_MY_INFO_SUCCESS';
export const UPDATE_MY_INFO_FAILURE = 'UPDATE_MY_INFO_FAILURE';

export const LOAD_PREFER_GROUPS_REQUEST = 'LOAD_PREFER_GROUPS_REQUEST';
export const LOAD_PREFER_GROUPS_SUCCESS = 'LOAD_PREFER_GROUPS_SUCCESS';
export const LOAD_PREFER_GROUPS_FAILURE = 'LOAD_PREFER_GROUPS_FAILURE';

export const UPDATE_PREFER_LOCATION_REQUEST = 'UPDATE_PREFER_LOCATION_REQUEST';
export const UPDATE_PREFER_LOCATION_SUCCESS = 'UPDATE_PREFER_LOCATION_SUCCESS';
export const UPDATE_PREFER_LOCATION_FAILURE = 'UPDATE_PREFER_LOCATION_FAILURE';

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

export const withdrawRequestAction = createAction(WITHDRAW_MEMBER_REQUEST);
export const withdrawSuccessAction = createAction(WITHDRAW_MEMBER_SUCCESS);
export const withdrawFailureAction = createAction(WITHDRAW_MEMBER_FAILURE);

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
export const loadMyInfoRequestAction = createAction(LOAD_MY_INFO_REQUEST);
export const loadMyInfoSuccessAction = createAction(LOAD_MY_INFO_SUCCESS);
export const loadMyInfoFailureAction = createAction(LOAD_MY_INFO_FAILURE);

export const updateMyInfoRequestAction = createAction(UPDATE_MY_INFO_REQUEST);
export const updateMyInfoSuccessAction = createAction(UPDATE_MY_INFO_SUCCESS);
export const updateMyInfoFailureAction = createAction(UPDATE_MY_INFO_FAILURE);

export const loadPreferGroupsRequestAction = createAction(
  LOAD_PREFER_GROUPS_REQUEST
);
export const loadPreferGroupsSuccessAction = createAction(
  LOAD_PREFER_GROUPS_SUCCESS
);
export const loadPreferGroupsFailureAction = createAction(
  LOAD_PREFER_GROUPS_FAILURE
);

export const updatePreferLocationReuqestAction = createAction(
  UPDATE_PREFER_LOCATION_REQUEST
);
export const updatePreferLocationSuccessAction = createAction(
  UPDATE_PREFER_LOCATION_SUCCESS
);
export const updatePreferLocationFailureAction = createAction(
  UPDATE_PREFER_LOCATION_FAILURE
);

const reducer = (state = initialState, action) => {
  return produce(state, (draft) => {
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
      case WITHDRAW_MEMBER_REQUEST: {
        break;
      }
      case WITHDRAW_MEMBER_SUCCESS: {
        draft.me = {};
        break;
      }
      case WITHDRAW_MEMBER_FAILURE: {
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
        draft.me.PreferLocations = action.data;
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
        draft.me.PreferCategories = action.data;
        break;
      }
      case ADD_CATEGORY_FAILURE: {
        break;
      }
      case LOAD_MY_INFO_REQUEST: {
        break;
      }
      case LOAD_MY_INFO_SUCCESS: {
        draft.me = { ...draft.me, ...action.data };
        break;
      }
      case LOAD_MY_INFO_FAILURE: {
        break;
      }
      case UPDATE_MY_INFO_REQUEST: {
        break;
      }
      case UPDATE_MY_INFO_SUCCESS: {
        draft.me.profileImg = action.data.profileImg;
        draft.me.email = action.data.email;
        draft.me.telephone = action.data.telephone;
        break;
      }
      case UPDATE_MY_INFO_FAILURE: {
        break;
      }
      case LOAD_PREFER_GROUPS_REQUEST: {
        break;
      }
      case LOAD_PREFER_GROUPS_SUCCESS: {
        draft.me.preferGroups = action.data;
        break;
      }
      case LOAD_PREFER_GROUPS_FAILURE: {
        break;
      }
      case UPDATE_PREFER_LOCATION_REQUEST: {
        break;
      }
      case UPDATE_PREFER_LOCATION_SUCCESS: {
        draft.me.PreferLocations = action.data;
        break;
      }
      case UPDATE_PREFER_LOCATION_FAILURE: {
        break;
      }

      default:
        break;
    }
  });
};

export default reducer;
