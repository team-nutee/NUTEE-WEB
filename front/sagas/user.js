import { all, call, fork, put, takeEvery,takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import {message} from 'antd';
import {
    EDIT_NICKNAME_FAILURE,
    EDIT_NICKNAME_REQUEST,
    EDIT_NICKNAME_SUCCESS,
    FOLLOW_USER_FAILURE,
    FOLLOW_USER_REQUEST,
    FOLLOW_USER_SUCCESS,
    LOAD_FOLLOWERS_FAILURE,
    LOAD_FOLLOWERS_REQUEST,
    LOAD_FOLLOWERS_SUCCESS,
    LOAD_FOLLOWINGS_FAILURE,
    LOAD_FOLLOWINGS_REQUEST,
    LOAD_FOLLOWINGS_SUCCESS,
    LOAD_USER_FAILURE,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOG_IN_FAILURE,
    LOG_IN_REQUEST,
    LOG_IN_SUCCESS,
    LOG_OUT_FAILURE,
    LOG_OUT_REQUEST,
    LOG_OUT_SUCCESS,
    REMOVE_FOLLOWER_FAILURE,
    REMOVE_FOLLOWER_REQUEST,
    REMOVE_FOLLOWER_SUCCESS,
    SIGN_UP_FAILURE,
    SIGN_UP_REQUEST,
    SIGN_UP_SUCCESS,
    OTP_CHECK_REQUEST,
    OTP_CHECK_SUCCESS,
    OTP_CHECK_FAILURE,
    UNFOLLOW_USER_FAILURE,
    UNFOLLOW_USER_REQUEST,
    UNFOLLOW_USER_SUCCESS,
    EMAIL_CHECK_REQUEST,
    EMAIL_CHECK_SUCCESS,
    EMAIL_CHECK_FAILURE,
    EMAIL_FIND_SUCCESS,
    EMAIL_FIND_FAILURE,
    EMAIL_FIND_REQUEST,
    PW_FIND_SUCCESS,
    PW_FIND_FAILURE,
    PW_FIND_REQUEST,
    EDIT_PWCK_REQUEST,
    EDIT_PWCK_FAILURE,
    EDIT_PWCK_SUCCESS,
    EDIT_PW_SUCCESS,
    EDIT_PW_FAILURE,
    EDIT_PW_REQUEST,
    UPLOAD_PROIMG_SUCCESS,
    UPLOAD_PROIMG_FAILURE, UPLOAD_PROIMG_REQUEST,
} from '../reducers/user';
import {UPLOAD_IMAGES_FAILURE, UPLOAD_IMAGES_REQUEST, UPLOAD_IMAGES_SUCCESS} from "../reducers/post";

function logInAPI(loginData) {
    // 서버에 요청을 보내는 부분
    return axios.post('/user/login', loginData, {
        withCredentials: true,
    });
}

function* logIn(action) {
    try {
        const result = yield call(logInAPI, action.data);
        yield put({ // put은 dispatch 동일
            type: LOG_IN_SUCCESS,
            data: result.data,
        });
    } catch (e) { // loginAPI 실패
        console.error(e);
        yield put({
            type: LOG_IN_FAILURE,
        });
    }
}

function* watchLogIn() {
    yield takeEvery(LOG_IN_REQUEST, logIn);
}

function signUpAPI(signUpData) {
    // 서버에 요청을 보내는 부분
    return axios.post('/user/', signUpData);
}

function* signUp(action) {
    try {
        yield call(signUpAPI, action.data);
            yield put({ // put은 dispatch 동일
            type: SIGN_UP_SUCCESS,
        });
    } catch (e) { // 회원가입 실패
        yield put({
            type: SIGN_UP_FAILURE,
            error: e,
        });
    }
}

function* watchSignUp() {
    yield takeEvery(SIGN_UP_REQUEST, signUp);
}

function otpCheckAPI(otp) {
    // 서버에 요청을 보내는 부분
    return axios.post('/user/otpcheck', otp);
}

function* otpCheck(action) {
    try {
        yield call(otpCheckAPI, action.data);
        yield put({ // put은 dispatch 동일
            type: OTP_CHECK_SUCCESS,
        });
    } catch (e) { // otp 인증 실패
        alert('otp 인증에 실패하셨습니다.');
        yield put({
            type: OTP_CHECK_FAILURE,
            error: e,
        });
    }
}

function* watchOtpCheck() {
    yield takeEvery(OTP_CHECK_REQUEST, otpCheck);
}

function emailCheckAPI(schoolEmail) {
    return axios.post('/user/otpsend', schoolEmail);
}

function* emailCheck(action) {
    try {
        yield call(emailCheckAPI, action.data);
        yield put({ // put은 dispatch 동일
            type: EMAIL_CHECK_SUCCESS,
        });
    } catch (e) { // 이메일 인증 실패
        alert('otp 인증에 실패하셨습니다.');
        yield put({
            type: EMAIL_CHECK_FAILURE,
            error: e,
        });
    }
}

function* watchEmailCheck() {
    yield takeEvery(EMAIL_CHECK_REQUEST, emailCheck);
}

function PWCheckAPI(password) {
    return axios.post('/user/passwordcheck', {password},{
        withCredentials:true,
    });
}

function* PWCheck(action) {
    try {
        const result = yield call(PWCheckAPI, action.data);
        yield put({ // put은 dispatch 동일
            type: EDIT_PWCK_SUCCESS,
            data: result.data,
        });
        message.success('비밀번호 확인 성공')
    } catch (e) { // 이메일 인증 실패
        message.error('현재 비밀번호를 다시 확인해주세요.');
        yield put({
            type: EDIT_PWCK_FAILURE,
            error: e,
        });
    }
}

function* watchPWCheck() {
    yield takeEvery(EDIT_PWCK_REQUEST, PWCheck);
}

function pwEditAPI(newpassword) {
    return axios.post('/user/passwordchange', {newpassword},{
        withCredentials:true,
    });
}

function* pwEdit(action) {
    try {
        const result = yield call(pwEditAPI, action.data);
        yield put({ // put은 dispatch 동일
            type: EDIT_PW_SUCCESS,
            data:result.data,
        });
        message.success('비밀번호 변경 성공')
    } catch (e) { // 비밀번호 인증 실패
        console.error(e);
        alert('비밀번호 변경에 실패하셨습니다.');
        yield put({
            type: EDIT_PW_FAILURE,
            error: e,
        });
    }
}

function* watchPwEdit() {
    yield takeEvery(EDIT_PW_REQUEST, pwEdit);
}

function uploadProfileImgAPI(formData) {
    return axios.post(`/user/profile`, formData, {
        withCredentials: true,
    });
}

function* uploadProfileImg(action) {
    try {
        const result = yield call(uploadProfileImgAPI, action.data);
        yield put({
            type: UPLOAD_PROIMG_SUCCESS,
            data: result.data,
        });
    } catch (e) {
        console.error(e);
        yield put({
            type: UPLOAD_PROIMG_FAILURE,
            error: e,
        });
    }
}

function* watchUploadProfileImg() {
    yield takeLatest(UPLOAD_PROIMG_REQUEST, uploadProfileImg);
}


function emailFindAPI(schoolEmail) {
    return axios.post('/user/findid', schoolEmail);
}

function* emailFind(action) {
    try {
        yield call(emailFindAPI, action.data);
        yield put({ // put은 dispatch 동일
            type: EMAIL_FIND_SUCCESS,
        });
    } catch (e) { // 이메일 인증 실패
        alert('이메일 찾기에 실패하셨습니다.');
        yield put({
            type: EMAIL_FIND_FAILURE,
            error: e,
        });
    }
}
function* watchEmailFind() {
    yield takeEvery(EMAIL_FIND_REQUEST, emailFind);
}

function pwFindAPI(data) {
    return axios.post('/user/reissuance', data);
}

function* pwFind(action) {
    try {
        yield call(pwFindAPI, action.data);
        yield put({ // put은 dispatch 동일
            type: PW_FIND_SUCCESS,
        });
    } catch (e) { // 이메일 인증 실패
        alert('비밀번호 찾기에 실패하셨습니다.');
        yield put({
            type: PW_FIND_FAILURE,
            error: e,
        });
    }
}

function* watchPwFind() {
    yield takeEvery(PW_FIND_REQUEST, pwFind);
}

function logOutAPI() {
    // 서버에 요청을 보내는 부분
    return axios.post('/user/logout', {}, {
        withCredentials: true,
    });
}

function* logOut() {
    try {
        // yield call(logOutAPI);
        yield call(logOutAPI);
        yield put({ // put은 dispatch 동일
            type: LOG_OUT_SUCCESS,
        });
    } catch (e) { // loginAPI 실패
        console.error(e);
        yield put({
            type: LOG_OUT_FAILURE,
            error: e,
        });
    }
}

function* watchLogOut() {
    yield takeEvery(LOG_OUT_REQUEST, logOut);
}

function loadUserAPI(userId) {
    // 서버에 요청을 보내는 부분
    return axios.get(userId ? `/user/${userId}` : '/user/', {
        withCredentials: true, // 클라이언트에서 요청 보낼 때는 브라우저가 쿠키를 같이 동봉해줘요
    }); // 서버사이드렌더링일 때는, 브라우저가 없어요.
}

function* loadUser(action) {
    try {
        const result = yield call(loadUserAPI, action.data);
        yield put({ // put은 dispatch 동일
            type: LOAD_USER_SUCCESS,
            data: result.data,
            me: !action.data,
        });
    } catch (e) { // loginAPI 실패
        console.error(e);
        yield put({
            type: LOAD_USER_FAILURE,
            error: e,
        });
    }
}

function* watchLoadUser() {
    yield takeEvery(LOAD_USER_REQUEST, loadUser);
}

function followAPI(userId) {
    // 서버에 요청을 보내는 부분
    return axios.post(`/user/${userId}/follow`, {}, {
        withCredentials: true,
    });
}

function* follow(action) {
    try {
        // yield call(followAPI);
        const result = yield call(followAPI, action.data);
        yield put({ // put은 dispatch 동일
            type: FOLLOW_USER_SUCCESS,
            data: result.data,
        });
    } catch (e) { // loginAPI 실패
        console.error(e);
        yield put({
            type: FOLLOW_USER_FAILURE,
            error: e,
        });
    }
}

function* watchFollow() {
    yield takeEvery(FOLLOW_USER_REQUEST, follow);
}

function unfollowAPI(userId) {
    // 서버에 요청을 보내는 부분
    return axios.delete(`/user/${userId}/follow`, {
        withCredentials: true,
    });
}

function* unfollow(action) {
    try {
        // yield call(unfollowAPI);
        const result = yield call(unfollowAPI, action.data);
        yield put({ // put은 dispatch 동일
            type: UNFOLLOW_USER_SUCCESS,
            data: result.data,
        });
    } catch (e) { // loginAPI 실패
        console.error(e);
        yield put({
            type: UNFOLLOW_USER_FAILURE,
            error: e,
        });
    }
}

function* watchUnfollow() {
    yield takeEvery(UNFOLLOW_USER_REQUEST, unfollow);
}

function loadFollowersAPI(userId, offset = 0, limit = 3) {
    // 서버에 요청을 보내는 부분
    return axios.get(`/user/${userId || 0}/followers?offset=${offset}&limit=${limit}`, {
        withCredentials: true,
    });
}

function* loadFollowers(action) {
    try {
        // yield call(loadFollowersAPI);
        const result = yield call(loadFollowersAPI, action.data, action.offset);
        yield put({ // put은 dispatch 동일
            type: LOAD_FOLLOWERS_SUCCESS,
            data: result.data,
        });
    } catch (e) { // loginAPI 실패
        console.error(e);
        yield put({
            type: LOAD_FOLLOWERS_FAILURE,
            error: e,
        });
    }
}

function* watchLoadFollowers() {
    yield takeEvery(LOAD_FOLLOWERS_REQUEST, loadFollowers);
}

function loadFollowingsAPI(userId, offset = 0, limit = 3) {
    // 서버에 요청을 보내는 부분
    return axios.get(`/user/${userId || 0}/followings?offset=${offset}&limit=${limit}`, {
        withCredentials: true,
    });
}

function* loadFollowings(action) {
    try {
        // yield call(loadFollowersAPI);
        const result = yield call(loadFollowingsAPI, action.data, action.offset);
        yield put({ // put은 dispatch 동일
            type: LOAD_FOLLOWINGS_SUCCESS,
            data: result.data,
        });
    } catch (e) { // loginAPI 실패
        console.error(e);
        yield put({
            type: LOAD_FOLLOWINGS_FAILURE,
            error: e,
        });
    }
}

function* watchLoadFollowings() {
    yield takeEvery(LOAD_FOLLOWINGS_REQUEST, loadFollowings);
}

function removeFollowerAPI(userId) {
    // 서버에 요청을 보내는 부분
    return axios.delete(`/user/${userId}/follower`, {
        withCredentials: true,
    });
}

function* removeFollower(action) {
    try {
        // yield call(loadFollowersAPI);
        const result = yield call(removeFollowerAPI, action.data);
        yield put({ // put은 dispatch 동일
            type: REMOVE_FOLLOWER_SUCCESS,
            data: result.data,
        });
    } catch (e) { // loginAPI 실패
        console.error(e);
        yield put({
            type: REMOVE_FOLLOWER_FAILURE,
            error: e,
        });
    }
}

function* watchRemoveFollower() {
    yield takeEvery(REMOVE_FOLLOWER_REQUEST, removeFollower);
}

function editNicknameAPI(nickname) {
    // 서버에 요청을 보내는 부분
    return axios.patch('/user/nickname', { nickname }, {
        withCredentials: true,
    });
}

function* editNickname(action) {
    try {
        const result = yield call(editNicknameAPI, action.data);
        yield put({ // put은 dispatch 동일
            type: EDIT_NICKNAME_SUCCESS,
            data: result.data,
        });
    } catch (e) { // loginAPI 실패
        console.error(e);
        yield put({
            type: EDIT_NICKNAME_FAILURE,
            error: e,
        });
    }
}

function* watchEditNickname() {
    yield takeEvery(EDIT_NICKNAME_REQUEST, editNickname);
}

export default function* userSaga() {
    yield all([
        fork(watchLogIn),
        fork(watchLogOut),
        fork(watchLoadUser),
        fork(watchSignUp),
        fork(watchFollow),
        fork(watchUnfollow),
        fork(watchLoadFollowers),
        fork(watchLoadFollowings),
        fork(watchRemoveFollower),
        fork(watchEditNickname),
        fork(watchOtpCheck),
        fork(watchEmailCheck),
        fork(watchEmailFind),
        fork(watchPwFind),
        fork(watchPwEdit),
        fork(watchPWCheck),
        fork(watchUploadProfileImg),
    ]);
}