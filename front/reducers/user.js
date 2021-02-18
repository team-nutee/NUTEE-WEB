import produce from '../util/produce';

export const initialState = {
  isLoadMyInfoLoading: false, // 나의 정보 가져오기
  isLoadMyInfoDone: false,
  isLoadMyInfoError: null,

  isLoadUserLoading: false, // 유저 데이터 가져오기
  isLoadUserDone: false,
  isLoadUserError: null,

  followLoading: false, // 팔로우
  followDone: false,
  followError: null,

  unfollowLoading: false, // 언팔로우
  unfollowDone: false,
  unfollowError: null,

  isLogInLoading: false, // 로그인
  isLogInDone: false,
  isLogInError: null,

  isLogOutLoading: false, // 로그아웃
  isLogOutDone: false,
  isLogOutError: null,

  isSignUpLoading: false, // 회원가입
  isSignUpDone: false,
  isSignUpError: null,

  editNicknameLoading: false, // 닉네임 변경
  editNicknameDone: false,
  editNicknameError: null,

  editCategoryLoading: false, // 카테고리 변경
  editCategoryDone: false,
  editCategoryError: null,

  editMajorLoading: false, // 전공 변경
  editMajorDone: false,
  editMajorError: null,

  loadFollowingsLoading: false, // 팔로우 정보 로드
  loadFollowingsDone: false,
  loadFollowingsError: null,

  loadFollowersLoading: false, // 팔로워 정보 로드
  loadFollowersDone: false,
  loadFollowersError: null,

  removeFollowerLoading: false, // 팔로워 제거
  removeFollowerDone: false,
  removeFollowerError: null,

  me: null,
  userInfo: null, // 남의 정보

  checkId: false, // 아이디 중복 가입 확인 여부
  checkNickname: false, // 닉네임 중복 가입 확인 여부
  checkDuplicateEmail: false, // 이메일 중복가입 확인 여부
  sendOtp: false, // otp 전송
  checkedOpt: false, // otp 인증 여부

  checkedFindEmailLoading: false, // 이메일 찾기
  checkedFindEmailDone: false,
  checkedFindEmailError: null,

  checkedFindPwLoading: false, // 비밀번호 찾기
  checkedFindPwDone: false,
  checkedFindPwError: null,

  isCheckedPwLoading: false, // 비밀번호 확인 여부 (비번 변경 시)
  isCheckedPwDone: false,
  isCheckedPwError: null,

  profileImagePath: '',

  followingList: [], // 팔로잉 리스트
  followerList: [], // 팔로워 리스트

  hasMoreFollower: false,
  hasMoreFollowing: false,

  refreshLoading: false, // 토큰 재발급
  refreshDone: false,
  refreshError: null,
};

export const LOAD_MY_INFO_REQUEST = 'LOAD_MY_INFO_REQUEST';
export const LOAD_MY_INFO_SUCCESS = 'LOAD_MY_INFO_SUCCESS';
export const LOAD_MY_INFO_FAILURE = 'LOAD_MY_INFO_FAILURE';

export const LOAD_USER_REQUEST = 'LOAD_USER_REQUEST';
export const LOAD_USER_SUCCESS = 'LOAD_USER_SUCCESS';
export const LOAD_USER_FAILURE = 'LOAD_USER_FAILURE';

export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE';

export const SIGN_UP_RESET = 'SIGN_UP_RESET';

export const LOG_IN_REQUEST = 'LOG_IN_REQUEST';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE';

export const LOG_OUT_REQUEST = 'LOG_OUT_REQUEST';
export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS';
export const LOG_OUT_FAILURE = 'LOG_OUT_FAILURE';

export const REFRESH_REQUEST = 'REFRESH_REQUEST';
export const REFRESH_SUCCESS = 'REFRESH_SUCCESS';
export const REFRESH_FAILURE = 'REFRESH_FAILURE';

export const CHECK_ID_REQUEST = 'CHECK_ID_REQUEST';
export const CHECK_ID_SUCCESS = 'CHECK_ID_SUCCESS';
export const CHECK_ID_FAILURE = 'CHECK_ID_FAILURE';

export const CHECK_NICKNAME_REQUEST = 'CHECK_NICKNAME_REQUEST';
export const CHECK_NICKNAME_SUCCESS = 'CHECK_NICKNAME_SUCCESS';
export const CHECK_NICKNAME_FAILURE = 'CHECK_NICKNAME_FAILURE';

export const SEND_OPT_REQUEST = 'SEND_OPT_REQUEST';
export const SEND_OPT_SUCCESS = 'SEND_OPT_SUCCESS';
export const SEND_OPT_FAILURE = 'SEND_OPT_FAILURE';

export const CHECK_DUPLICATE_EMAIL_SUCCESS = 'CHECK_DUPLICATE_EMAIL_SUCCESS';
export const CHECK_DUPLICATE_EMAIL_REQUEST = 'CHECK_DUPLICATE_EMAIL_REQUEST';
export const CHECK_DUPLICATE_EMAIL_FAILURE = 'CHECK_DUPLICATE_EMAIL_FAILURE';

export const CHECK_OTP_REQUEST = 'CHECK_OTP_REQUEST';
export const CHECK_OTP_SUCCESS = 'CHECK_OTP_SUCCESS';
export const CHECK_OTP_FAILURE = 'CHECK_OTP_FAILURE';

export const FIND_EMAIL_REQUEST = 'FIND_EMAIL_REQUEST';
export const FIND_EMAIL_SUCCESS = 'FIND_EMAIL_SUCCESS';
export const FIND_EMAIL_FAILURE = 'FIND_EMAIL_FAILURE';

export const FIND_PASSWORD_REQUEST = 'FIND_PASSWORD_REQUEST';
export const FIND_PASSWORD_SUCCESS = 'FIND_PASSWORD_SUCCESS';
export const FIND_PASSWORD_FAILURE = 'FIND_PASSWORD_FAILURE';

export const EDIT_PWCK_REQUEST = 'EDIT_PWCK_REQUEST';
export const EDIT_PWCK_SUCCESS = 'EDIT_PWCK_SUCCESS';
export const EDIT_PWCK_FAILURE = 'EDIT_PWCK_FAILURE';

export const EDIT_MAJOR_REQUEST = 'EDIT_PWCK_REQUEST';
export const EDIT_MAJOR_SUCCESS = 'EDIT_PWCK_SUCCESS';
export const EDIT_MAJOR_FAILURE = 'EDIT_PWCK_FAILURE';

export const EDIT_CATEGORY_REQUEST = 'EDIT_CATEGORY_REQUEST';
export const EDIT_CATEGORY_SUCCESS = 'EDIT_CATEGORY_SUCCESS';
export const EDIT_CATEGORY_FAILURE = 'EDIT_CATEGORY_FAILURE';

export const EDIT_NICKNAME_REQUEST = 'EDIT_NICKNAME_REQUEST';
export const EDIT_NICKNAME_SUCCESS = 'EDIT_NICKNAME_SUCCESS';
export const EDIT_NICKNAME_FAILURE = 'EDIT_NICKNAME_FAILURE';

export const EDIT_PASSWORD_REQUEST = 'EDIT_PASSWORD_REQUEST';
export const EDIT_PASSWORD_SUCCESS = 'EDIT_PASSWORD_SUCCESS';
export const EDIT_PASSWORD_FAILURE = 'EDIT_PASSWORD_FAILURE';

export const UPLOAD_PROFILE_IMAGE_REQUEST = 'UPLOAD_PROFILE_IMAGE_REQUEST';
export const UPLOAD_PROFILE_IMAGE_SUCCESS = 'UPLOAD_PROFILE_IMAGE_SUCCESS';
export const UPLOAD_PROFILE_IMAGE_FAILURE = 'UPLOAD_PROFILE_IMAGE_FAILURE';

export const LOAD_FOLLOWERS_REQUEST = 'LOAD_FOLLOWERS_REQUEST';
export const LOAD_FOLLOWERS_SUCCESS = 'LOAD_FOLLOWERS_SUCCESS';
export const LOAD_FOLLOWERS_FAILURE = 'LOAD_FOLLOWERS_FAILURE';

export const LOAD_FOLLOWINGS_REQUEST = 'LOAD_FOLLOWINGS_REQUEST';
export const LOAD_FOLLOWINGS_SUCCESS = 'LOAD_FOLLOWINGS_SUCCESS';
export const LOAD_FOLLOWINGS_FAILURE = 'LOAD_FOLLOWINGS_FAILURE';

export const FOLLOW_USER_REQUEST = 'FOLLOW_USER_REQUEST';
export const FOLLOW_USER_SUCCESS = 'FOLLOW_USER_SUCCESS';
export const FOLLOW_USER_FAILURE = 'FOLLOW_USER_FAILURE';

export const UNFOLLOW_USER_REQUEST = 'UNFOLLOW_USER_REQUEST';
export const UNFOLLOW_USER_SUCCESS = 'UNFOLLOW_USER_SUCCESS';
export const UNFOLLOW_USER_FAILURE = 'UNFOLLOW_USER_FAILURE';

export const REMOVE_FOLLOWER_REQUEST = 'REMOVE_FOLLOWER_REQUEST';
export const REMOVE_FOLLOWER_SUCCESS = 'REMOVE_FOLLOWER_SUCCESS';
export const REMOVE_FOLLOWER_FAILURE = 'REMOVE_FOLLOWER_FAILURE';

export const ADD_POST_TO_ME = 'ADD_POST_TO_ME';

export const REMOVE_POST_OF_ME = 'REMOVE_POST_OF_ME';

export const loginRequestAction = (data) => ({
  type: LOG_IN_REQUEST,
  data,
});

export const logoutRequestAction = () => ({
  type: LOG_OUT_REQUEST,
});

const reducer = (state = initialState, action) => produce(state, (draft) => {
  switch (action.type) {
    case LOG_IN_REQUEST:
      draft.isLogInLoading = true;
      draft.isLogInError = null;
      draft.isLogInDone = false;
      break;
    case LOG_IN_SUCCESS:
      draft.isLogInLoading = false;
      draft.me = action.data;
      draft.isLogInDone = true;
      break;
    case LOG_IN_FAILURE:
      draft.isLogInLoading = false;
      draft.isLogInError = action.error;
      break;
    case LOG_OUT_REQUEST:
      draft.isLogOutLoading = true;
      draft.isLogOutError = null;
      draft.isLogOutDone = false;
      break;
    case LOG_OUT_SUCCESS:
      draft.isLogOutLoading = false;
      draft.isLogOutDone = true;
      draft.me = null;
      break;
    case LOG_OUT_FAILURE:
      draft.isLogOutLoading = false;
      draft.isLogOutError = action.error;
      break;
    case REFRESH_REQUEST:
      draft.refreshLoading = true;
      draft.refreshError = null;
      draft.refreshDone = false;
      break;
    case REFRESH_SUCCESS:
      draft.refreshLoading = false;
      draft.me = action.data;
      draft.refreshDone = true;
      break;
    case REFRESH_FAILURE:
      draft.isLogInLoading = false;
      draft.isLogInError = action.error;
      break;
    case SIGN_UP_REQUEST:
      draft.isSignUpLoading = true;
      draft.isSignUpError = null;
      draft.isSignUpDone = false;
      break;
    case SIGN_UP_SUCCESS:
      draft.isSignUpLoading = false;
      draft.isSignUpDone = true;
      draft.checkedOpt = false;
      draft.checkDuplicateEmail = false;
      draft.checkId = false;
      draft.checkNickname = false;
      break;
    case SIGN_UP_FAILURE:
      draft.isSignUpLoading = false;
      draft.isSignUpError = action.error;
      break;
    case CHECK_ID_REQUEST:
      draft.checkId = false;
      break;
    case CHECK_ID_SUCCESS:
      draft.checkId = true;
      break;
    case CHECK_ID_FAILURE:
      draft.checkId = false;
      break;
    case CHECK_NICKNAME_REQUEST:
      draft.checkNickname = false;
      break;
    case CHECK_NICKNAME_SUCCESS:
      draft.checkNickname = true;
      break;
    case CHECK_NICKNAME_FAILURE:
      draft.checkNickname = false;
      break;
    case CHECK_OTP_REQUEST:
      draft.checkedOpt = false;
      break;
    case CHECK_OTP_SUCCESS:
      draft.checkedOpt = true;
      break;
    case CHECK_OTP_FAILURE:
      draft.checkedOpt = false;
      break;
    case SEND_OPT_REQUEST:
      draft.sendOtp = false;
      break;
    case SEND_OPT_SUCCESS:
      draft.sendOtp = true;
      break;
    case SEND_OPT_FAILURE:
      draft.sendOtp = false;
      break;
    case CHECK_DUPLICATE_EMAIL_REQUEST:
      draft.checkDuplicateEmail = false;
      break;
    case CHECK_DUPLICATE_EMAIL_SUCCESS:
      draft.checkDuplicateEmail = true;
      break;
    case CHECK_DUPLICATE_EMAIL_FAILURE:
      draft.checkDuplicateEmail = false;
      break;
    case LOAD_USER_REQUEST:
      draft.isLoadUserLoading = true;
      draft.isLoadUserError = null;
      draft.isLoadUserDone = false;
      break;
    case LOAD_USER_SUCCESS:
      draft.isLoadUserLoading = false;
      draft.userInfo = action.data;
      draft.isLoadUserDone = true;
      break;
    case LOAD_USER_FAILURE:
      draft.isLoadUserLoading = false;
      draft.isLoadUserError = action.error;
      break;
    case LOAD_MY_INFO_REQUEST:
      draft.isLoadMyInfoLoading = true;
      draft.isLoadMyInfoError = null;
      draft.isLoadMyInfoDone = false;
      break;
    case LOAD_MY_INFO_SUCCESS:
      draft.isLoadMyInfoLoading = false;
      draft.me = action.data;
      draft.isLoadMyInfoDone = true;
      break;
    case LOAD_MY_INFO_FAILURE:
      draft.isLoadMyInfoLoading = false;
      draft.isLoadMyInfoError = action.error;
      break;
    case ADD_POST_TO_ME:
      draft.me.posts.unshift({ userId: action.data });
      break;
    case REMOVE_POST_OF_ME:
      draft.me.posts = draft.me.posts.filter((v) => v.id !== action.data);
      break;
    case EDIT_NICKNAME_REQUEST:
      draft.editNicknameLoading = true;
      draft.editNicknameError = null;
      draft.editNicknameDone = false;
      break;
    case EDIT_NICKNAME_SUCCESS:
      draft.me.nickname = action.data.nickname;
      draft.editNicknameLoading = false;
      draft.editNicknameDone = true;
      break;
    case EDIT_NICKNAME_FAILURE:
      draft.editNicknameLoading = false;
      draft.editNicknameError = action.error;
      break;
    case EDIT_CATEGORY_REQUEST:
      draft.editCategoryLoading = true;
      draft.editCategoryError = null;
      draft.editCategoryDone = false;
      break;
    case EDIT_CATEGORY_SUCCESS:
      draft.me.interests = action.data.interests;
      draft.editCategoryLoading = false;
      draft.editCategoryDone = true;
      break;
    case EDIT_CATEGORY_FAILURE:
      draft.editCategoryLoading = false;
      draft.editCategoryError = action.error;
      break;
    case EDIT_MAJOR_REQUEST:
      draft.editMajorLoading = true;
      draft.editMajorError = null;
      draft.editMajorDone = false;
      break;
    case EDIT_MAJOR_SUCCESS:
      draft.me.majors = action.data.majors;
      draft.editMajorLoading = false;
      draft.editMajorDone = true;
      break;
    case EDIT_MAJOR_FAILURE:
      draft.editMajorLoading = false;
      draft.editMajorError = action.error;
      break;
    case EDIT_PWCK_REQUEST:
      draft.isCheckedPwLoading = true;
      draft.isCheckedPwDone = false;
      draft.isCheckedPwError = null;
      break;
    case EDIT_PWCK_SUCCESS:
      draft.isCheckedPwLoading = false;
      draft.isCheckedPwDone = true;
      break;
    case EDIT_PWCK_FAILURE:
      draft.isCheckedPwLoading = false;
      draft.isCheckedPwError = action.error;
      break;
    case FIND_EMAIL_REQUEST:
      draft.checkedFindEmailLoading = true;
      draft.checkedFindEmailDone = false;
      draft.checkedFindEmailError = null;
      break;
    case FIND_EMAIL_SUCCESS:
      draft.checkedFindEmailLoading = false;
      draft.checkedFindEmailDone = true;
      break;
    case FIND_EMAIL_FAILURE:
      draft.checkedFindEmailLoading = true;
      draft.checkedFindEmailError = action.error;
      break;
    case FIND_PASSWORD_REQUEST:
      draft.checkedFindPwLoading = true;
      draft.checkedFindPwDone = false;
      draft.checkedFindPwError = null;
      break;
    case FIND_PASSWORD_SUCCESS:
      draft.checkedFindPwLoading = false;
      draft.checkedFindPwDone = true;
      break;
    case FIND_PASSWORD_FAILURE:
      draft.checkedFindPwLoading = false;
      draft.checkedFindPwError = action.error;
      break;
    case EDIT_PASSWORD_REQUEST:
      break;
    case EDIT_PASSWORD_SUCCESS:
      break;
    case EDIT_PASSWORD_FAILURE:
      break;
    case SIGN_UP_RESET:
      draft.isSignedUp = false;
      break;
    case FOLLOW_USER_REQUEST:
      break;
    case FOLLOW_USER_SUCCESS:
      draft.me.followings.unshift({ useId: action.data });
      draft.userInfo.followers.unshift({ useId: action.data });
      break;
    case FOLLOW_USER_FAILURE:
      break;
    case UNFOLLOW_USER_REQUEST:
      break;
    case UNFOLLOW_USER_SUCCESS: {
      const index = draft.me.followings.findIndex((v) => v.id === action.data);
      draft.me.followings.splice(index, 1);
      const index2 = draft.followingList.findIndex((v) => v.id === action.data);
      draft.followingList.splice(index2, 1);
      const index3 = draft.userInfo.followers.findIndex(
        (v) => v.id === action.data,
      );
      draft.userInfo.followers.splice(index3, 1);
      break;
    }
    case UNFOLLOW_USER_FAILURE:
      break;
    case LOAD_FOLLOWERS_REQUEST:
      draft.followerList = !action.offset ? [] : draft.followerList;
      draft.hasMoreFollower = action.offset ? draft.hasMoreFollower : true;
      // 처음 데이터를 가져올 때는 더보기 버튼을 보여주는 걸로
      break;
    case LOAD_FOLLOWERS_SUCCESS:
      action.data.forEach((d) => {
        draft.followerList.push(d);
      });
      draft.hasMoreFollower = action.data.length === 3;
      break;
    case LOAD_FOLLOWERS_FAILURE:
      break;
    case LOAD_FOLLOWINGS_REQUEST:
      draft.followingList = !action.offset ? [] : draft.followingList;
      draft.hasMoreFollowing = action.offset ? draft.hasMoreFollowing : true;
      // 처음 데이터를 가져올 때는 더보기 버튼을 보여주는 걸로
      break;
    case LOAD_FOLLOWINGS_SUCCESS:
      action.data.forEach((d) => {
        draft.followingList.push(d);
      });
      draft.hasMoreFollowing = action.data.length === 3;
      break;
    case LOAD_FOLLOWINGS_FAILURE:
      break;
    case REMOVE_FOLLOWER_REQUEST:
      break;
    case REMOVE_FOLLOWER_SUCCESS: {
      const index = draft.me.followers.findIndex((v) => v.id === action.data);
      draft.me.followers.splice(index, 1);
      const index2 = draft.followerList.findIndex((v) => v.id === action.data);
      draft.followerList.splice(index2, 1);
      break;
    }
    case REMOVE_FOLLOWER_FAILURE:
      break;
    case UPLOAD_PROFILE_IMAGE_REQUEST:
      break;
    case UPLOAD_PROFILE_IMAGE_SUCCESS:
      draft.profileImagePath = action.data;
      if (draft.me.profileUrl) {
        draft.me.profileUrl = action.data;
      }
      break;
    case UPLOAD_PROFILE_IMAGE_FAILURE:
      break;
    default:
      break;
  }
});

export default reducer;
