import { all, call, put, takeEvery, takeLatest, fork } from "redux-saga/effects";
import axios from "axios";
import { message } from "antd";
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
import { AUTH_URL } from "../static";

function loadUserAPI(userId) {
  return axios.get(userId ? `/user/${userId}` : "/user/", {
    withCredentials: true,
    // 클라이언트에서 요청 보낼 때는 브라우저가 쿠키를 같이 동봉해줘요
  }); // 서버사이드렌더링일 때는, 브라우저가 없어요.
}

function* loadUser(action) {
  try {
    const result = yield call(loadUserAPI, action.data);
    yield put({
      // put은 dispatch 동일
      type: LOAD_USER_SUCCESS,
      data: result.data,
      me: !action.data,
    });
  } catch (e) {
    // loginAPI 실패
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

function logInAPI(loginData) {
  // 서버에 요청을 보내는 부분
  //return axios.post('/user/login', loginData, {
  return axios.post(`${AUTH_URL}/auth/login`, loginData, {
    withCredentials: true,
  });
}

function* logIn(action) {
  try {
    const result = yield call(logInAPI, action.data);
    yield put({
      // put은 dispatch 동일
      type: LOG_IN_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    alert("잘못된 로그인 정보입니다." + err);
    yield put({
      type: LOG_IN_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchLogIn() {
  yield takeEvery(LOG_IN_REQUEST, logIn);
}

function signUpAPI(signUpData) {
  // 서버에 요청을 보내는 부분
  return axios.post("/user/", signUpData);
}

function* signUp(action) {
  try {
    yield call(signUpAPI, action.data);
    yield put({
      // put은 dispatch 동일
      type: SIGN_UP_SUCCESS,
    });
  } catch (err) {
    // 회원가입 실패
    console.error(err);
    yield put({
      type: SIGN_UP_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchSignUp() {
  yield takeEvery(SIGN_UP_REQUEST, signUp);
}

function checkOtpAPI(otp) {
  //otp 확인
  // 서버에 요청을 보내는 부분
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

function* watchOtpCheck() {
  yield takeEvery(CHECK_OTP_REQUEST, checkOtp);
}

function checkEmailAPI(schoolEmail) {
  //이메일 인증 후 otp를 메일로 전송
  return axios.post("/user/otpsend", schoolEmail);
}

function* checkEmail(action) {
  try {
    yield call(checkEmailAPI, action.data);
    yield put({
      type: CHECK_EMAIL_SUCCESS,
    });
  } catch (err) {
    // 이메일 인증 실패
    alert("이메일 인증에 실패하셨습니다.");
    yield put({
      type: CHECK_EMAIL_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchCheckEmail() {
  yield takeEvery(CHECK_EMAIL_REQUEST, checkEmail);
}

function checkDuplicateEmailAPI(schoolEmail) {
  //이메일 인증 후 otp를 메일로 전송
  return axios.post("/auth/checkemail", schoolEmail);
}

function* checkDuplicateEmail(action) {
  try {
    yield call(checkDuplicateEmailAPI, action.data);
    yield put({
      type: CHECK_DUPLICATE_EMAIL_SUCCESS,
    });
  } catch (err) {
    // 중복된 이메일
    alert("중복된 이메일입니다.");
    yield put({
      type: CHECK_DUPLICATE_EMAIL_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchCheckDuplicateEmail() {
  yield takeEvery(CHECK_DUPLICATE_EMAIL_REQUEST, checkDuplicateEmail);
}

function checkIdAPI(id) {
  return axios.post("/auth/checkid", id, {
    withCredentials: true,
  });
}

function* checkId(action) {
  try {
    yield call(checkIdAPI, action.data);
    yield put({
      type: CHECK_ID_SUCCESS,
    });
  } catch (err) {
    // ID 인증 실패(중복된 ID)
    alert("사용할 수 없는 ID입니다.");
    yield put({
      type: CHECK_ID_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchcheckId() {
  yield takeEvery(CHECK_ID_REQUEST, checkId);
}

function checkNicknameAPI(nickname) {
  // 서버에 요청을 보내는 부분
  return axios.post("/auth/checknickname", nickname);
}

function* checkNickname(action) {
  try {
    yield call(checkNicknameAPI, action.data);
    yield put({
      type: CHECK_NICKNAME_SUCCESS,
    });
  } catch (err) {
    // otp 인증 실패
    alert("사용할 수 없는 닉네임입니다.");
    yield put({
      type: CHECK_NICKNAME_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchCheckNickname() {
  yield takeEvery(CHECK_NICKNAME_REQUEST, checkNickname);
}

function checkPasswordAPI(password) {
  return axios.post(
    "/user/passwordcheck",
    { password },
    {
      withCredentials: true,
    }
  );
}

function* checkPassword(action) {
  try {
    const result = yield call(checkPasswordAPI, action.data);
    yield put({
      type: EDIT_PWCK_SUCCESS,
      data: result.data,
    });
    message.success("비밀번호 확인 성공");
  } catch (err) {
    message.error("현재 비밀번호를 다시 확인해주세요.");
    yield put({
      type: EDIT_PWCK_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchCheckPassword() {
  yield takeEvery(EDIT_PWCK_REQUEST, checkPassword);
}

function editPasswordAPI(newpassword) {
  return axios.post(
    "/user/passwordchange",
    { newpassword },
    {
      withCredentials: true,
    }
  );
}

function* editPassword(action) {
  try {
    const result = yield call(editPasswordAPI, action.data);
    yield put({
      // put은 dispatch 동일
      type: EDIT_PASSWORD_SUCCESS,
      data: result.data,
    });
    message.success("비밀번호 변경 성공");
  } catch (e) {
    // 비밀번호 인증 실패
    console.error(e);
    alert("비밀번호 변경에 실패하셨습니다.");
    yield put({
      type: EDIT_PASSWORD_FAILURE,
      error: e.response.data,
    });
  }
}

function* watchEditPassword() {
  yield takeEvery(EDIT_PASSWORD_REQUEST, editPassword);
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

function* watchUploadProfileImg() {
  yield takeLatest(UPLOAD_PROFILE_IMAGE_REQUEST, uploadProfileImg);
}

function findEmailAPI(schoolEmail) {
  return axios.post("/user/findid", schoolEmail);
}

function* findEmail(action) {
  try {
    yield call(findEmailAPI, action.data);
    yield put({
      // put은 dispatch 동일
      type: FIND_EMAIL_SUCCESS,
    });
  } catch (err) {
    // 이메일 인증 실패
    alert("이메일 찾기에 실패하셨습니다.");
    yield put({
      type: FIND_EMAIL_FAILURE,
      error: err.response.data,
    });
  }
}
function* watchFindEmail() {
  yield takeEvery(FIND_EMAIL_REQUEST, findEmail);
}

function findPasswordAPI(data) {
  return axios.post("/user/reissuance", data);
}

function* findPassword(action) {
  try {
    yield call(findPasswordAPI, action.data);
    yield put({
      // put은 dispatch 동일
      type: FIND_PASSWORD_SUCCESS,
    });
  } catch (err) {
    // 이메일 인증 실패
    alert("비밀번호 찾기에 실패하셨습니다.");
    yield put({
      type: FIND_PASSWORD_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchFindPassword() {
  yield takeEvery(FIND_PASSWORD_REQUEST, findPassword);
}

function logOutAPI() {
  // 서버에 요청을 보내는 부분
  return axios.post(
    "/user/logout",
    {},
    {
      withCredentials: true,
    }
  );
}

function* logOut() {
  try {
    // yield call(logOutAPI);
    yield call(logOutAPI);
    yield put({
      // put은 dispatch 동일
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

function* watchLogOut() {
  yield takeEvery(LOG_OUT_REQUEST, logOut);
}

function followAPI(userId) {
  // 서버에 요청을 보내는 부분
  return axios.post(
    `/user/${userId}/follow`,
    {},
    {
      withCredentials: true,
    }
  );
}

function* follow(action) {
  try {
    // yield call(followAPI);
    const result = yield call(followAPI, action.data);
    yield put({
      // put은 dispatch 동일
      type: FOLLOW_USER_SUCCESS,
      data: result.data,
    });
  } catch (e) {
    // loginAPI 실패
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
    yield put({
      // put은 dispatch 동일
      type: UNFOLLOW_USER_SUCCESS,
      data: result.data,
    });
  } catch (e) {
    // loginAPI 실패
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
  return axios.get(
    `/user/${userId || 0}/followers?offset=${offset}&limit=${limit}`,
    {
      withCredentials: true,
    }
  );
}

function* loadFollowers(action) {
  try {
    // yield call(loadFollowersAPI);
    const result = yield call(loadFollowersAPI, action.data, action.offset);
    yield put({
      // put은 dispatch 동일
      type: LOAD_FOLLOWERS_SUCCESS,
      data: result.data,
    });
  } catch (e) {
    // loginAPI 실패
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
  return axios.get(
    `/user/${userId || 0}/followings?offset=${offset}&limit=${limit}`,
    {
      withCredentials: true,
    }
  );
}

function* loadFollowings(action) {
  try {
    // yield call(loadFollowersAPI);
    const result = yield call(loadFollowingsAPI, action.data, action.offset);
    yield put({
      // put은 dispatch 동일
      type: LOAD_FOLLOWINGS_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    // loginAPI 실패
    console.error(err);
    yield put({
      type: LOAD_FOLLOWINGS_FAILURE,
      error: err.response.data,
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
    yield put({
      // put은 dispatch 동일
      type: REMOVE_FOLLOWER_SUCCESS,
      data: result.data,
    });
  } catch (e) {
    // loginAPI 실패
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
  return axios.patch(
    "/user/nickname",
    { nickname },
    {
      withCredentials: true,
    }
  );
}

function* editNickname(action) {
  try {
    const result = yield call(editNicknameAPI, action.data);
    yield put({
      // put은 dispatch 동일
      type: EDIT_NICKNAME_SUCCESS,
      data: result.data,
    });
  } catch (e) {
    // loginAPI 실패
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

function editCategoryAPI(category) {
  // 서버에 요청을 보내는 부분
  return axios.patch(
    "/user/nickname", { category }, {
      withCredentials: true,
    }
  );
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

function* watchEditCategory() {
  yield takeEvery(EDIT_CATEGORY_REQUEST, editCategory);
}

function editMajorAPI(major) {
  return axios.patch(
    "/user/nickname", { major }, {
      withCredentials: true,
    }
  );
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

function* watchEditMajor() {
  yield takeEvery(EDIT_MAJOR_REQUEST, editMajor);
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
