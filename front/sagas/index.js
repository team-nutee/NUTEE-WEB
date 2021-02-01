import {all,fork} from 'redux-saga/effects';
import user from './user';
import post from './post';
import notice from './notice';
import axios from "axios";
import {TARGET_URL} from "../static";

//axios.defaults.headers.get['Content-Type'] = 'application/json';
//axios.defaults.headers.get['Accept'] = 'application/json';

//axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
//axios.defaults.headers.post['Accept'] = 'application/json';

//axios.defaults.baseURL = `${TARGET_URL}/api`;

export default function* rootSaga(){
    yield all([
        fork(user),
        fork(post),
        fork(notice),
    ]);
}