import { all, fork, takeLatest, put, call } from "redux-saga/effects";
import axios from "axios";
import {
  ADD_POST_FAILURE,
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
  ADD_COMMENT_FAILURE,
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  LIKE_POST_FAILURE,
  LIKE_POST_REQUEST,
  LIKE_POST_SUCCESS,
  LOAD_COMMENTS_FAILURE,
  LOAD_COMMENTS_REQUEST,
  LOAD_COMMENTS_SUCCESS,
  LOAD_FAVORITE_POSTS_REQUEST,
  LOAD_FAVORITE_POSTS_SUCCESS,
  LOAD_FAVORITE_POSTS_FAILURE,
  LOAD_CATEGORY_POSTS_REQUEST,
  LOAD_CATEGORY_POSTS_SUCCESS,
  LOAD_CATEGORY_POSTS_FAILURE,
  LOAD_HASHTAG_POSTS_FAILURE,
  LOAD_HASHTAG_POSTS_REQUEST,
  LOAD_HASHTAG_POSTS_SUCCESS,
  LOAD_POSTS_FAILURE,
  LOAD_POSTS_REQUEST,
  LOAD_POSTS_SUCCESS,
  LOAD_USER_POSTS_FAILURE,
  LOAD_USER_POSTS_REQUEST,
  LOAD_USER_POSTS_SUCCESS,
  REMOVE_POST_FAILURE,
  REMOVE_POST_REQUEST,
  REMOVE_POST_SUCCESS,
  RETWEET_FAILURE,
  RETWEET_REQUEST,
  RETWEET_SUCCESS,
  UNLIKE_POST_FAILURE,
  UNLIKE_POST_REQUEST,
  UNLIKE_POST_SUCCESS,
  UPLOAD_IMAGES_FAILURE,
  UPLOAD_IMAGES_REQUEST,
  UPLOAD_IMAGES_SUCCESS,
  LOAD_POST_SUCCESS,
  LOAD_POST_FAILURE,
  LOAD_POST_REQUEST,
  EDIT_POST_SUCCESS,
  EDIT_POST_FAILURE,
  EDIT_POST_REQUEST,
  UPLOAD_EDIT_IMAGES_SUCCESS,
  UPLOAD_EDIT_IMAGES_FAILURE,
  UPLOAD_EDIT_IMAGES_REQUEST,
  EDIT_COMMENT_SUCCESS,
  EDIT_COMMENT_FAILURE,
  EDIT_COMMENT_REQUEST,
  REMOVE_COMMENT_SUCCESS,
  REMOVE_COMMENT_FAILURE,
  REMOVE_COMMENT_REQUEST,
  REPORT_SUCCESS,
  REPORT_FAILURE,
  REPORT_REQUEST,
  ADD_RECOMMENT_SUCCESS,
  ADD_RECOMMENT_FAILURE,
  ADD_RECOMMENT_REQUEST,
  LOAD_SEARCH_POSTS_SUCCESS,
  LOAD_SEARCH_POSTS_FAILURE,
  LOAD_SEARCH_POSTS_REQUEST,
} from "../reducers/post";
import { ADD_POST_TO_ME, REMOVE_POST_OF_ME } from "../reducers/user";
import { AUTH_URL, INDEX_URL } from "../static";

function addPostAPI(postData) {
  return axios.post(`${INDEX_URL}/sns/post`, postData);
}

function* addPost(action) {
  try {
    const result = yield call(addPostAPI, action.data);
    yield put({ // post reducer의 데이터를 수정
      type: ADD_POST_SUCCESS,
      data: result.data,
    });
    yield put({ // user reducer의 데이터를 수정
      type: ADD_POST_TO_ME,
      data: result.data.id,
    });
  } catch (e) {
    yield put({
      type: ADD_POST_FAILURE,
      error: e,
    });
  }
}

function editPostAPI(postData, postId = 1) {
  return axios.patch(`${INDEX_URL}/sns/post/${postId}`, postData);
}

function* editPost(action) {
  try {
    const result = yield call(editPostAPI, action.data);
    yield put({
      type: EDIT_POST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: EDIT_POST_FAILURE,
      error: err,
    });
  }
}

function loadMainPostsAPI(lastId, limit, inter = 'IT2') {
  return axios.get(`${INDEX_URL}/sns/post/category/${inter}?lastId=${lastId || 0}&limit=${limit || 10}`, { data: {} });
}

function* loadMainPosts(action) {
  try {
    const result = yield call(loadMainPostsAPI, action.lastId);
    console.log(result.data.body);
    yield put({
      type: LOAD_POSTS_SUCCESS,
      data: result.data.body,
    });
  } catch (err) {
    console.log(err);
    yield put({
      type: LOAD_POSTS_FAILURE,
      error: err
    });
  }
}

function loadFavoritePostsAPI(lastId = 0, limit = 10) {
  return axios.get(`${INDEX_URL}/sns/post/favorite?lastId=${lastId || 0}&limit=${limit || 10}`);
}

function* loadFavoritePosts(action) {
  try {
    const result = yield call(loadFavoritePostsAPI, action.lastId);
    yield put({
      type: LOAD_FAVORITE_POSTS_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: LOAD_FAVORITE_POSTS_FAILURE,
      error: err
    });
  }
}

function loadCategoryPostsAPI(lastId = 0, limit = 10, inter = 'IT2') {
  return axios.get(`${INDEX_URL}/sns/post/category/${inter}?lastId=${lastId}&limit=${limit}`);
}

function* loadCategoryPosts(action) {
  try {
    const result = yield call(loadCategoryPostsAPI, action.lastId);
    yield put({
      type: LOAD_CATEGORY_POSTS_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.log('LOAD_CATEGORY_POSTS_FAILURE', err);
    yield put({
      type: LOAD_CATEGORY_POSTS_FAILURE,
      error: err
    });
  }
}

function loadHashtagPostsAPI(tag, lastId) {
  return axios.get(`/sns/hashtag/${encodeURIComponent(tag)}?lastId=${lastId || 0}&limit=10`);
}

function* loadHashtagPosts(action) {
  try {
    const result = yield call(loadHashtagPostsAPI, action.data, action.lastId);
    yield put({
      type: LOAD_HASHTAG_POSTS_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.log('LOAD_HASHTAG_POSTS_SUCCESS', err)
    yield put({
      type: LOAD_HASHTAG_POSTS_FAILURE,
      error: err
    });
  }
}

function loadSearchPostsAPI(text, lastId) {
  return axios.get(`/search/${encodeURIComponent(text)}?lastId=${lastId}&limit=10`);
}

function* loadSearchPosts(action) {
  try {
    const result = yield call(loadSearchPostsAPI, action.data, action.lastId);
    yield put({
      type: LOAD_SEARCH_POSTS_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.log('LOAD_SEARCH_POSTS_FAILURE', err);
    yield put({
      type: LOAD_SEARCH_POSTS_FAILURE,
      error: err,
    });
  }
}

function loadUserPostsAPI(id) {
  return axios.get(`/user/${id || 0}/posts`);
}

function* loadUserPosts(action) {
  try {
    const result = yield call(loadUserPostsAPI, action.data);
    yield put({
      type: LOAD_USER_POSTS_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.log('LOAD_USER_POSTS_FAILURE', err);
    yield put({
      type: LOAD_USER_POSTS_FAILURE,
      error: err,
    });
  }
}

function addCommentAPI(data) {
  return axios.post(
    `/post/${data.postId}/comment`, { content: data.content },
  );
}

function* addComment(action) {
  try {
    const result = yield call(addCommentAPI, action.data);
    yield put({
      type: ADD_COMMENT_SUCCESS,
      data: {
        postId: action.data.postId,
        comment: result.data,
      },
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: ADD_COMMENT_FAILURE,
      error: err,
    });
  }
}

function addReCommentAPI(data) {
  return axios.post(
    `/post/${data.postId}/comment/${data.parentId}`, { content: data.content });
}

function* addReComment(action) {
  try {
    const result = yield call(addReCommentAPI, action.data);
    yield put({
      type: ADD_RECOMMENT_SUCCESS,
      data: {
        postId: action.data.postId,
        parentId: result.data.ParentId,
        reComment: result.data,
      },
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: ADD_RECOMMENT_FAILURE,
      error: err,
    });
  }
}

function editCommentAPI(data) {
  return axios.patch(`/post/${data.postId}/comment/${data.commentId}`, { content: data.content });
}

function* editComment(action) {
  try {
    const result = yield call(editCommentAPI, action.data);
    yield put({
      type: EDIT_COMMENT_SUCCESS,
      data: {
        postId: action.data.postId,
        comment: result.data,
      },
    });
  } catch (err) {
    console.error(err);
    console.log(err);
    yield put({
      type: EDIT_COMMENT_FAILURE,
      error: err,
    });
  }
}

function removeCommentAPI(data) {
  return axios.delete(`/post/${data.postId}/comment/${data.commentId}`);
}

function* removeComment(action) {
  try {
    const result = yield call(removeCommentAPI, action.data);
    yield put({
      type: REMOVE_COMMENT_SUCCESS,
      data: {
        postId: action.data.postId,
        commentId: action.data.commentId,
        comment: result.data,
      },
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: REMOVE_COMMENT_FAILURE,
      error: e,
    });
  }
}

function loadCommentsAPI(data, limit) {
  return axios.get(`/sns/post/${data.postId}/comments?lastId=${lastId || 0}&limit=${limit || 10}`);
}

function* loadComments(action) {
  try {
    const result = yield call(loadCommentsAPI, action.data);
    yield put({
      type: LOAD_COMMENTS_SUCCESS,
      data: {
        postId: action.data.body.postId,
        comments: result.data.body,
        offset: action.data.offset,
      },
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_COMMENTS_FAILURE,
      error: err,
    });
  }
}

function uploadImagesAPI(formData) {
  return axios.post("/post/images", formData);
}

function* uploadImages(action) {
  try {
    const result = yield call(uploadImagesAPI, action.data);
    yield put({
      type: UPLOAD_IMAGES_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: UPLOAD_IMAGES_FAILURE,
      error: err,
    });
  }
}

function editImagesAPI(formData) {
  return axios.post("/post/images", formData);
}

function* editImages(action) {
  try {
    const result = yield call(editImagesAPI, action.data);
    yield put({
      type: UPLOAD_EDIT_IMAGES_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: UPLOAD_EDIT_IMAGES_FAILURE,
      error: err,
    });
  }
}

function likePostAPI(postId) {
  return axios.post(`/post/${postId}/like`);
}

function* likePost(action) {
  try {
    const result = yield call(likePostAPI, action.data);
    yield put({
      type: LIKE_POST_SUCCESS,
      data: {
        postId: action.data,
        userId: result.data.userId,
      },
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LIKE_POST_FAILURE,
      error: err,
    });
  }
}

function unlikePostAPI(postId) {
  return axios.delete(`/post/${postId}/like`);
}

function* unlikePost(action) {
  try {
    const result = yield call(unlikePostAPI, action.data);
    yield put({
      type: UNLIKE_POST_SUCCESS,
      data: {
        postId: action.data,
        userId: result.data.userId,
      },
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: UNLIKE_POST_FAILURE,
      error: err,
    });
  }
}

function retweetAPI(postId) {
  return axios.post(`/post/${postId}/retweet`);
}

function* retweet(action) {
  try {
    const result = yield call(retweetAPI, action.data);
    yield put({
      type: RETWEET_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: RETWEET_FAILURE,
      error: err,
    });
    alert(e.response && e.response.data);
  }
}

function removePostAPI(postId) {
  return axios.delete(`${INDEX_URL}/sns/post/${postId}`);
}

function* removePost(action) {
  try {
    const result = yield call(removePostAPI, action.data);
    yield put({
      type: REMOVE_POST_SUCCESS,
      data: result.data,
    });
    yield put({
      type: REMOVE_POST_OF_ME,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: REMOVE_POST_FAILURE,
      error: err,
    });
  }
}

function loadPostAPI(postId) {
  return axios.get(`/post/${postId}`);
}

function* loadPost(action) {
  try {
    const result = yield call(loadPostAPI, action.data);
    yield put({
      type: LOAD_POST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_POST_FAILURE,
      error: err,
    });
  }
}

function reportAPI(data) {
  return axios.post(`${INDEX_URL}/sns/post/${data.postId}/report`, data);
}

function* report(action) {
  try {
    const result = yield call(reportAPI, action.data);
    yield put({ // post reducer의 데이터를 수정
      type: REPORT_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: REPORT_FAILURE,
      error: err,
    });
  }
}

function* watchAddPost() {
  yield takeLatest(ADD_POST_REQUEST, addPost);
}

function* watchEditPost() {
  yield takeLatest(EDIT_POST_REQUEST, editPost);
}

function* watchLoadMainPosts() {
  yield takeLatest(LOAD_POSTS_REQUEST, loadMainPosts);
}

function* watchLoadFavoritePosts() {
  yield takeLatest(LOAD_FAVORITE_POSTS_REQUEST, loadFavoritePosts);
}

function* watchLoadCategoryPosts() {
  yield takeLatest(LOAD_CATEGORY_POSTS_REQUEST, loadCategoryPosts);
}

function* watchLoadHashtagPosts() {
  yield takeLatest(LOAD_HASHTAG_POSTS_REQUEST, loadHashtagPosts);
}

function* watchLoadSearchPosts() {
  yield takeLatest(LOAD_SEARCH_POSTS_REQUEST, loadSearchPosts);
}

function* watchLoadUserPosts() {
  yield takeLatest(LOAD_USER_POSTS_REQUEST, loadUserPosts);
}

function* watchAddComment() {
  yield takeLatest(ADD_COMMENT_REQUEST, addComment);
}

function* watchAddReComment() {
  yield takeLatest(ADD_RECOMMENT_REQUEST, addReComment);
}

function* watchEditComment() {
  yield takeLatest(EDIT_COMMENT_REQUEST, editComment);
}

function* watchRemoveComment() {
  yield takeLatest(REMOVE_COMMENT_REQUEST, removeComment);
}

function* watchLoadComments() {
  yield takeLatest(LOAD_COMMENTS_REQUEST, loadComments);
}

function* watchUploadImages() {
  yield takeLatest(UPLOAD_IMAGES_REQUEST, uploadImages);
}

function* watchEditImages() {
  yield takeLatest(UPLOAD_EDIT_IMAGES_REQUEST, editImages);
}

function* watchLikePost() {
  yield takeLatest(LIKE_POST_REQUEST, likePost);
}

function* watchUnlikePost() {
  yield takeLatest(UNLIKE_POST_REQUEST, unlikePost);
}

function* watchRetweet() {
  yield takeLatest(RETWEET_REQUEST, retweet);
}

function* watchRemovePost() {
  yield takeLatest(REMOVE_POST_REQUEST, removePost);
}

function* watchLoadPost() {
  yield takeLatest(LOAD_POST_REQUEST, loadPost);
}

function* watchReport() {
  yield takeLatest(REPORT_REQUEST, report);
}

export default function* postSaga() {
  yield all([
    fork(watchLoadMainPosts),
    fork(watchLoadFavoritePosts),
    fork(watchLoadCategoryPosts),
    fork(watchAddPost),
    fork(watchAddComment),
    fork(watchLoadComments),
    fork(watchLoadHashtagPosts),
    fork(watchLoadSearchPosts),
    fork(watchLoadUserPosts),
    fork(watchUploadImages),
    fork(watchLikePost),
    fork(watchUnlikePost),
    fork(watchRetweet),
    fork(watchRemovePost),
    fork(watchLoadPost),
    fork(watchEditPost),
    fork(watchEditImages),
    fork(watchEditComment),
    fork(watchRemoveComment),
    fork(watchReport),
    fork(watchAddReComment),
  ]);
}
