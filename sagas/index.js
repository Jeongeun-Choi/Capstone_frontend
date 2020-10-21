import { all, fork } from 'redux-saga/effects';

import postSaga from './post';
import userSaga from './user';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:5000/api';

export default function* rootSaga() {
  yield all([fork(userSaga), fork(postSaga)]);
}
