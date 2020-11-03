import { all, put, fork, takeLatest, delay, call } from 'redux-saga/effects';
import customAxios from '../utils/baseAxios';
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
import { splitSkills } from '../utils/splitSkills';
import { makeActiveTimes } from '../utils/makeActiveTimes';

function loadGroupsAPI() {
  return customAxios.get(`/groups`);
}

function* loadGroups() {
  try {
    const response = yield call(loadGroupsAPI);
    yield put(loadGroupsSuccessAction(response.data));
  } catch (err) {
    yield put(loadGroupsFailureAction(err));
  }
}

function* watchLoadGroups() {
  yield takeLatest(LOAD_GROUPS_REQUEST, loadGroups);
}

function addGroupAPI(data) {
  const {
    memberId,
    groupName,
    groupIntro,
    activeDays,
    startTime,
    endTime,
    skills,
    location,
    maxMember,
    groupImages,
    category
  } = data;

  const newSkills = splitSkills(skills);
  const activeTimes = makeActiveTimes(activeDays, startTime, endTime);

  const requestData = {
    memberId,
    groupName,
    groupIntro,
    activeTimes,
    skills: newSkills,
    location,
    maxMember,
    groupImages,
    detailCategoryId: category
  };
  customAxios.post(`/groups`, requestData);
  return requestData;
}

function* addGroup(action) {
  try {
    const addData = yield call(addGroupAPI, action.data);
    yield put(addGroupSuccessAction({ id: addData.groupId, ...action.data }));
  } catch (err) {
    yield put(addGroupFailureAction(err));
  }
}

function* watchAddGroup() {
  yield takeLatest(ADD_GROUP_REQUEST, addGroup);
}

function updateGroupAPI(data) {
  const {
    memberId,
    groupName,
    groupIntro,
    activeDays,
    startTime,
    endTime,
    skills,
    location,
    maxMember,
    groupImages,
    detailCategoryIds,
    groupId
  } = data;

  const newSkills = splitSkills(skills);
  const activeTimes = makeActiveTimes(activeDays, startTime, endTime);

  const requestData = {
    memberId,
    groupName,
    groupIntro,
    activeTimes,
    skills: newSkills,
    location,
    maxMember,
    groupImages,
    detailCategoryIds,
    groupId
  };

  return customAxios.put('/groups', requestData);
}

function* updateGroup(action) {
  try {
    yield call(updateGroupAPI, action.data);
    yield put(updateGroupSuccessAction(action.data));
  } catch (err) {
    yield put(updateGroupFailureAction(err));
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
    yield put(deleteGroupFailureAction(err));
  }
}

function* watchDeleteGroup() {
  yield takeLatest(DELETE_GROUP_REQUEST, deleteGroup);
}

export default function* groupSaga() {
  yield all([
    fork(watchLoadGroups),
    fork(watchAddGroup),
    fork(watchUpdateGroup),
    fork(watchDeleteGroup)
  ]);
}
