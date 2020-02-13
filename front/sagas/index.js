import {all,fork} from 'redux-saga/effects';
import user from './user';
import post from './post';
import axios from "axios";

axios.defaults.baseURL = 'http://15.164.50.161:9425/api';

export default function* rootSaga(){
    yield all([
        fork(user),
        fork(post),
    ]);
}