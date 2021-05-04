import { all, call, put, takeLatest, fork } from 'redux-saga/effects';
import axios from 'axios';
import { AUTH_URL, INDEX_URL } from '../static';
import {
  FOLLOW_USER_REQUEST,
  FOLLOW_USER_SUCCESS,
  FOLLOW_USER_FAILURE,
  LOAD_FOLLOWERS_REQUEST,
  LOAD_FOLLOWERS_SUCCESS,
  LOAD_FOLLOWERS_FAILURE,
  LOAD_FOLLOWINGS_REQUEST,
  LOAD_FOLLOWINGS_SUCCESS,
  LOAD_FOLLOWINGS_FAILURE,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAILURE,
  LOAD_MY_INFO_REQUEST,
  LOAD_MY_INFO_SUCCESS,
  LOAD_MY_INFO_FAILURE,
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_IN_FAILURE,
  LOG_OUT_REQUEST,
  LOG_OUT_SUCCESS,
  LOG_OUT_FAILURE,
  REFRESH_REQUEST,
  REFRESH_SUCCESS,
  REFRESH_FAILURE,
  REMOVE_FOLLOWER_REQUEST,
  REMOVE_FOLLOWER_SUCCESS,
  REMOVE_FOLLOWER_FAILURE,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
  UNFOLLOW_USER_REQUEST,
  UNFOLLOW_USER_SUCCESS,
  UNFOLLOW_USER_FAILURE,
  CHECK_OTP_REQUEST,
  CHECK_OTP_SUCCESS,
  CHECK_OTP_FAILURE,
  CHECK_ID_REQUEST,
  CHECK_ID_SUCCESS,
  CHECK_ID_FAILURE,
  CHECK_NICKNAME_REQUEST,
  CHECK_NICKNAME_SUCCESS,
  CHECK_NICKNAME_FAILURE,
  SEND_OPT_REQUEST,
  SEND_OPT_SUCCESS,
  SEND_OPT_FAILURE,
  CHECK_DUPLICATE_EMAIL_REQUEST,
  CHECK_DUPLICATE_EMAIL_SUCCESS,
  CHECK_DUPLICATE_EMAIL_FAILURE,
  FIND_ID_REQUEST,
  FIND_ID_SUCCESS,
  FIND_ID_FAILURE,
  FIND_PASSWORD_REQUEST,
  FIND_PASSWORD_SUCCESS,
  FIND_PASSWORD_FAILURE,
  EDIT_PWCK_REQUEST,
  EDIT_PWCK_FAILURE,
  EDIT_PWCK_SUCCESS,
  EDIT_NICKNAME_REQUEST,
  EDIT_NICKNAME_SUCCESS,
  EDIT_NICKNAME_FAILURE,
  EDIT_MAJOR_REQUEST,
  EDIT_MAJOR_SUCCESS,
  EDIT_MAJOR_FAILURE,
  EDIT_CATEGORY_REQUEST,
  EDIT_CATEGORY_SUCCESS,
  EDIT_CATEGORY_FAILURE,
  EDIT_PASSWORD_REQUEST,
  EDIT_PASSWORD_SUCCESS,
  EDIT_PASSWORD_FAILURE,
  EDIT_PROFILE_IMAGE_REQUEST,
  EDIT_PROFILE_IMAGE_SUCCESS,
  EDIT_PROFILE_IMAGE_FAILURE,
  UPLOAD_PROFILE_IMAGE_REQUEST,
  UPLOAD_PROFILE_IMAGE_SUCCESS,
  UPLOAD_PROFILE_IMAGE_FAILURE,
} from '../reducers/user';

function loadMyInfoAPI() {
  return axios.get(`${INDEX_URL}/sns/user/me`, { data: {} });
}

function* loadMyInfo() {
  try {
    const result = yield call(loadMyInfoAPI);
    console.log(result.data.body);
    yield put({
      type: LOAD_MY_INFO_SUCCESS,
      data: result.data.body,
      majors: result.data.body.majors,
    });
  } catch (err) {
    yield put({
      type: LOAD_MY_INFO_FAILURE,
      error: err.response.data,
    });
  }
}

function loadUserAPI(userId) {
  return axios.get(`${AUTH_URL}/auth/user/${userId}`, { data: {} });
}

function* loadUser(action) {
  try {
    const result = yield call(loadUserAPI, action.data);
    console.log('loadUserData', result.data.body);
    yield put({
      type: LOAD_USER_SUCCESS,
      data: result.data.body,
      me: !action.data.body,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_USER_FAILURE,
      error: err,
    });
  }
}

function refreshAPI(data) {
  return axios.post(`${AUTH_URL}/auth/refresh`, data);
}

function* refresh(action) {
  try {
    const result = yield call(refreshAPI, action.data);
    yield put({
      type: REFRESH_SUCCESS,
      data: result.data.body,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: REFRESH_FAILURE,
      error: err,
    });
  }
}

function logInAPI(loginData) {
  return axios.post(`${AUTH_URL}/auth/login`, loginData);
}

function* logIn(action) {
  try {
    const result = yield call(logInAPI, action.data);
    const { accessToken, refreshToken } = result.data.body;
    if (accessToken) {
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
    }
    yield put({
      type: LOG_IN_SUCCESS,
      data: result.data.body,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOG_IN_FAILURE,
      error: err,
    });
  }
}

function logOutAPI(accessToken) {
  return axios.post(`${AUTH_URL}/auth/logout`, accessToken);
}

function* logOut(action) {
  try {
    yield call(logOutAPI, action.data);
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    yield put({
      type: LOG_OUT_SUCCESS,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOG_OUT_FAILURE,
      error: err,
    });
  }
}

function signUpAPI(signUpData) {
  return axios.post(`${AUTH_URL}/auth/user`, signUpData);
}

function* signUp(action) {
  try {
    yield call(signUpAPI, action.data);
    yield put({
      type: SIGN_UP_SUCCESS,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: SIGN_UP_FAILURE,
      error: err,
    });
  }
}

function checkOtpAPI(otp) {
  return axios.post(`${AUTH_URL}/auth/check/otp`, otp);
}

function* checkOtp(action) {
  try {
    yield call(checkOtpAPI, action.data);
    yield put({
      type: CHECK_OTP_SUCCESS,
    });
  } catch (err) {
    yield put({
      type: CHECK_OTP_FAILURE,
      error: err,
    });
  }
}

function sendOtpAPI(schoolEmail) { // 이메일 인증 후 otp를 메일로 전송
  return axios.post(`${AUTH_URL}/auth/otp`, schoolEmail);
}

function* sendOtp(action) {
  try {
    yield call(sendOtpAPI, action.data);
    yield put({
      type: SEND_OPT_SUCCESS,
    });
  } catch (err) {
    yield put({
      type: SEND_OPT_FAILURE,
      error: err,
    });
  }
}

function checkDuplicateEmailAPI(schoolEmail) {
  return axios.post(`${AUTH_URL}/auth/check/email`, schoolEmail);
}

function* checkDuplicateEmail(action) {
  try {
    yield call(checkDuplicateEmailAPI, action.data);
    yield put({
      type: CHECK_DUPLICATE_EMAIL_SUCCESS,
    });
  } catch (err) {
    yield put({
      type: CHECK_DUPLICATE_EMAIL_FAILURE,
      error: err,
    });
  }
}

function checkIdAPI(id) {
  return axios.post(`${AUTH_URL}/auth/check/user-id`, id);
}

function* checkId(action) {
  try {
    yield call(checkIdAPI, action.data);
    yield put({
      type: CHECK_ID_SUCCESS,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: CHECK_ID_FAILURE,
      error: err,
    });
  }
}

function checkNicknameAPI(nickname) {
  return axios.post(`${AUTH_URL}/auth/check/nickname`, nickname);
}

function* checkNickname(action) {
  try {
    yield call(checkNicknameAPI, action.data);
    yield put({
      type: CHECK_NICKNAME_SUCCESS,
    });
  } catch (err) {
    yield put({
      type: CHECK_NICKNAME_FAILURE,
      error: err,
    });
  }
}

function uploadProfileImgAPI(formData) {
  return axios.post(`${INDEX_URL}/sns/upload`, formData);
}

function* uploadProfileImg(action) {
  try {
    const result = yield call(uploadProfileImgAPI, action.data);
    yield put({
      type: UPLOAD_PROFILE_IMAGE_SUCCESS,
      data: result.data.body,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: UPLOAD_PROFILE_IMAGE_FAILURE,
      error: err,
    });
  }
}

function editProfileImgAPI(formData) {
  return axios.patch(`${AUTH_URL}/auth/user/profile`, formData);
}

function* editProfileImg(action) {
  try {
    const result = yield call(editProfileImgAPI, action.data);
    yield put({
      type: EDIT_PROFILE_IMAGE_SUCCESS,
      data: result.data.body,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: EDIT_PROFILE_IMAGE_FAILURE,
      error: err,
    });
  }
}

function findIdAPI(schoolEmail) {
  return axios.patch(`${AUTH_URL}/auth/user-id`, schoolEmail);
}

function* findId(action) {
  try {
    const result = yield call(findIdAPI, action.data);
    yield put({
      type: FIND_ID_SUCCESS,
      data: result.data.body,
    });
  } catch (err) {
    yield put({
      type: FIND_ID_FAILURE,
      error: err,
    });
  }
}

function findPasswordAPI(data) {
  return axios.patch(`${AUTH_URL}/auth/password`, data);
}

function* findPassword(action) {
  try {
    yield call(findPasswordAPI, action.data);
    yield put({
      type: FIND_PASSWORD_SUCCESS,
    });
  } catch (err) {
    yield put({
      type: FIND_PASSWORD_FAILURE,
      error: err,
    });
  }
}

function followAPI(userId) { // api X
  return axios.post(`/user/${userId}/follow`);
}

function* follow(action) {
  try {
    const result = yield call(followAPI, action.data);
    yield put({
      type: FOLLOW_USER_SUCCESS,
      data: result.data.body,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: FOLLOW_USER_FAILURE,
      error: err,
    });
  }
}

function unfollowAPI(userId) { // api X
  return axios.delete(`/user/${userId}/follow`);
}

function* unfollow(action) {
  try {
    const result = yield call(unfollowAPI, action.data);
    yield put({
      type: UNFOLLOW_USER_SUCCESS,
      data: result.data.body,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: UNFOLLOW_USER_FAILURE,
      error: err,
    });
  }
}

function loadFollowersAPI(userId, offset = 0, limit = 3) { // api X
  return axios.get(`/user/${userId || 0}/followers?offset=${offset}&limit=${limit}`, { data: {} });
}

function* loadFollowers(action) {
  try {
    const result = yield call(loadFollowersAPI, action.data, action.offset);
    yield put({
      type: LOAD_FOLLOWERS_SUCCESS,
      data: result.data.body,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_FOLLOWERS_FAILURE,
      error: err,
    });
  }
}

function loadFollowingsAPI(userId, offset = 0, limit = 3) { // api X
  return axios.get(`/user/${userId || 0}/followings?offset=${offset}&limit=${limit}`, { data: {} });
}

function* loadFollowings(action) {
  try {
    const result = yield call(loadFollowingsAPI, action.data, action.offset);
    yield put({
      type: LOAD_FOLLOWINGS_SUCCESS,
      data: result.data.body,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_FOLLOWINGS_FAILURE,
      error: err,
    });
  }
}

function removeFollowerAPI(userId) { // api X
  return axios.delete(`/user/${userId}/follower`);
}

function* removeFollower(action) {
  try {
    const result = yield call(removeFollowerAPI, action.data);
    yield put({
      type: REMOVE_FOLLOWER_SUCCESS,
      data: result.data.body,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: REMOVE_FOLLOWER_FAILURE,
      error: err,
    });
  }
}

function editNicknameAPI(nickname) {
  return axios.patch(`${AUTH_URL}/auth/user/nickname`, nickname);
}

function* editNickname(action) {
  try {
    const result = yield call(editNicknameAPI, action.data);
    yield put({
      type: EDIT_NICKNAME_SUCCESS,
      data: result.data.body,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: EDIT_NICKNAME_FAILURE,
      error: err,
    });
  }
}

function checkPasswordAPI(password) { // 비밀번호 변경 전 비밀번호 확인 // api X
  return axios.post('/user/passwordcheck', password);
}

function* checkPassword(action) {
  try {
    const result = yield call(checkPasswordAPI, action.data);
    yield put({
      type: EDIT_PWCK_SUCCESS,
      data: result.data.body,
    });
  } catch (err) {
    yield put({
      type: EDIT_PWCK_FAILURE,
      error: err,
    });
  }
}

function editPasswordAPI(newpassword) {
  return axios.post(`${AUTH_URL}/auth/user/password`, newpassword);
}

function* editPassword(action) {
  try {
    const result = yield call(editPasswordAPI, action.data);
    yield put({
      type: EDIT_PASSWORD_SUCCESS,
      data: result.data.body,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: EDIT_PASSWORD_FAILURE,
      error: err,
    });
  }
}

function editCategoryAPI(interests) {
  return axios.patch(`${AUTH_URL}/auth/user/interests`, interests);
}

function* editCategory(action) {
  try {
    const result = yield call(editCategoryAPI, action.data);
    yield put({
      type: EDIT_CATEGORY_SUCCESS,
      data: result.data.body,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: EDIT_CATEGORY_FAILURE,
      error: err,
    });
  }
}

function editMajorAPI(data) {
  return axios.patch(`${AUTH_URL}/auth/user/majors`, data.majors);
}

function* editMajor(action) {
  try {
    const result = yield call(editMajorAPI, action.data);
    yield put({
      type: EDIT_MAJOR_SUCCESS,
      data: result.data.body,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: EDIT_MAJOR_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchLoadUser() {
  yield takeLatest(LOAD_USER_REQUEST, loadUser);
}

function* watchLoadMyInfo() {
  yield takeLatest(LOAD_MY_INFO_REQUEST, loadMyInfo);
}

function* watchLogIn() {
  yield takeLatest(LOG_IN_REQUEST, logIn);
}

function* watchRefresh() {
  yield takeLatest(REFRESH_REQUEST, refresh);
}

function* watchSignUp() {
  yield takeLatest(SIGN_UP_REQUEST, signUp);
}

function* watchOtpCheck() {
  yield takeLatest(CHECK_OTP_REQUEST, checkOtp);
}

function* watchSendOtp() {
  yield takeLatest(SEND_OPT_REQUEST, sendOtp);
}

function* watchCheckDuplicateEmail() {
  yield takeLatest(CHECK_DUPLICATE_EMAIL_REQUEST, checkDuplicateEmail);
}

function* watchcheckId() {
  yield takeLatest(CHECK_ID_REQUEST, checkId);
}

function* watchCheckNickname() {
  yield takeLatest(CHECK_NICKNAME_REQUEST, checkNickname);
}

function* watchCheckPassword() {
  yield takeLatest(EDIT_PWCK_REQUEST, checkPassword);
}

function* watchEditPassword() {
  yield takeLatest(EDIT_PASSWORD_REQUEST, editPassword);
}

function* watchUploadProfileImg() {
  yield takeLatest(UPLOAD_PROFILE_IMAGE_REQUEST, uploadProfileImg);
}

function* watchEditProfileImg() {
  yield takeLatest(EDIT_PROFILE_IMAGE_REQUEST, editProfileImg);
}

function* watchFindId() {
  yield takeLatest(FIND_ID_REQUEST, findId);
}

function* watchFindPassword() {
  yield takeLatest(FIND_PASSWORD_REQUEST, findPassword);
}

function* watchLogOut() {
  yield takeLatest(LOG_OUT_REQUEST, logOut);
}

function* watchFollow() {
  yield takeLatest(FOLLOW_USER_REQUEST, follow);
}

function* watchUnfollow() {
  yield takeLatest(UNFOLLOW_USER_REQUEST, unfollow);
}

function* watchLoadFollowers() {
  yield takeLatest(LOAD_FOLLOWERS_REQUEST, loadFollowers);
}

function* watchLoadFollowings() {
  yield takeLatest(LOAD_FOLLOWINGS_REQUEST, loadFollowings);
}

function* watchRemoveFollower() {
  yield takeLatest(REMOVE_FOLLOWER_REQUEST, removeFollower);
}

function* watchEditNickname() {
  yield takeLatest(EDIT_NICKNAME_REQUEST, editNickname);
}

function* watchEditCategory() {
  yield takeLatest(EDIT_CATEGORY_REQUEST, editCategory);
}

function* watchEditMajor() {
  yield takeLatest(EDIT_MAJOR_REQUEST, editMajor);
}

export default function* userSaga() {
  yield all([
    fork(watchLogIn),
    fork(watchLogOut),
    fork(watchRefresh),
    fork(watchLoadUser),
    fork(watchLoadMyInfo),
    fork(watchSignUp),
    fork(watchFollow),
    fork(watchUnfollow),
    fork(watchLoadFollowers),
    fork(watchLoadFollowings),
    fork(watchRemoveFollower),
    fork(watchEditNickname),
    fork(watchEditCategory),
    fork(watchEditMajor),
    fork(watchcheckId),
    fork(watchCheckNickname),
    fork(watchOtpCheck),
    fork(watchSendOtp),
    fork(watchCheckDuplicateEmail),
    fork(watchFindId),
    fork(watchFindPassword),
    fork(watchEditPassword),
    fork(watchCheckPassword),
    fork(watchUploadProfileImg),
    fork(watchEditProfileImg),
  ]);
}
