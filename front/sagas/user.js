import { all, call, put, takeLatest, fork } from "redux-saga/effects";
import axios from "axios";
import { AUTH_URL } from "../static";
import {
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
  UNFOLLOW_USER_FAILURE,
  UNFOLLOW_USER_REQUEST,
  UNFOLLOW_USER_SUCCESS,
  CHECK_OTP_REQUEST,
  CHECK_OTP_SUCCESS,
  CHECK_OTP_FAILURE,
  CHECK_ID_REQUEST,
  CHECK_ID_SUCCESS,
  CHECK_ID_FAILURE,
  CHECK_NICKNAME_REQUEST,
  CHECK_NICKNAME_SUCCESS,
  CHECK_NICKNAME_FAILURE,
  CHECK_EMAIL_REQUEST,
  CHECK_EMAIL_SUCCESS,
  CHECK_EMAIL_FAILURE,
  CHECK_DUPLICATE_EMAIL_REQUEST,
  CHECK_DUPLICATE_EMAIL_SUCCESS,
  CHECK_DUPLICATE_EMAIL_FAILURE,
  FIND_EMAIL_SUCCESS,
  FIND_EMAIL_FAILURE,
  FIND_EMAIL_REQUEST,
  FIND_PASSWORD_SUCCESS,
  FIND_PASSWORD_FAILURE,
  FIND_PASSWORD_REQUEST,
  EDIT_PWCK_REQUEST,
  EDIT_PWCK_FAILURE,
  EDIT_PWCK_SUCCESS,
  EDIT_NICKNAME_FAILURE,
  EDIT_NICKNAME_REQUEST,
  EDIT_NICKNAME_SUCCESS,
  EDIT_MAJOR_REQUEST,
  EDIT_MAJOR_SUCCESS,
  EDIT_MAJOR_FAILURE,
  EDIT_CATEGORY_REQUEST,
  EDIT_CATEGORY_SUCCESS,
  EDIT_CATEGORY_FAILURE,
  EDIT_PASSWORD_SUCCESS,
  EDIT_PASSWORD_FAILURE,
  EDIT_PASSWORD_REQUEST,
  UPLOAD_PROFILE_IMAGE_REQUEST,
  UPLOAD_PROFILE_IMAGE_SUCCESS,
  UPLOAD_PROFILE_IMAGE_FAILURE,
} from "../reducers/user";

function loadUserAPI(userId) {
  return axios.get(userId ? `/user/${userId}` : "/user/");
}

function* loadUser(action) {
  try {
    const result = yield call(loadUserAPI, action.data);
    yield put({
      type: LOAD_USER_SUCCESS,
      data: result.data,
      me: !action.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_USER_FAILURE,
      error: err.response.data,
    });
  }
}

function logInAPI(loginData) {
  return axios.post(`${AUTH_URL}/auth/login`, loginData);
}

function* logIn(action) {
  try {
    const result = yield call(logInAPI, action.data);
    yield put({
      type: LOG_IN_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOG_IN_FAILURE,
      error: err.response.data,
    });
  }
}

function signUpAPI(signUpData) {
  return axios.post(`${AUTH_URL}/auth/signup`, signUpData);
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
      error: err.response.data,
    });
  }
}

function checkOtpAPI(otp) { //otp 확인
  return axios.post("/user/otpcheck", otp);
}

function* checkOtp(action) {
  try {
    yield call(checkOtpAPI, action.data);
    yield put({
      type: CHECK_OTP_SUCCESS,
    });
  } catch (err) {
    // otp 인증 실패
    alert("otp 인증에 실패하셨습니다.");
    yield put({
      type: CHECK_OTP_FAILURE,
      error: err.response.data,
    });
  }
}

function checkEmailAPI(schoolEmail) { //이메일 인증 후 otp를 메일로 전송
  return axios.post(`${AUTH_URL}/auth/sendotp`, schoolEmail);
}

function* checkEmail(action) {
  try {
    yield call(checkEmailAPI, action.data);
    yield put({
      type: CHECK_EMAIL_SUCCESS,
    });
  } catch (err) { // 이메일 인증 실패
    yield put({
      type: CHECK_EMAIL_FAILURE,
      error: err.response.data,
    });
  }
}

function checkDuplicateEmailAPI(schoolEmail) {
  return axios.post(`${AUTH_URL}/auth/checkemail`, schoolEmail);
}

function* checkDuplicateEmail(action) {
  try {
    yield call(checkDuplicateEmailAPI, action.data);
    yield put({
      type: CHECK_DUPLICATE_EMAIL_SUCCESS,
    });
  } catch (err) {
    alert("중복된 이메일입니다.");
    yield put({
      type: CHECK_DUPLICATE_EMAIL_FAILURE,
      error: err.response.data,
    });
  }
}

function checkIdAPI(id) {
  return axios.post(`${AUTH_URL}/auth/checkid`, id);
}

function* checkId(action) {
  try {
    yield call(checkIdAPI, action.data);
    yield put({
      type: CHECK_ID_SUCCESS,
    });
  } catch (err) { // ID 인증 실패
    yield put({
      type: CHECK_ID_FAILURE,
      error: err.response.data,
    });
  }
}

function checkNicknameAPI(nickname) {
  return axios.post(`${AUTH_URL}/auth/checknickname`, nickname);
}

function* checkNickname(action) {
  try {
    yield call(checkNicknameAPI, action.data);
    yield put({
      type: CHECK_NICKNAME_SUCCESS,
    });
  } catch (err) {
    alert("사용할 수 없는 닉네임입니다.");
    yield put({
      type: CHECK_NICKNAME_FAILURE,
      error: err.response.data,
    });
  }
}

function checkPasswordAPI(password) {
  return axios.post("/user/passwordcheck", password);
}

function* checkPassword(action) {
  try {
    const result = yield call(checkPasswordAPI, action.data);
    yield put({
      type: EDIT_PWCK_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: EDIT_PWCK_FAILURE,
      error: err.response.data,
    });
  }
}

function editPasswordAPI(newpassword) {
  return axios.post("/user/passwordchange", newpassword);
}

function* editPassword(action) {
  try {
    const result = yield call(editPasswordAPI, action.data);
    yield put({
      type: EDIT_PASSWORD_SUCCESS,
      data: result.data,
    });
  } catch (err) { // 비밀번호 인증 실패
    console.error(err);
    alert("비밀번호 변경에 실패하셨습니다.");
    yield put({
      type: EDIT_PASSWORD_FAILURE,
      error: err.response.data,
    });
  }
}

function uploadProfileImgAPI(formData) {
  return axios.post(`/user/profile`, formData);
}

function* uploadProfileImg(action) {
  try {
    const result = yield call(uploadProfileImgAPI, action.data);
    yield put({
      type: UPLOAD_PROFILE_IMAGE_SUCCESS,
      data: result.data,
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: UPLOAD_PROFILE_IMAGE_FAILURE,
      error: e,
    });
  }
}

function findEmailAPI(schoolEmail) {
  return axios.post("/user/findid", schoolEmail);
}

function* findEmail(action) {
  try {
    yield call(findEmailAPI, action.data);
    yield put({
      type: FIND_EMAIL_SUCCESS,
    });
  } catch (err) {
    yield put({
      type: FIND_EMAIL_FAILURE,
      error: err.response.data,
    });
  }
}

function findPasswordAPI(data) {
  return axios.post("/user/reissuance", data);
}

function* findPassword(action) {
  try {
    yield call(findPasswordAPI, action.data);
    yield put({
      type: FIND_PASSWORD_SUCCESS,
    });
  } catch (err) {
    alert("비밀번호 찾기에 실패하셨습니다.");
    yield put({
      type: FIND_PASSWORD_FAILURE,
      error: err.response.data,
    });
  }
}

function logOutAPI() {
  return axios.post(`${AUTH_URL}/auth/logout`);
}

function* logOut(action) {
  try {
    yield call(logOutAPI, action.data);
    yield put({
      type: LOG_OUT_SUCCESS,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOG_OUT_FAILURE,
      error: err.response.data,
    });
  }
}

function followAPI(userId) {
  return axios.post(`/user/${userId}/follow`);
}

function* follow(action) {
  try {
    const result = yield call(followAPI, action.data);
    yield put({
      type: FOLLOW_USER_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: FOLLOW_USER_FAILURE,
      error: err.response.data,
    });
  }
}


function unfollowAPI(userId) {
  return axios.delete(`/user/${userId}/follow`);
}

function* unfollow(action) {
  try {
    const result = yield call(unfollowAPI, action.data);
    yield put({
      type: UNFOLLOW_USER_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: UNFOLLOW_USER_FAILURE,
      error: err.response.data,
    });
  }
}


function loadFollowersAPI(userId, offset = 0, limit = 3) {
  return axios.get(`/user/${userId || 0}/followers?offset=${offset}&limit=${limit}`);
}

function* loadFollowers(action) {
  try {
    const result = yield call(loadFollowersAPI, action.data, action.offset);
    yield put({
      type: LOAD_FOLLOWERS_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_FOLLOWERS_FAILURE,
      error: err.response.data,
    });
  }
}

function loadFollowingsAPI(userId, offset = 0, limit = 3) {
  return axios.get(`/user/${userId || 0}/followings?offset=${offset}&limit=${limit}`);
}

function* loadFollowings(action) {
  try {
    const result = yield call(loadFollowingsAPI, action.data, action.offset);
    yield put({
      type: LOAD_FOLLOWINGS_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_FOLLOWINGS_FAILURE,
      error: err.response.data,
    });
  }
}

function removeFollowerAPI(userId) {
  return axios.delete(`/user/${userId}/follower`);
}

function* removeFollower(action) {
  try {
    const result = yield call(removeFollowerAPI, action.data);
    yield put({
      type: REMOVE_FOLLOWER_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: REMOVE_FOLLOWER_FAILURE,
      error: err.response.data,
    });
  }
}

function editNicknameAPI(nickname) {
  return axios.patch("/user/nickname", nickname);
}

function* editNickname(action) {
  try {
    const result = yield call(editNicknameAPI, action.data);
    yield put({
      type: EDIT_NICKNAME_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: EDIT_NICKNAME_FAILURE,
      error: err.response.data,
    });
  }
}

function editCategoryAPI(category) {
  return axios.patch("/user/nickname", category);
}

function* editCategory(action) {
  try {
    const result = yield call(editCategoryAPI, action.data);
    yield put({
      type: EDIT_CATEGORY_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: EDIT_CATEGORY_FAILURE,
      error: err.response.data,
    });
  }
}

function editMajorAPI(major) {
  return axios.patch("/user/nickname", major);
}

function* editMajor(action) {
  try {
    const result = yield call(editMajorAPI, action.data);
    yield put({
      type: EDIT_MAJOR_SUCCESS,
      data: result.data,
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

function* watchLogIn() {
  yield takeLatest(LOG_IN_REQUEST, logIn);
}

function* watchSignUp() {
  yield takeLatest(SIGN_UP_REQUEST, signUp);
}

function* watchOtpCheck() {
  yield takeLatest(CHECK_OTP_REQUEST, checkOtp);
}

function* watchCheckEmail() {
  yield takeLatest(CHECK_EMAIL_REQUEST, checkEmail);
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

function* watchFindEmail() {
  yield takeLatest(FIND_EMAIL_REQUEST, findEmail);
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
    fork(watchLoadUser),
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
    fork(watchCheckEmail),
    fork(watchCheckDuplicateEmail),
    fork(watchFindEmail),
    fork(watchFindPassword),
    fork(watchEditPassword),
    fork(watchCheckPassword),
    fork(watchUploadProfileImg),
  ]);
}
