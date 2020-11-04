import { all, put, fork, takeLatest, call } from 'redux-saga/effects';
import customAxios from '../utils/baseAxios';
import {
  LOAD_CATEGORYS_REQUEST,
  loadCategorysSuccessAction,
  loadCategorysFailureAction,
  LOAD_CATEGORY_REQUEST,
  loadCategorySuccessAction,
  loadCategoryFailureAction
} from '../reducers/category';

function loadCategoryAPI() {
  return customAxios.get(`/categorys`);
}
function* loadCategory() {
  try {
    const categories = yield call(loadCategoryAPI);
    yield put(loadCategorySuccessAction(categories.data));
  } catch (err) {
    console.error(err);
    yield put(loadCategoryFailureAction(err));
  }
}

function* watchLoadCategory() {
  yield takeLatest(LOAD_CATEGORY_REQUEST, loadCategory);
}

function loadCategorysAPI() {
  return customAxios.get(`/categorys/detail`);
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
  yield all([fork(watchLoadCategorys), fork(watchLoadCategory)]);
}
