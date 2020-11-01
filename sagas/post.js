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
  deletePostFailureAction
} from '../reducers/post';

function loadPostsAPI(data) {
  const { categoryId } = data;
  return customAxios.get(`/recruits?categoryid=${categoryId}`);
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

function addPostAPI(data) {}

function* addPost(action) {
  try {
    yield delay(1000);
    yield put(addPostSuccessAction());
  } catch (err) {
    yield addPostFailureAction(err);
  }
}

function* watchAddPost() {
  yield takeLatest(ADD_POST_REQUEST, addPost);
}

function updatePostAPI(data) {}

function* updatePost(action) {
  try {
    yield delay(1000);
    yield put(updatePostSuccessAction());
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
    fork(watchDeletePost)
  ]);
}
