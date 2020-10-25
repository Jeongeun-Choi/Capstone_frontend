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
    memberId: undefined,
    userName: undefined,
    email: undefined,
    phoneNumber: undefined,
    birthDate: undefined,

    locations: [], //활동지역
    fields: [], //관심분야

    preferGroups: [],
    applyGroups: [], //내가 지원한 모임
    joinGroups: {
      activeTeams: [],
      inactiveTeams: []
    } //나의 모임
  }
};

const dummyUser = data => ({
  ...data,
  userName: '정은',
  email: 'jeong@test.com'
});

export const LOG_IN_REQUEST = 'LOG_IN_REQUEST';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE';

export const LOG_OUT_REQUEST = 'LOG_OUT_REQUEST';
export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS';
export const LOG_OUT_FAILURE = 'LOG_OUT_FAILURE';

export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE';

export const ADD_LOCATIONS = 'ADD_LOCATIONS';
export const ADD_FIELDS = 'ADD_FIELDS';

export const loginRequestAction = createAction(LOG_IN_REQUEST);
export const loginSuccessAction = createAction(LOG_IN_SUCCESS);
export const loginFailureAction = createAction(LOG_IN_FAILURE);

export const logoutRequestAction = createAction(LOG_OUT_REQUEST);
export const logoutSuccessAction = createAction(LOG_OUT_SUCCESS);
export const logoutFailureAction = createAction(LOG_OUT_FAILURE);

export const signupRequestAction = createAction(SIGN_UP_REQUEST);
export const signupSuccessAction = createAction(SIGN_UP_SUCCESS);
export const signupFailureAction = createAction(SIGN_UP_FAILURE);

export const addLocationsAction = createAction(ADD_LOCATIONS);
export const addFieldsAction = createAction(ADD_FIELDS);

const reducer = (state = initialState, action) => {
  return produce(state, draft => {
    switch (action.type) {
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
      case ADD_LOCATIONS: {
        draft.me.locations = action.data;
        break;
      }
      case ADD_FIELDS: {
        draft.me.fields = action.data;
        break;
      }
      default:
        return state;
    }
  });
};

export default reducer;
