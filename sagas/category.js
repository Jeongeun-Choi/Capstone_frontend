import { all, put, fork, takeLatest, delay, call } from 'redux-saga/effects';
import axios from 'axios';
import {
  LOAD_CATEGORYS_REQUEST,
  loadCategorysSuccessAction,
  loadCategorysFailureAction
} from '../reducers/category';
function loadCategorysAPI() {
  return axios.get(`/categorys/detail`);
}
function* loadCategorys() {
  try {
    const categories = yield call(loadCategorysAPI);
    yield put(loadCategorysSuccessAction(categories.data));
  } catch (err) {
    console.error(err);
    yield put(loadCategorysFailureAction(err));
  }
}
function* watchLoadCategorys() {
  yield takeLatest(LOAD_CATEGORYS_REQUEST, loadCategorys);
}

export default function* categorySaga() {
  yield all([fork(watchLoadCategorys)]);
}
