import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import { LOAD_HAKSA_NOTICE_FAILURE,
  LOAD_HAKSA_NOTICE_REQUEST,
  LOAD_HAKSA_NOTICE_SUCCESS,
  LOAD_SOOUP_NOTICE_REQUEST,
  LOAD_SOOUP_NOTICE_SUCCESS,
  LOAD_SOOUP_NOTICE_FAILURE,
  LOAD_HAKJUM_NOTICE_REQUEST,
  LOAD_HAKJUM_NOTICE_SUCCESS,
  LOAD_HAKJUM_NOTICE_FAILURE,
  LOAD_JANGHAK_NOTICE_REQUEST,
  LOAD_JANGHAK_NOTICE_SUCCESS,
  LOAD_JANGHAK_NOTICE_FAILURE,
  LOAD_ILBAN_NOTICE_REQUEST,
  LOAD_ILBAN_NOTICE_SUCCESS,
  LOAD_ILBAN_NOTICE_FAILURE,
  LOAD_HANGSA_NOTICE_REQUEST,
  LOAD_HANGSA_NOTICE_SUCCESS,
  LOAD_HANGSA_NOTICE_FAILURE,
} from '../reducers/notice';

function getHaksaNoticeAPI() {
  return axios.get('http://3.34.61.71:9709/crawl/haksa', { data: {} });
}

function* getHaksaNotice(action) {
  try {
    const result = yield call(getHaksaNoticeAPI, action.data);
    yield put({
      type: LOAD_HAKSA_NOTICE_SUCCESS,
      data: result.data.body,
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: LOAD_HAKSA_NOTICE_FAILURE,
      error: e.name,
    });
  }
}

function getSooupNoticeAPI() {
  return axios.get('http://3.34.61.71:9709/crawl/sooup', { data: {} });
}

function* getSooupNotice(action) {
  try {
    const result = yield call(getSooupNoticeAPI, action.data);
    yield put({
      type: LOAD_SOOUP_NOTICE_SUCCESS,
      data: result.data.body,
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: LOAD_SOOUP_NOTICE_FAILURE,
      error: e,
    });
  }
}

function getHakjumNoticeAPI() {
  return axios.get('http://3.34.61.71:9709/crawl/hakjum', { data: {} });
}

function* getHakjumNotice(action) {
  try {
    const result = yield call(getHakjumNoticeAPI, action.data);
    yield put({
      type: LOAD_HAKJUM_NOTICE_SUCCESS,
      data: result.data.body,
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: LOAD_HAKJUM_NOTICE_FAILURE,
      error: e,
    });
  }
}

function getJanghakNoticeAPI() {
  return axios.get('http://3.34.61.71:9709/crawl/janghak', { data: {} });
}

function* getJanghakNotice(action) {
  try {
    const result = yield call(getJanghakNoticeAPI, action.data);
    yield put({
      type: LOAD_JANGHAK_NOTICE_SUCCESS,
      data: result.data.body,
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: LOAD_JANGHAK_NOTICE_FAILURE,
      error: e,
    });
  }
}

function getIlbanNoticeAPI() {
  return axios.get('http://3.34.61.71:9709/crawl/ilban', { data: {} });
}

function* getIlbanNotice(action) {
  try {
    const result = yield call(getIlbanNoticeAPI, action.data);
    yield put({
      type: LOAD_ILBAN_NOTICE_SUCCESS,
      data: result.data.body,
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: LOAD_ILBAN_NOTICE_FAILURE,
      error: e,
    });
  }
}

function getHangsaNoticeAPI() {
  return axios.get('http://3.34.61.71:9709/crawl/hangsa', { data: {} });
}

function* getHangsaNotice(action) {
  try {
    const result = yield call(getHangsaNoticeAPI, action.data);
    yield put({
      type: LOAD_HANGSA_NOTICE_SUCCESS,
      data: result.data.body,
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: LOAD_HANGSA_NOTICE_FAILURE,
      error: e,
    });
  }
}

function* watchGetHaksaNotice() {
  yield takeEvery(LOAD_HAKSA_NOTICE_REQUEST, getHaksaNotice);
}

function* watchGetSooupNotice() {
  yield takeEvery(LOAD_SOOUP_NOTICE_REQUEST, getSooupNotice);
}

function* watchGetHakjumNotice() {
  yield takeEvery(LOAD_HAKJUM_NOTICE_REQUEST, getHakjumNotice);
}

function* watchGetJanghakNotice() {
  yield takeEvery(LOAD_JANGHAK_NOTICE_REQUEST, getJanghakNotice);
}

function* watchGetIlbanNotice() {
  yield takeEvery(LOAD_ILBAN_NOTICE_REQUEST, getIlbanNotice);
}

function* watchGetHangsaNotice() {
  yield takeEvery(LOAD_HANGSA_NOTICE_REQUEST, getHangsaNotice);
}

export default function* noticeSaga() {
  yield all([
    fork(watchGetHaksaNotice),
    fork(watchGetSooupNotice),
    fork(watchGetHakjumNotice),
    fork(watchGetJanghakNotice),
    fork(watchGetIlbanNotice),
    fork(watchGetHangsaNotice),
  ]);
}
