import { all, fork } from 'redux-saga/effects';

import postSaga from './post';
import userSaga from './user';
import categorySaga from './category';
import groupSaga from './group';
import axios from 'axios';

axios.defaults.baseURL = 'https://modugroup.tk/api';

export default function* rootSaga() {
  yield all([
    fork(userSaga),
    fork(postSaga),
    fork(categorySaga),
    fork(groupSaga)
  ]);
}
