import { all, put, fork, takeLatest, delay, call } from 'redux-saga/effects';
import axios from 'axios';
import {
  LOAD_CATEGORYS_REQUEST,
  LOAD_DETAILCATEGORYS_REQUEST,
  ADD_LOCATIONCATEGORY_REQUEST,
  loadCategorysSuccessAction,
  loadCategorysFailureAction,
  addLocationCategoryFailureAction,
  addLocationCategorySuccessAction
} from '../reducers/category';
import { addLocationsAction, addFieldsAction } from '../reducers/user';

function loadCategorysAPI() {
  return axios.get(`/categorys`);
}
function* loadCategorys() {
  try {
    const categorys = yield call(loadCategorysAPI);
    yield put(loadCategorysSuccessAction(categorys));
  } catch (err) {
    console.error(err);
    yield put(loadCategorysFailureAction(err));
  }
}
function* watchLoadCategorys() {
  yield takeLatest(LOAD_CATEGORYS_REQUEST, loadCategorys);
}

function loadDetailCategorysAPI(categoryId) {
  return axios.get(`/category/${categoryId}`);
}
function* loadDetailCategorys(action) {
  try {
    const { categoryId } = action.data;
    const detailCategorys = yield call(loadDetailCategorysAPI, categoryId);
    yield put(loadCategorysSuccessAction(detailCategorys));
  } catch (err) {
    console.error(err);
    yield put(loadCategorysFailureAction(err));
  }
}
function* watchLoadDetailCategorys() {
  yield takeLatest(LOAD_DETAILCATEGORYS_REQUEST, loadDetailCategorys);
}

function addLocationCategoryAPI(data) {}
function* addLocationCategory(action) {
  try {
    const { email, locations, fields } = action.data;
    yield call(addLocationCategoryAPI, action.data);
    yield put(addLocationCategorySuccessAction());
    yield put(addLocationsAction({ locations }));
    yield put(addFieldsAction({ fields }));
  } catch (err) {
    console.error(err);
    yield put(addLocationCategoryFailureAction(err));
  }
}
function* watchAddLocationCategory() {
  yield takeLatest(ADD_LOCATIONCATEGORY_REQUEST, addLocationCategory);
}

export default function* categorySaga() {
  yield all([
    fork(watchLoadCategorys),
    fork(watchLoadDetailCategorys),
    fork(watchAddLocationCategory)
  ]);
}
