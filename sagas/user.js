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
  UPDATE_CATEGORY_REQUEST,
  updateCategoryFailureAction,
  updateCategorySuccessAction,
  UPDATE_LOCATION_REQUEST,
  updateLocationFailureAction,
  updateLocationSuccessAction,
  ADD_LOCATION_REQUEST,
  deleteCategorySuccessAction,
  deleteCategoryFailureAction,
  DELETE_CATEGORY_REQUEST,
  LOAD_APPLYGROUPS_REQUEST,
  loadApplyGroupsFailureAction,
  loadApplyGroupsSuccessAction
} from '../reducers/user';

function loadJoinGroupsAPI(data) {
  return axios.get(`/join-group/${data}`);
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
  return axios.get(`/apply-group/${data}`);
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

function addLocationAPI(data) {
  const { memberId, locations } = data;

  const locationAddresses = locations.reduce((acc, location) => {
    const { sido, sigungu, bname } = location;
    acc.push(`${sido} ${sigungu} ${bname}`);
    return acc;
  }, []);

  const requestData = { memberId, locationAddresses };

  return axios.put('/member/location', requestData);
}
function* addLocation(action) {
  try {
    yield call(addLocationAPI, action.data);
    const data = action.data.locations;
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

  return axios.put('/member/location', requestData);
}
function* updateLocation(action) {
  try {
    yield call(updateLocationAPI, action.data);
    const data = action.data.fields;
    yield put(updateLocationSuccessAction(data));
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

  return axios.put('/member/location', requestData);
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
  const { memberId, fields } = data;

  const newCategorys = fields.reduce((acc, field) => {
    acc.push(field.id);
    return acc;
  }, []);

  const requestData = { memberId, newCategorys };

  return axios.put('/member/category', requestData);
}

function* addCategory(action) {
  try {
    yield call(addCategoryAPI, action.data);
    const data = action.data.fields;
    yield put(addCategorySuccessAction(data));
  } catch (err) {
    yield put(addCategoryFailureAction(err));
  }
}
function* watchAddCategory() {
  yield takeLatest(ADD_CATEGORY_REQUEST, addCategory);
}

function updateCategoryAPI(data) {
  const { memberId, categorys, deleteCategory } = data;

  const newCategorys = categorys.reduce((acc, category) => {
    return acc.push(category.id);
  }, []);

  const requestData = { memberId, newCategorys, deleteCategory };

  return axios.put('/member/category', requestData);
}

function* updateCategory(action) {
  try {
    yield call(updateCategoryAPI, action.data);
    const data = action.data.categorys;
    yield put(updateCategorySuccessAction(data));
  } catch (err) {
    yield put(updateCategoryFailureAction(err));
  }
}
function* watchUpdateCategory() {
  yield takeLatest(UPDATE_CATEGORY_REQUEST, updateCategory);
}

function deleteCategoryAPI(data) {
  const { memberId, fields } = data;

  const newCategorys = fields.reduce((acc, field) => {
    return acc.push(field.id);
  }, []);

  const requestData = { memberId, newCategorys };

  return axios.put('/member/category', requestData);
}

function* deleteCategory(action) {
  try {
    yield call(deleteCategoryAPI, action.data);
    const data = action.data.fields;
    yield put(deleteCategorySuccessAction(data));
  } catch (err) {
    yield put(deleteCategoryFailureAction(err));
  }
}
function* watchDeleteCategory() {
  yield takeLatest(DELETE_CATEGORY_REQUEST, deleteCategory);
}
export default function* userSaga() {
  yield all([
    fork(watchLoadJoinGroups),
    fork(watchLogIn),
    fork(watchSignup),
    fork(watchLogOut),
    fork(watchAddLocation),
    fork(watchUpdateLocation),
    fork(watchDeleteLocation),
    fork(watchAddCategory),
    fork(watchUpdateCategory),
    fork(watchDeleteCategory),
    fork(watchLoadApplyGroups)
  ]);
}
