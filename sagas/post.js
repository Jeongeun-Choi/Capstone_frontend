import { all, put, fork, takeLatest, delay, call } from 'redux-saga/effects';
import customAxios from '../utils/baseAxios';
import {
  LOAD_POSTS_REQUEST,
  loadPostsSuccessAction,
  loadPostsFailureAction,
  ADD_POST_REQUEST,
  addPostSuccessAction,
  addPostFailureAction,
  updatePostSuccessAction,
  updatePostFailureAction,
  UPDATE_POST_REQUEST,
  deletePostSuccessAction,
  DELETE_POST_REQUEST,
  deletePostFailureAction,
} from '../reducers/post';

function loadPostsAPI(data) {
  const { categoryId, recruitName } = data;
  const query =
    categoryId && recruitName
      ? `?categoryId=${categoryId}&recruitName=${recruitName}`
      : `?categoryId=${categoryId}`;
  return customAxios.get(`/recruits${query}`);
}

function* loadPosts(action) {
  try {
    const postsData = yield call(loadPostsAPI, action.data);
    yield put(loadPostsSuccessAction(postsData.data.recruits));
  } catch (err) {
    yield put(loadPostsFailureAction(err));
  }
}

function* watchLoadPosts() {
  yield takeLatest(LOAD_POSTS_REQUEST, loadPosts);
}

function addPostAPI(data) {
  console.log(data);
  return customAxios.post(`/recruits`, data);
}

function* addPost(action) {
  try {
    const postData = yield call(addPostAPI, action.data);
    yield put(
      addPostSuccessAction({ id: postData.data.recruitId, ...action.data })
    );
  } catch (err) {
    yield addPostFailureAction(err);
  }
}

function* watchAddPost() {
  yield takeLatest(ADD_POST_REQUEST, addPost);
}

function updatePostAPI(data) {
  return customAxios.put(`/recruits`, data);
}

function* updatePost(action) {
  try {
    yield call(updatePostAPI, action.data);
    yield put(updatePostSuccessAction(action.data));
  } catch (err) {
    yield updatePostFailureAction(err);
  }
}

function* watchUpdatePost() {
  yield takeLatest(UPDATE_POST_REQUEST, updatePost);
}

function deletePostAPI(data) {}

function* deletePost(action) {
  try {
    yield delay(1000);
    yield put(deletePostSuccessAction());
  } catch (err) {
    yield deletePostFailureAction(err);
  }
}

function* watchDeletePost() {
  yield takeLatest(DELETE_POST_REQUEST, deletePost);
}

export default function* postSaga() {
  yield all([
    fork(watchLoadPosts),
    fork(watchAddPost),
    fork(watchUpdatePost),
    fork(watchDeletePost),
  ]);
}
