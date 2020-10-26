import { all, put, fork, takeLatest, delay, call } from 'redux-saga/effects';
import axios from 'axios';
import {
  deleteGroupFailureAction,
  updateGroupFailureAction,
  addGroupFailureAction,
  LOAD_GROUPS_REQUEST,
  loadGroupsSuccessAction,
  loadGroupsFailureAction,
  ADD_GROUP_REQUEST,
  addGroupSuccessAction,
  UPDATE_GROUP_REQUEST,
  updateGroupSuccessAction,
  DELETE_GROUP_REQUEST,
  deleteGroupSuccessAction
} from '../reducers/group';

function loadGroupsAPI() {
  return axios.get(`/groups`);
}

function* loadGroups() {
  try {
    const response = yield call(loadGroupsAPI);
    yield put(loadGroupsSuccessAction(response.data));
  } catch (err) {
    yield loadGroupsFailureAction(err);
  }
}

function* watchLoadGroups() {
  yield takeLatest(LOAD_GROUPS_REQUEST, loadGroups);
}

function addGroupAPI(data) {
  return axios.post(`/groups`, data);
}

function* addGroup(action) {
  try {
    yield call(addGroupAPI, action.data);
    yield put(addGroupSuccessAction(action.data));
  } catch (err) {
    yield addGroupFailureAction(err);
  }
}

function* watchAddGroup() {
  yield takeLatest(ADD_GROUP_REQUEST, addGroup);
}

function updateGroupAPI(data) {}

function* updateGroup(action) {
  try {
    yield call(updateGroupAPI, action.data);
    yield put(updateGroupSuccessAction(action.data));
  } catch (err) {
    yield updateGroupFailureAction(err);
  }
}

function* watchUpdateGroup() {
  yield takeLatest(UPDATE_GROUP_REQUEST, updateGroup);
}

function deleteGroupAPI(data) {}

function* deleteGroup(action) {
  try {
    yield delay(1000);
    yield put(deleteGroupSuccessAction());
  } catch (err) {
    yield deleteGroupFailureAction(err);
  }
}

function* watchDeleteGroup() {
  yield takeLatest(DELETE_GROUP_REQUEST, deleteGroup);
}

export default function* postSaga() {
  yield all([
    fork(watchLoadGroups),
    fork(watchAddGroup),
    fork(watchUpdateGroup),
    fork(watchDeleteGroup)
  ]);
}
