import { all, fork, takeLatest, put, call } from 'redux-saga/effects';
import axios from 'axios';
import {
  ADD_POST_FAILURE,
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
  ADD_COMMENT_FAILURE,
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  LOAD_MAJOR_DATA_REQUEST,
  LOAD_MAJOR_DATA_SUCCESS,
  LOAD_MAJOR_DATA_FAILURE,
  LOAD_CATEGORY_DATA_REQUEST,
  LOAD_CATEGORY_DATA_SUCCESS,
  LOAD_CATEGORY_DATA_FAILURE,
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
  LOAD_USER_INFO_REQUEST,
  LOAD_USER_INFO_SUCCESS,
  LOAD_USER_INFO_FAILURE,
  LOAD_USER_POSTS_REQUEST,
  LOAD_USER_POSTS_FAILURE,
  LOAD_USER_POSTS_SUCCESS,
  LOAD_MY_POSTS_REQUEST,
  LOAD_MY_POSTS_SUCCESS,
  LOAD_MY_POSTS_FAILURE,
  LOAD_MY_COMMENTS_REQUEST,
  LOAD_MY_COMMENTS_SUCCESS,
  LOAD_MY_COMMENTS_FAILURE,
  LOAD_MY_LIKE_REQUEST,
  LOAD_MY_LIKE_SUCCESS,
  LOAD_MY_LIKE_FAILURE,
  REMOVE_POST_REQUEST,
  REMOVE_POST_SUCCESS,
  REMOVE_POST_FAILURE,
  RETWEET_FAILURE,
  RETWEET_REQUEST,
  RETWEET_SUCCESS,
  UNLIKE_POST_FAILURE,
  UNLIKE_POST_REQUEST,
  UNLIKE_POST_SUCCESS,
  UPLOAD_REQUEST,
  UPLOAD_SUCCESS,
  UPLOAD_FAILURE,
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
} from '../reducers/post';
import { ADD_POST_TO_ME, REMOVE_POST_OF_ME } from '../reducers/user';
import { INDEX_URL } from '../static';

function loadMainPostsAPI(lastId) {
  return axios.get(`${INDEX_URL}/sns/post/all?lastId=${lastId || 0}&limit=10`, { data: {} });
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
      error: err,
    });
  }
}

function loadFavoritePostsAPI(lastId = 0) {
  return axios.get(`${INDEX_URL}/sns/post/favorite?lastId=${lastId || 0}&limit=10`, { data: {} });
}

function* loadFavoritePosts(action) {
  try {
    const result = yield call(loadFavoritePostsAPI, action.lastId);
    yield put({
      type: LOAD_FAVORITE_POSTS_SUCCESS,
      data: result.data.body,
    });
  } catch (err) {
    yield put({
      type: LOAD_FAVORITE_POSTS_FAILURE,
      error: err,
    });
  }
}

function loadCategoryPostsAPI(lastId = 0, inter = 'INTER2') {
  return axios.get(`${INDEX_URL}/sns/post/category/${inter}?lastId=${lastId}&limit=10`, { data: {} });
}

function* loadCategoryPosts(action) {
  try {
    const result = yield call(loadCategoryPostsAPI, action.lastId, action.inter);
    yield put({
      type: LOAD_CATEGORY_POSTS_SUCCESS,
      data: result.data.body,
    });
  } catch (err) {
    yield put({
      type: LOAD_CATEGORY_POSTS_FAILURE,
      error: err,
    });
  }
}

function loadPostAPI(data) {
  return axios.get(`${INDEX_URL}/sns/post/${data.postId}`, { data: {} });
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

function addPostAPI(postData) {
  return axios.post(`${INDEX_URL}/sns/post`, postData);
}

function* addPost(action) {
  try {
    const result = yield call(addPostAPI, action.data);
    yield put({ // post reducer
      type: ADD_POST_SUCCESS,
      data: result.data.body,
    });
    yield put({ // user reducer
      type: ADD_POST_TO_ME,
      data: result.data.body.id,
    });
  } catch (err) {
    yield put({
      type: ADD_POST_FAILURE,
      error: err,
    });
  }
}

function editPostAPI(postData) {
  return axios.patch(`${INDEX_URL}/sns/post/${postData.postId}`, postData);
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

function removePostAPI(postId) {
  return axios.delete(`${INDEX_URL}/sns/post/${postId}`, { data: {} });
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

function reportAPI(data) {
  return axios.post(`${INDEX_URL}/sns/post/${data.postId}/report`, data);
}

function* report(action) {
  try {
    const result = yield call(reportAPI, action.data);
    yield put({
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

function loadHashtagPostsAPI(tag, lastId) {
  return axios.get(`${INDEX_URL}/sns/hashtag/${encodeURIComponent(tag)}?lastId=${lastId || 0}&limit=10`, { data: {} });
}

function* loadHashtagPosts(action) {
  try {
    console.log('loadHashtag console');
    const result = yield call(loadHashtagPostsAPI, action.data, action.lastId);
    yield put({
      type: LOAD_HASHTAG_POSTS_SUCCESS,
      data: result.data.body,
    });
  } catch (err) {
    yield put({
      type: LOAD_HASHTAG_POSTS_FAILURE,
      error: err,
    });
  }
}

function loadSearchPostsAPI(text, lastId) {
  return axios.get(`${INDEX_URL}/sns/search/${encodeURIComponent(text)}?lastId=${lastId}&limit=10`, { data: {} });
}

function* loadSearchPosts(action) {
  try {
    const result = yield call(loadSearchPostsAPI, action.data, action.lastId);
    yield put({
      type: LOAD_SEARCH_POSTS_SUCCESS,
      data: result.data.body,
    });
  } catch (err) {
    console.log('LOAD_SEARCH_POSTS_FAILURE', err);
    yield put({
      type: LOAD_SEARCH_POSTS_FAILURE,
      error: err,
    });
  }
}

function loadUserInfoAPI(id) {
  return axios.get(`${INDEX_URL}/sns/user/${id}`);
}

function* loadUserInfo(action) {
  try {
    const result = yield call(loadUserInfoAPI, action.data);
    yield put({
      type: LOAD_USER_INFO_SUCCESS,
      data: result.data.body,
    });
  } catch (err) {
    console.log('LOAD_USER_INFO_FAILURE', err);
    yield put({
      type: LOAD_USER_INFO_FAILURE,
      error: err,
    });
  }
}

function loadUserPostsAPI(id, lastId) {
  return axios.get(`${INDEX_URL}/sns/user/${id}/posts?lastId=${lastId || 0}&limit=10`, { data: {} });
}

function* loadUserPosts(action) {
  try {
    const result = yield call(loadUserPostsAPI, action.data, action.lastId);
    yield put({
      type: LOAD_USER_POSTS_SUCCESS,
      data: result.data.body,
    });
  } catch (err) {
    console.log('LOAD_USER_POSTS_FAILURE', err);
    yield put({
      type: LOAD_USER_POSTS_FAILURE,
      error: err,
    });
  }
}

function loadMyPostsAPI(lastId) {
  return axios.get(`${INDEX_URL}/sns/user/me/posts?lastId=${lastId || 0}&limit=10`, { data: {} });
}

function* loadMyPosts(action) {
  try {
    const result = yield call(loadMyPostsAPI, action.data, action.lastId);
    yield put({
      type: LOAD_MY_POSTS_SUCCESS,
      data: result.data.body,
    });
  } catch (err) {
    console.log('LOAD_USER_POSTS_FAILURE', err);
    yield put({
      type: LOAD_MY_POSTS_FAILURE,
      error: err,
    });
  }
}

function loadMyCommentsAPI(lastId) {
  return axios.get(`${INDEX_URL}/sns/user/me/comment/posts?lastId=${lastId}&limit=10`, { data: {} });
}

function* loadMyComments(action) {
  try {
    const result = yield call(loadMyCommentsAPI, action.data, action.lastId);
    yield put({
      type: LOAD_MY_COMMENTS_SUCCESS,
      data: result.data.body,
    });
  } catch (err) {
    console.log('LOAD_MY_COMMENTS_FAILURE', err);
    yield put({
      type: LOAD_MY_COMMENTS_FAILURE,
      error: err,
    });
  }
}

function loadMyLikeAPI(lastId) {
  return axios.get(`${INDEX_URL}/sns/user/me/like/posts?lastId=${lastId}&limit=10`, { data: {} });
}

function* loadMyLike(action) {
  try {
    const result = yield call(loadMyLikeAPI, action.data, action.lastId);
    yield put({
      type: LOAD_MY_LIKE_SUCCESS,
      data: result.data.body,
    });
  } catch (err) {
    console.log('LOAD_MY_LIKE_FAILURE', err);
    yield put({
      type: LOAD_MY_LIKE_FAILURE,
      error: err,
    });
  }
}

function loadCommentsAPI(data, lastId) {
  return axios.get(`${INDEX_URL}/sns/post/${data.postId}/comments?lastId=${lastId || 0}&limit=10`, { data: {} });
}

function* loadComments(action) {
  try {
    const result = yield call(loadCommentsAPI, action.data, action.lastId);
    yield put({
      type: LOAD_COMMENTS_SUCCESS,
      data: {
        postId: action.data.postId,
        comments: result.data.body,
        offset: action.lastId,
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

function addCommentAPI(content, postId) {
  return axios.post(`${INDEX_URL}/sns/post/${postId}/comment`, content);
}

function* addComment(action) {
  try {
    const result = yield call(addCommentAPI, action.data, action.postId);
    yield put({
      type: ADD_COMMENT_SUCCESS,
      data: {
        postId: action.postId,
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

function editCommentAPI(data) {
  return axios.patch(`${INDEX_URL}/sns/post/${data.postId}/comment/${data.commentId}`, data);
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

function removeCommentAPI(postId, commentId) {
  return axios.delete(`${INDEX_URL}/sns/post/${postId}/comment/${commentId}`);
}

function* removeComment(action) {
  try {
    const result = yield call(removeCommentAPI, action.postId, action.commentId);
    yield put({
      type: REMOVE_COMMENT_SUCCESS,
      data: {
        postId: action.postId,
        commentId: action.commentId,
        comment: result.data.body,
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

function addReCommentAPI(data) {
  return axios.post(`${INDEX_URL}/sns/post/${data.postId}/comment/${data.parentId}`, data);
}

function* addReComment(action) {
  try {
    const result = yield call(addReCommentAPI, action.data);
    yield put({
      type: ADD_RECOMMENT_SUCCESS,
      data: {
        postId: action.data.postId,
        parentId: result.data.body.id,
        reComment: result.data.body.reComment,
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

function uploadAPI(formData) {
  return axios.post(`${INDEX_URL}/sns/upload`, formData); // '/post/images'
}

function* upload(action) {
  try {
    const result = yield call(uploadAPI, action.data);
    yield put({
      type: UPLOAD_SUCCESS,
      data: result.data.body,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: UPLOAD_FAILURE,
      error: err,
    });
  }
}

function editImagesAPI(formData) { // upload 유무 파악중
  return axios.post('/post/images', formData);
}

function* editImages(action) {
  try {
    const result = yield call(editImagesAPI, action.data);
    yield put({
      type: UPLOAD_EDIT_IMAGES_SUCCESS,
      data: result.data.body,
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
  return axios.post(`${INDEX_URL}/sns/post/${postId}/like`, { data: {} });
}

function* likePost(action) {
  try {
    const result = yield call(likePostAPI, action.data);
    yield put({
      type: LIKE_POST_SUCCESS,
      data: {
        postId: action.data,
        userId: result.data.body.user.id,
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
  return axios.delete(`${INDEX_URL}/sns/post/${postId}/unlike`);
}

function* unlikePost(action) {
  try {
    const result = yield call(unlikePostAPI, action.data);
    yield put({
      type: UNLIKE_POST_SUCCESS,
      data: {
        postId: action.data,
        userId: result.data.body.user.id,
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
  return axios.post(`${INDEX_URL}/sns/post/${postId}/retweet`);
}

function* retweet(action) {
  try {
    const result = yield call(retweetAPI, action.data);
    yield put({
      type: RETWEET_SUCCESS,
      data: result.data.body,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: RETWEET_FAILURE,
      error: err,
    });
  }
}

function majorsDataAPI() {
  return axios.get(`${INDEX_URL}/sns/category/majors`, { data: {} });
}

function* majorsData(action) {
  try {
    const result = yield call(majorsDataAPI, action.data);
    yield put({
      type: LOAD_MAJOR_DATA_SUCCESS,
      data: result.data.body,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_MAJOR_DATA_FAILURE,
      error: err,
    });
  }
}

function categoryDataAPI() {
  return axios.get(`${INDEX_URL}/sns/category/interests`, { data: {} });
}

function* categoryData(action) {
  try {
    const result = yield call(categoryDataAPI, action.data);
    yield put({
      type: LOAD_CATEGORY_DATA_SUCCESS,
      data: result.data.body,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_CATEGORY_DATA_FAILURE,
      error: err,
    });
  }
}

function* watchAddPost() {
  yield takeLatest(ADD_POST_REQUEST, addPost);
}

function* watchMajorsData() {
  yield takeLatest(LOAD_MAJOR_DATA_REQUEST, majorsData);
}
function* watchCategoryData() {
  yield takeLatest(LOAD_CATEGORY_DATA_REQUEST, categoryData);
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

function* watchLoadUserInfo() {
  yield takeLatest(LOAD_USER_INFO_REQUEST, loadUserInfo);
}

function* watchLoadUserPosts() {
  yield takeLatest(LOAD_USER_POSTS_REQUEST, loadUserPosts);
}

function* watchLoadMyPosts() {
  yield takeLatest(LOAD_MY_POSTS_REQUEST, loadMyPosts);
}

function* watchLoadMyComments() {
  yield takeLatest(LOAD_MY_COMMENTS_REQUEST, loadMyComments);
}

function* watchLoadMyLike() {
  yield takeLatest(LOAD_MY_LIKE_REQUEST, loadMyLike);
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

function* watchUpload() {
  yield takeLatest(UPLOAD_REQUEST, upload);
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
    fork(watchLoadUserInfo),
    fork(watchLoadUserPosts),
    fork(watchLoadMyPosts),
    fork(watchLoadMyComments),
    fork(watchLoadMyLike),
    fork(watchUpload),
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
    fork(watchMajorsData),
    fork(watchCategoryData),
  ]);
}
