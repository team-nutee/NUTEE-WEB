import {all,fork} from 'redux-saga/effects';
import user from './user';
import post from './post';
import notice from './notice';
import axios from "axios";
import {TARGET_URL} from "../static";

axios.defaults.baseURL = `${TARGET_URL}/api`;

export default function* rootSaga(){
    yield all([
        fork(user),
        fork(post),
        fork(notice),
    ]);
}