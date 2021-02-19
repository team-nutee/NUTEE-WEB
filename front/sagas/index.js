import { all, fork } from 'redux-saga/effects';
import axios from 'axios';
import user from './user';
import post from './post';
import notice from './notice';
import { TARGET_URL } from '../static';

axios.defaults.baseURL = TARGET_URL;
axios.defaults.withCredentials = true;
const accessToken = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
if (accessToken === null) {
  console.log('saga-index token null');
} else {
  axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
}

/*  axios.interceptors.request.use(
    function (config) {
        let accessToken = window.sessionStorage.getItem('accessToken');
        config.headers.authorization = `Bearer ${accessToken}`;
        return config;
    },
    function (error) {
        console.log(error);
        return Promise.reject(error);
    }
);  */

export default function* rootSaga() {
  yield all([
    fork(user),
    fork(post),
    fork(notice),
  ]);
}
