import { all, fork, takeLatest, put, delay, call } from 'redux-saga/effects';
import axios from 'axios';

import {
  LOG_IN_REQUEST,
  loginFailureAction,
  loginSuccessAction,
  SIGN_UP_REQUEST,
  signupFailureAction,
  logoutFailureAction,
  logoutSuccessAction,
  LOG_OUT_REQUEST
} from '../reducers/user';

function logInAPI(data) {
  return axios.post('/member/login', data);
}
function* logIn(action) {
  try {
    const response = yield call(logInAPI, action.data);
    yield put(loginSuccessAction(response.data));
  } catch (err) {
    yield put(loginFailureAction(err));
  }
}
function* watchLogIn() {
  yield takeLatest(LOG_IN_REQUEST, logIn);
}

function signupAPI(data) {
  return axios.post('/member/join', data);
}
function* signup(action) {
  try {
    yield call(signupAPI, action.data);
    yield put(signupSuccessAction());
  } catch (err) {
    yield put(signupFailureAction(err));
  }
}
function* watchSignup() {
  yield takeLatest(SIGN_UP_REQUEST, signup);
}

function logOutAPI() {
  return axios.delete('/member/logout');
}
function* logOut(action) {
  try {
    yield delay(1000);
    const { email, password } = action.data;
    yield put(logoutSuccessAction({ email, password }));
  } catch (err) {
    yield put(logoutFailureAction(err));
  }
}
function* watchLogOut() {
  yield takeLatest(LOG_OUT_REQUEST, logOut);
}

export default function* userSaga() {
  yield all([fork(watchLogIn), fork(watchSignup), fork(watchLogOut)]);
}
