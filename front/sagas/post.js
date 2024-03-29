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
  LOAD_MAJOR_POSTS_REQUEST,
  LOAD_MAJOR_POSTS_SUCCESS,
  LOAD_MAJOR_POSTS_FAILURE,
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
  UPLOAD_EDIT_SUCCESS,
  UPLOAD_EDIT_FAILURE,
  UPLOAD_EDIT_REQUEST,
  EDIT_COMMENT_SUCCESS,
  EDIT_COMMENT_FAILURE,
  EDIT_COMMENT_REQUEST,
  EDIT_RECOMMENT_SUCCESS,
  EDIT_RECOMMENT_FAILURE,
  EDIT_RECOMMENT_REQUEST,
  REMOVE_COMMENT_SUCCESS,
  REMOVE_COMMENT_FAILURE,
  REMOVE_RECOMMENT_REQUEST,
  REMOVE_RECOMMENT_SUCCESS,
  REMOVE_RECOMMENT_FAILURE,
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
  LIKE_COMMENT_REQUEST,
  LIKE_COMMENT_SUCCESS,
  LIKE_COMMENT_FAILURE,
  UNLIKE_COMMENT_REQUEST,
  UNLIKE_COMMENT_SUCCESS,
  UNLIKE_COMMENT_FAILURE,
  LIKE_RECOMMENT_REQUEST,
  LIKE_RECOMMENT_SUCCESS,
  LIKE_RECOMMENT_FAILURE,
  UNLIKE_RECOMMENT_REQUEST,
  UNLIKE_RECOMMENT_SUCCESS,
  UNLIKE_RECOMMENT_FAILURE,
  REPORT_COMMENT_REQUEST,
  REPORT_COMMENT_SUCCESS,
  REPORT_COMMENT_FAILURE,
} from '../reducers/post';
import { INDEX_URL } from '../static';

function loadMainPostsAPI(lastId) {
  return axios.get(`${INDEX_URL}/sns/post/all?lastId=${lastId || 0}&limit=10`, { data: {} });
}

function* loadMainPosts(action) {
  try {
    const result = yield call(loadMainPostsAPI, action.lastId);
    yield put({
      type: LOAD_POSTS_SUCCESS,
      data: result.data.body,
    });
  } catch (err) {
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

function loadCategoryPostsAPI(data, lastId) {
  return axios.get(`${INDEX_URL}/sns/post/category/${data.inter}?lastId=${lastId || 0}&limit=10`, { data: {} });
}

function* loadCategoryPosts(action) {
  try {
    const result = yield call(loadCategoryPostsAPI, action.data, action.lastId);
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

function loadMajorPostsAPI(lastId) {
  return axios.get(`${INDEX_URL}/sns/post/major?lastId=${lastId || 0}&limit=10`, { data: {} });
}

function* loadMajorPosts(action) {
  try {
    const result = yield call(loadMajorPostsAPI, action.lastId);
    yield put({
      type: LOAD_MAJOR_POSTS_SUCCESS,
      data: result.data.body,
    });
  } catch (err) {
    yield put({
      type: LOAD_MAJOR_POSTS_FAILURE,
      error: err,
    });
  }
}

function loadHashtagPostsAPI(tag, lastId) {
  return axios.get(`${INDEX_URL}/sns/hashtag/${encodeURIComponent(tag)}?lastId=${lastId || 0}&limit=10`, { data: {} });
}

function* loadHashtagPosts(action) {
  try {
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

function loadSearchPostsAPI(keyword, lastId) {
  return axios.get(`${INDEX_URL}/sns/search/${encodeURIComponent(keyword)}?lastId=${lastId || 0}&limit=10`, { data: {} });
}

function* loadSearchPosts(action) {
  try {
    const result = yield call(loadSearchPostsAPI, action.data, action.lastId);
    yield put({
      type: LOAD_SEARCH_POSTS_SUCCESS,
      data: result.data.body,
    });
  } catch (err) {
    yield put({
      type: LOAD_SEARCH_POSTS_FAILURE,
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
    const result = yield call(addPostAPI, action.data, action.major);
    yield put({
      type: ADD_POST_SUCCESS,
      data: result.data.body,
      category: result.data.body.category,
    });
  } catch (err) {
    yield put({
      type: ADD_POST_FAILURE,
      error: err,
    });
  }
}

function editPostAPI(postData, postId) {
  return axios.patch(`${INDEX_URL}/sns/post/${postId}`, postData);
}

function* editPost(action) {
  try {
    const result = yield call(editPostAPI, action.data, action.postId);
    yield put({
      type: EDIT_POST_SUCCESS,
      data: result.data.body,
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
      data: result.data.body.id,
    });
  } catch (err) {
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

function reportCommentAPI(data) {
  return axios.post(`${INDEX_URL}/sns/post/${data.postId}/comment/${data.commentId}/report`, data);
}

function* reportComment(action) {
  try {
    const result = yield call(reportCommentAPI, action.data);
    yield put({
      type: REPORT_COMMENT_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: REPORT_COMMENT_FAILURE,
      error: err,
    });
  }
}

function loadUserInfoAPI(id) {
  return axios.get(`${INDEX_URL}/sns/user/${id}`, { data: {} });
}

function* loadUserInfo(action) {
  try {
    const result = yield call(loadUserInfoAPI, action.data);
    yield put({
      type: LOAD_USER_INFO_SUCCESS,
      data: result.data.body,
    });
  } catch (err) {
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
    const result = yield call(loadMyPostsAPI, action.lastId);
    yield put({
      type: LOAD_MY_POSTS_SUCCESS,
      data: result.data.body,
    });
  } catch (err) {
    yield put({
      type: LOAD_MY_POSTS_FAILURE,
      error: err,
    });
  }
}

function loadMyCommentsAPI(lastId) {
  return axios.get(`${INDEX_URL}/sns/user/me/comment/posts?lastId=${lastId || 0}&limit=10`, { data: {} });
}

function* loadMyComments(action) {
  try {
    const result = yield call(loadMyCommentsAPI, action.lastId);
    yield put({
      type: LOAD_MY_COMMENTS_SUCCESS,
      data: result.data.body,
    });
  } catch (err) {
    yield put({
      type: LOAD_MY_COMMENTS_FAILURE,
      error: err,
    });
  }
}

function loadMyLikeAPI(lastId) {
  return axios.get(`${INDEX_URL}/sns/user/me/like/posts?lastId=${lastId || 0}&limit=10`, { data: {} });
}

function* loadMyLike(action) {
  try {
    const result = yield call(loadMyLikeAPI, action.lastId);
    yield put({
      type: LOAD_MY_LIKE_SUCCESS,
      data: result.data.body,
    });
  } catch (err) {
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
    yield put({
      type: LOAD_COMMENTS_FAILURE,
      error: err.response.data,
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
        comment: result.data.body,
      },
    });
  } catch (err) {
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
        comment: result.data.body,
      },
    });
  } catch (err) {
    yield put({
      type: EDIT_COMMENT_FAILURE,
      error: err,
    });
  }
}

function editReCommentAPI(data) {
  return axios.patch(`${INDEX_URL}/sns/post/${data.postId}/comment/${data.commentId}`, data);
}

function* editReComment(action) {
  try {
    const result = yield call(editReCommentAPI, action.data);
    yield put({
      type: EDIT_RECOMMENT_SUCCESS,
      data: {
        postId: action.data.postId,
        comment: result.data.body,
        parentId: action.data.parentId,
      },
    });
  } catch (err) {
    yield put({
      type: EDIT_RECOMMENT_FAILURE,
      error: err,
    });
  }
}

function removeCommentAPI(postId, commentId) {
  return axios.delete(`${INDEX_URL}/sns/post/${postId}/comment/${commentId}`, { data: {} });
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
    yield put({
      type: REMOVE_COMMENT_FAILURE,
      error: e,
    });
  }
}

function removeReCommentAPI(postId, commentId) {
  return axios.delete(`${INDEX_URL}/sns/post/${postId}/comment/${commentId}`, { data: {} });
}

function* removeReComment(action) {
  try {
    const result = yield call(removeReCommentAPI, action.postId, action.commentId);
    yield put({
      type: REMOVE_RECOMMENT_SUCCESS,
      data: {
        postId: action.postId,
        commentId: action.commentId,
        comment: result.data.body,
        parentId: action.parentId,
      },
    });
  } catch (e) {
    yield put({
      type: REMOVE_RECOMMENT_FAILURE,
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
        parentId: action.data.parentId,
        reComment: result.data.body,
      },
    });
  } catch (err) {
    yield put({
      type: ADD_RECOMMENT_FAILURE,
      error: err,
    });
  }
}

function likeCommentAPI(postId, commentId) {
  return axios.post(`${INDEX_URL}/sns/post/${postId}/comment/${commentId}/like`, { data: {} });
}

function* likeComment(action) {
  try {
    const result = yield call(likeCommentAPI, action.postId, action.commentId);
    yield put({
      type: LIKE_COMMENT_SUCCESS,
      data: {
        postId: action.postId,
        commentId: action.commentId,
        userId: action.userId,
        like: result.data.body,
      },
    });
  } catch (err) {
    yield put({
      type: LIKE_COMMENT_FAILURE,
      error: err,
    });
  }
}

function unlikeCommentAPI(data) {
  return axios.delete(`${INDEX_URL}/sns/post/${data.postId}/comment/${data.commentId}/unlike`, { data: {} });
}

function* unlikeComment(action) {
  try {
    const result = yield call(unlikeCommentAPI, action.data);
    yield put({
      type: UNLIKE_COMMENT_SUCCESS,
      data: {
        postId: action.data.postId,
        commentId: action.data.commentId,
        userId: action.data.userId,
        unlike: result.data.body,
      },
    });
  } catch (e) {
    yield put({
      type: UNLIKE_COMMENT_FAILURE,
      error: e,
    });
  }
}

function likeReCommentAPI(postId, commentId) {
  return axios.post(`${INDEX_URL}/sns/post/${postId}/comment/${commentId}/like`, { data: {} });
}

function* likeReComment(action) {
  try {
    const result = yield call(likeReCommentAPI, action.postId, action.commentId);
    yield put({
      type: LIKE_RECOMMENT_SUCCESS,
      data: {
        postId: action.postId,
        commentId: action.commentId,
        parentId: action.parentId,
        userId: action.userId,
        like: result.data.body,
      },
    });
  } catch (err) {
    yield put({
      type: LIKE_RECOMMENT_FAILURE,
      error: err,
    });
  }
}

function unlikeReCommentAPI(data) {
  return axios.delete(`${INDEX_URL}/sns/post/${data.postId}/comment/${data.commentId}/unlike`, { data: {} });
}

function* unlikeReComment(action) {
  try {
    const result = yield call(unlikeReCommentAPI, action.data);
    yield put({
      type: UNLIKE_RECOMMENT_SUCCESS,
      data: {
        postId: action.data.postId,
        commentId: action.data.commentId,
        userId: action.data.userId,
        parentId: action.data.parentId,
        unlike: result.data.body,
      },
    });
  } catch (e) {
    yield put({
      type: UNLIKE_RECOMMENT_FAILURE,
      error: e,
    });
  }
}

function uploadAPI(formData) {
  return axios.post(`${INDEX_URL}/sns/upload`, formData);
}

function* upload(action) {
  try {
    const result = yield call(uploadAPI, action.data);
    yield put({
      type: UPLOAD_SUCCESS,
      data: result.data.body,
    });
  } catch (err) {
    yield put({
      type: UPLOAD_FAILURE,
      error: err,
    });
  }
}

function uploadEditAPI(formData) {
  return axios.post(`${INDEX_URL}/sns/upload`, formData);
}

function* uploadEdit(action) {
  try {
    const result = yield call(uploadEditAPI, action.data);
    yield put({
      type: UPLOAD_EDIT_SUCCESS,
      data: result.data.body,
    });
  } catch (err) {
    yield put({
      type: UPLOAD_EDIT_FAILURE,
      error: err,
    });
  }
}

function likePostAPI(postId) {
  return axios.post(`${INDEX_URL}/sns/post/${postId}/like`, { data: {} });
}

function* likePost(action) {
  try {
    const result = yield call(likePostAPI, action.data, action.user);
    yield put({
      type: LIKE_POST_SUCCESS,
      postId: action.data,
      user: action.user,
      data: result.data.body,
    });
  } catch (err) {
    yield put({
      type: LIKE_POST_FAILURE,
      error: err,
    });
  }
}

function unlikePostAPI(postId) {
  return axios.delete(`${INDEX_URL}/sns/post/${postId}/unlike`, { data: {} });
}

function* unlikePost(action) {
  try {
    const result = yield call(unlikePostAPI, action.postId, action.userId);
    yield put({
      type: UNLIKE_POST_SUCCESS,
      postId: action.postId,
      userId: action.userId,
      data: result.data.body,
    });
  } catch (err) {
    yield put({
      type: UNLIKE_POST_FAILURE,
      error: err,
    });
  }
}

function retweetAPI(postId) {
  return axios.post(`${INDEX_URL}/sns/post/${postId}/retweet`, { data: {} });
}

function* retweet(action) {
  try {
    const result = yield call(retweetAPI, action.data);
    yield put({
      type: RETWEET_SUCCESS,
      data: result.data.body,
    });
  } catch (err) {
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

function* watchLoadMajorPosts() {
  yield takeLatest(LOAD_MAJOR_POSTS_REQUEST, loadMajorPosts);
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

function* watchEditReComment() {
  yield takeLatest(EDIT_RECOMMENT_REQUEST, editReComment);
}

function* watchRemoveComment() {
  yield takeLatest(REMOVE_COMMENT_REQUEST, removeComment);
}

function* watchRemoveReComment() {
  yield takeLatest(REMOVE_RECOMMENT_REQUEST, removeReComment);
}

function* watchLoadComments() {
  yield takeLatest(LOAD_COMMENTS_REQUEST, loadComments);
}

function* watchLikeComment() {
  yield takeLatest(LIKE_COMMENT_REQUEST, likeComment);
}

function* watchUnlikeComment() {
  yield takeLatest(UNLIKE_COMMENT_REQUEST, unlikeComment);
}

function* watchLikeReComment() {
  yield takeLatest(LIKE_RECOMMENT_REQUEST, likeReComment);
}

function* watchUnlikeReComment() {
  yield takeLatest(UNLIKE_RECOMMENT_REQUEST, unlikeReComment);
}

function* watchUpload() {
  yield takeLatest(UPLOAD_REQUEST, upload);
}

function* watchUploadEdit() {
  yield takeLatest(UPLOAD_EDIT_REQUEST, uploadEdit);
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

function* watchReportComment() {
  yield takeLatest(REPORT_COMMENT_REQUEST, reportComment);
}

export default function* postSaga() {
  yield all([
    fork(watchLoadMainPosts),
    fork(watchLoadFavoritePosts),
    fork(watchLoadCategoryPosts),
    fork(watchLoadMajorPosts),
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
    fork(watchUploadEdit),
    fork(watchEditComment),
    fork(watchEditReComment),
    fork(watchRemoveComment),
    fork(watchRemoveReComment),
    fork(watchReport),
    fork(watchAddReComment),
    fork(watchMajorsData),
    fork(watchCategoryData),
    fork(watchLikeComment),
    fork(watchUnlikeComment),
    fork(watchLikeReComment),
    fork(watchUnlikeReComment),
    fork(watchReportComment),
  ]);
}
