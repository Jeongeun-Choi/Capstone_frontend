import { all, fork, takeLatest, put, delay, call } from 'redux-saga/effects';
import customAxios from '../utils/baseAxios';

import {
  LOG_IN_REQUEST,
  loginFailureAction,
  loginSuccessAction,
  SIGN_UP_REQUEST,
  signupFailureAction,
  logoutFailureAction,
  logoutSuccessAction,
  LOG_OUT_REQUEST,
  loadJoingroupsFailureAction,
  loadJoingroupsSuccessAction,
  LOAD_JOINGROUPS_REQUEST,
  addCategoryFailureAction,
  addCategorySuccessAction,
  ADD_CATEGORY_REQUEST,
  addLocationSuccessAction,
  addLocationFailureAction,
  deleteLocationSuccessAction,
  deleteLocationFailureAction,
  DELETE_LOCATION_REQUEST,
  UPDATE_LOCATION_REQUEST,
  updateLocationFailureAction,
  updateLocationSuccessAction,
  ADD_LOCATION_REQUEST,
  LOAD_APPLYGROUPS_REQUEST,
  loadApplyGroupsFailureAction,
  loadApplyGroupsSuccessAction,
  LOAD_MY_INFO_REQUEST,
  loadMyInfoSuccessAction,
  loadMyInfoFailureAction,
  LOAD_PREFER_GROUPS_REQUEST,
  loadPreferGroupsSuccessAction,
  loadPreferGroupsFailureAction,
  UPDATE_MY_INFO_REQUEST,
  updateMyInfoSuccessAction,
  updateMyInfoFailureAction,
  UPDATE_PREFER_LOCATION_REQUEST,
  updatePreferLocationSuccessAction,
  updatePreferLocationFailureAction,
  withdrawSuccessAction,
  WITHDRAW_MEMBER_REQUEST,
  withdrawFailureAction,
  loadRecruitsSuccessAction,
  loadRecruitsFailureAction,
  LOAD_RECRUITS_REQUEST,
} from '../reducers/user';

function loadRecruitsAPI(data) {
  const { id } = data;
  return customAxios.get(`/recruits/member/${id}`);
}

function* loadRecruits(action) {
  try {
    const response = yield call(loadRecruitsAPI, action.data);
    yield put(loadRecruitsSuccessAction(response.data));
  } catch (err) {
    yield put(loadRecruitsFailureAction(err));
  }
}
function* watchLoadRecruits() {
  yield takeLatest(LOAD_RECRUITS_REQUEST, loadRecruits);
}

function loadJoinGroupsAPI(data) {
  const { id } = data;
  return customAxios.get(`/join-group/${id}`);
}

function* loadJoinGroups(action) {
  try {
    const response = yield call(loadJoinGroupsAPI, action.data);
    yield put(loadJoingroupsSuccessAction(response.data));
  } catch (err) {
    yield put(loadJoingroupsFailureAction(err));
  }
}
function* watchLoadJoinGroups() {
  yield takeLatest(LOAD_JOINGROUPS_REQUEST, loadJoinGroups);
}

function loadApplyGroupsAPI(data) {
  const { id } = data;
  return customAxios.get(`/apply-group/${id}`);
}
function* loadApplyGroups(action) {
  try {
    const response = yield call(loadApplyGroupsAPI, action.data);
    yield put(loadApplyGroupsSuccessAction(response.data));
  } catch (err) {
    yield put(loadApplyGroupsFailureAction(err));
  }
}
function* watchLoadApplyGroups() {
  yield takeLatest(LOAD_APPLYGROUPS_REQUEST, loadApplyGroups);
}

function logInAPI(data) {
  return customAxios.post('/member/login', data);
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
  return customAxios.post('/member/join', data);
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
  return customAxios.delete('/member/logout');
}
function* logOut() {
  try {
    yield call(logOutAPI);
    yield put(logoutSuccessAction());
  } catch (err) {
    yield put(logoutFailureAction(err));
  }
}

function* watchLogOut() {
  yield takeLatest(LOG_OUT_REQUEST, logOut);
}

function withdrawMemberAPI() {
  return customAxios.delete('/member');
}
function* withdrawMember() {
  try {
    yield call(withdrawMemberAPI);
    yield put(withdrawSuccessAction());
  } catch (err) {
    yield put(withdrawFailureAction(err));
  }
}

function* watchWithdrawMember() {
  yield takeLatest(WITHDRAW_MEMBER_REQUEST, withdrawMember);
}

function addLocationAPI(data) {
  const { memberId, locations } = data;

  const newLocations = locations.reduce((acc, location) => {
    const { sido, sigungu, bname } = location;
    acc.push({ address: `${sido} ${sigungu} ${bname}` });
    return acc;
  }, []);

  const requestData = { memberId, locations: newLocations };

  return customAxios.put('/member/location', requestData);
}
function* addLocation(action) {
  try {
    const response = yield call(addLocationAPI, action.data);
    const data = response.data.preferLocations;
    yield put(addLocationSuccessAction(data));
  } catch (err) {
    yield put(addLocationFailureAction(err));
  }
}
function* watchAddLocation() {
  yield takeLatest(ADD_LOCATION_REQUEST, addLocation);
}

function updateLocationAPI(data) {
  const { memberId, locationAddress, deleteLocations } = data;

  const requestData = { memberId, locationAddress, deleteLocations };

  return customAxios.put('/member/location', requestData);
}
function* updateLocation(action) {
  try {
    const response = yield call(updateLocationAPI, action.data);
    yield put(updateLocationSuccessAction(response.data.preferLocations));
  } catch (err) {
    yield put(updateLocationFailureAction(err));
  }
}
function* watchUpdateLocation() {
  yield takeLatest(UPDATE_LOCATION_REQUEST, updateLocation);
}

function deleteLocationAPI(data) {
  const { memberId, locationAddress, deleteLocations } = data;

  const requestData = { memberId, locationAddress, deleteLocations };

  return customAxios.put('/member/location', requestData);
}
function* deleteLocation(action) {
  try {
    yield call(deleteLocationAPI, action.data);
    const data = action.data.fields;
    yield put(deleteLocationSuccessAction(data));
  } catch (err) {
    yield put(deleteLocationFailureAction(err));
  }
}
function* watchDeleteLocation() {
  yield takeLatest(DELETE_LOCATION_REQUEST, deleteLocation);
}

function addCategoryAPI(data) {
  const { memberId, categories } = data;

  const categoryIds = categories.map((category) => category.id);
  const requestData = { memberId, categoryIds };

  return customAxios.put('/member/category', requestData);
}

function* addCategory(action) {
  try {
    const response = yield call(addCategoryAPI, action.data);
    yield put(addCategorySuccessAction(response.data.preferCategory));
  } catch (err) {
    yield put(addCategoryFailureAction(err));
  }
}
function* watchAddCategory() {
  yield takeLatest(ADD_CATEGORY_REQUEST, addCategory);
}

function loadMyInfoAPI() {
  return customAxios.get('/member');
}
function* loadMyInfo() {
  try {
    const response = yield call(loadMyInfoAPI);
    yield put(loadMyInfoSuccessAction(response.data.info));
  } catch (err) {
    yield put(loadMyInfoFailureAction(err));
  }
}

function* watchLoadMyInfo() {
  yield takeLatest(LOAD_MY_INFO_REQUEST, loadMyInfo);
}

function updateMyInfoAPI(data) {
  return customAxios.put('/member', data);
}
function* updateMyInfo(action) {
  try {
    yield call(updateMyInfoAPI, action.data);
    yield put(updateMyInfoSuccessAction(action.data));
  } catch (err) {
    yield put(updateMyInfoFailureAction(err));
  }
}

function* watchUpdateMyInfo() {
  yield takeLatest(UPDATE_MY_INFO_REQUEST, updateMyInfo);
}

function loadPreferGroupsAPI(data) {
  return customAxios.get(`/prefer-group/${data}`);
}
function* loadPreferGroups(action) {
  try {
    const response = yield call(loadPreferGroupsAPI, action.data);

    yield put(loadPreferGroupsSuccessAction(response.data));
  } catch (err) {
    yield put(loadPreferGroupsFailureAction(err));
  }
}

function* watchLoadPreferGroups() {
  yield takeLatest(LOAD_PREFER_GROUPS_REQUEST, loadPreferGroups);
}

function updatePreferLocationAPI(data) {
  return customAxios.put(`/member/location`, data);
}
function* updatePreferLocation(action) {
  try {
    const response = yield call(updatePreferLocationAPI, action.data);

    yield put(updatePreferLocationSuccessAction(response.data.preferLocations));
  } catch (err) {
    yield put(updatePreferLocationFailureAction(err));
  }
}

function* watchUpdatePreferLocation() {
  yield takeLatest(UPDATE_PREFER_LOCATION_REQUEST, updatePreferLocation);
}

export default function* userSaga() {
  yield all([
    fork(watchLoadRecruits),
    fork(watchLoadJoinGroups),
    fork(watchLoadApplyGroups),
    fork(watchLogIn),
    fork(watchSignup),
    fork(watchLogOut),
    fork(watchWithdrawMember),
    fork(watchAddLocation),
    fork(watchUpdateLocation),
    fork(watchDeleteLocation),
    fork(watchAddCategory),
    fork(watchLoadMyInfo),
    fork(watchUpdateMyInfo),
    fork(watchLoadPreferGroups),
    fork(watchUpdatePreferLocation),
  ]);
}
