import { all, fork } from 'redux-saga/effects';
import user from './user';
import post from './post';
import notice from './notice';
import axios from "axios";
import { TARGET_URL } from "../static";
import { token } from "../static";

axios.defaults.withCredentials = true;
axios.defaults.headers.common['Content-Type'] = 'application/json';

export default function* rootSaga() {
    yield all([
        fork(user),
        fork(post),
        fork(notice),
    ]);
}