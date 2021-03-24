import { all, fork } from 'redux-saga/effects';
import axios from 'axios';
import user from './user';
import post from './post';
import notice from './notice';

axios.defaults.withCredentials = true;

const accessToken = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
if (accessToken !== null) {
  axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
}

export default function* rootSaga() {
  yield all([
    fork(user),
    fork(post),
    fork(notice),
  ]);
}
