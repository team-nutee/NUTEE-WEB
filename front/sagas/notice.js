import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import {TARGET_URL} from "../static";
import {LOAD_NOTICE_FAILURE, LOAD_NOTICE_REQUEST, LOAD_NOTICE_SUCCESS} from "../reducers/notice";

function getNoticeAPI() {
    // 서버에 요청을 보내는 부분
    return axios.get(`${TARGET_URL}/api/notice`);
}

function* getNotice(action) {
    try {
        const result = yield call(getNoticeAPI, action.data);
        yield put({ // put은 dispatch 동일
            type: LOAD_NOTICE_SUCCESS,
            data: result.data,
        });
    } catch (e) { // loginAPI 실패
        console.error(e);
        yield put({
            type: LOAD_NOTICE_FAILURE,
            error: e,
        });
    }
}

function* watchGetNotice() {
    yield takeEvery(LOAD_NOTICE_REQUEST, getNotice);
}

export default function* noticeSaga() {
    yield all([
        fork(watchGetNotice),
    ]);
}