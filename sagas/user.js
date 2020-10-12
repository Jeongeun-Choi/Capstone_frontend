import { all, fork, takeLatest, put, delay } from 'redux-saga/effects';
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

function logInAPI() {
  return axios.post('/member/login');
}
function* logIn(action) {
  try {
    yield delay(1000);
    const { email, password } = action.data;
    yield put(loginSuccessAction({ email, password }));
  } catch (err) {
    yield put(loginFailureAction(err));
  }
}
function* watchLogIn() {
  yield takeLatest(LOG_IN_REQUEST, logIn);
}

function signupAPI() {
  return axios.post('/member/join');
}
function* signup(action) {
  try {
    yield delay(1000);
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
