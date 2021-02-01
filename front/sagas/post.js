import { all, fork, takeLatest, put, throttle, call } from "redux-saga/effects";
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
  LOAD_MAIN_POSTS_FAILURE,
  LOAD_MAIN_POSTS_REQUEST,
  LOAD_MAIN_POSTS_SUCCESS,
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
import { INDEX_URL } from "../static";

function addPostAPI(postData) {
  return axios.post("/post", postData, {
    withCredentials: true,
  });
}

function* addPost(action) {
  try {
    const result = yield call(addPostAPI, action.data);
    yield put({
      // post reducer의 데이터를 수정
      type: ADD_POST_SUCCESS,
      data: result.data,
    });
    yield put({
      // user reducer의 데이터를 수정
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

function* watchAddPost() {
  yield takeLatest(ADD_POST_REQUEST, addPost);
}

function editPostAPI(postData) {
  return axios.patch("/post", postData, {
    withCredentials: true,
  });
}

function* editPost(action) {
  try {
    const result = yield call(editPostAPI, action.data);
    yield put({
      // post reducer의 데이터를 수정
      type: EDIT_POST_SUCCESS,
      data: result.data,
    });
  } catch (e) {
    yield put({
      type: EDIT_POST_FAILURE,
      error: e,
    });
  }
}

function* watchEditPost() {
  yield takeLatest(EDIT_POST_REQUEST, editPost);
}



const config = {
  headers: {
    'content-type': 'application/json;charset=UTF-8',
    'Accept': 'application/json',
  },
  data: {}
};

function loadMainPostsAPI(lastId = 0, limit = 10) {
  return axios.get(
    `${INDEX_URL}/sns/post/favorite?lastId=${lastId}&limit=${limit}`,  {config}  );
}

function* loadMainPosts(action) {
  try {
    const result = yield call(loadMainPostsAPI, action.lastId);
    yield put({
      type: LOAD_MAIN_POSTS_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.log('data' + err.response.data)
    yield put({
      type: LOAD_MAIN_POSTS_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchLoadMainPosts() {
  yield throttle(2000, LOAD_MAIN_POSTS_REQUEST, loadMainPosts);
}

function loadFavoritePostsAPI(lastId = 0, limit = 10) {
  return axios.get(
    `${INDEX_URL}/sns/post/favorite?lastId=${lastId}&limit=${limit}`
  );
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
      error: err.response.data,
    });
  }
}

function* watchLoadFavoritePosts() {
  yield throttle(2000, LOAD_FAVORITE_POSTS_REQUEST, loadFavoritePosts);
}

function loadCategoryPostsAPI(lastId = 0, limit = 10) {
  return axios.get(
    `${INDEX_URL}/sns/post/Category/INTER2?lastId=${lastId}&limit=${limit}`
  );
}

function* loadCategoryPosts(action) {
  try {
    const result = yield call(loadCategoryPostsAPI, action.lastId);
    yield put({
      type: LOAD_CATEGORY_POSTS_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: LOAD_CATEGORY_POSTS_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchLoadCategoryPosts() {
  yield throttle(2000, LOAD_CATEGORY_POSTS_REQUEST, loadCategoryPosts);
}

function loadHashtagPostsAPI(tag, lastId) {
  return axios.get(
    `/hashtag/${encodeURIComponent(tag)}?lastId=${lastId}&limit=10`
  );
}

function* loadHashtagPosts(action) {
  try {
    const result = yield call(loadHashtagPostsAPI, action.data, action.lastId);
    yield put({
      type: LOAD_HASHTAG_POSTS_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: LOAD_HASHTAG_POSTS_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchLoadHashtagPosts() {
  yield takeLatest(LOAD_HASHTAG_POSTS_REQUEST, loadHashtagPosts);
}

function loadSearchPostsAPI(text, lastId) {
  return axios.get(
    `/search/${encodeURIComponent(text)}?lastId=${lastId}&limit=10`
  );
}

function* loadSearchPosts(action) {
  try {
    const result = yield call(loadSearchPostsAPI, action.data, action.lastId);
    yield put({
      type: LOAD_SEARCH_POSTS_SUCCESS,
      data: result.data,
    });
  } catch (e) {
    yield put({
      type: LOAD_SEARCH_POSTS_FAILURE,
      error: e,
    });
  }
}

function* watchLoadSearchPosts() {
  yield takeLatest(LOAD_SEARCH_POSTS_REQUEST, loadSearchPosts);
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
  } catch (e) {
    yield put({
      type: LOAD_USER_POSTS_FAILURE,
      error: e,
    });
  }
}

function* watchLoadUserPosts() {
  yield takeLatest(LOAD_USER_POSTS_REQUEST, loadUserPosts);
}

function addCommentAPI(data) {
  return axios.post(
    `/post/${data.postId}/comment`,
    { content: data.content },
    {
      withCredentials: true,
    },
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
  } catch (e) {
    console.error(e);
    yield put({
      type: ADD_COMMENT_FAILURE,
      error: e,
    });
  }
}

function* watchAddComment() {
  yield takeLatest(ADD_COMMENT_REQUEST, addComment);
}

function addReCommentAPI(data) {
  return axios.post(
    `/post/${data.postId}/comment/${data.parentId}`,
    { content: data.content },
    {
      withCredentials: true,
    }
  );
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
  } catch (e) {
    console.error(e);
    yield put({
      type: ADD_RECOMMENT_FAILURE,
      error: e,
    });
  }
}

function* watchAddReComment() {
  yield takeLatest(ADD_RECOMMENT_REQUEST, addReComment);
}

function editCommentAPI(data) {
  return axios.patch(
    `/post/${data.postId}/comment/${data.commentId}`,
    { content: data.content },
    {
      withCredentials: true,
    }
  );
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
    console.log("hey???");
  } catch (e) {
    console.error(e);
    console.log(e);
    yield put({
      type: EDIT_COMMENT_FAILURE,
      error: e,
    });
  }
}

function* watchEditComment() {
  yield takeLatest(EDIT_COMMENT_REQUEST, editComment);
}

function removeCommentAPI(data) {
  return axios.delete(
    `/post/${data.postId}/comment/${data.commentId}`,
    {
      withCredentials: true,
    }
  );
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

function* watchRemoveComment() {
  yield takeLatest(REMOVE_COMMENT_REQUEST, removeComment);
}

function loadCommentsAPI(data, limit = 5) {
  return axios.get(
    `/post/${data.postId}/comments?offset=${data.offset}&limit=${limit}`,
    {
      withCredentials: true,
    }
  );
}

function* loadComments(action) {
  try {
    const result = yield call(loadCommentsAPI, action.data);
    yield put({
      type: LOAD_COMMENTS_SUCCESS,
      data: {
        postId: action.data.postId,
        comments: result.data,
        offset: action.data.offset,
      },
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: LOAD_COMMENTS_FAILURE,
      error: e,
    });
  }
}

function* watchLoadComments() {
  yield takeLatest(LOAD_COMMENTS_REQUEST, loadComments);
}

function uploadImagesAPI(formData) {
  return axios.post("/post/images", formData, {
    withCredentials: true,
  });
}

function* uploadImages(action) {
  try {
    const result = yield call(uploadImagesAPI, action.data);
    yield put({
      type: UPLOAD_IMAGES_SUCCESS,
      data: result.data,
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: UPLOAD_IMAGES_FAILURE,
      error: e,
    });
  }
}

function* watchUploadImages() {
  yield takeLatest(UPLOAD_IMAGES_REQUEST, uploadImages);
}

function editImagesAPI(formData) {
  return axios.post("/post/images", formData, {
    withCredentials: true,
  });
}

function* editImages(action) {
  try {
    const result = yield call(editImagesAPI, action.data);
    yield put({
      type: UPLOAD_EDIT_IMAGES_SUCCESS,
      data: result.data,
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: UPLOAD_EDIT_IMAGES_FAILURE,
      error: e,
    });
  }
}

function* watchEditImages() {
  yield takeLatest(UPLOAD_EDIT_IMAGES_REQUEST, editImages);
}

function likePostAPI(postId) {
  return axios.post(
    `/post/${postId}/like`,
    {
      withCredentials: true,
    }
  );
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
  } catch (e) {
    console.error(e);
    yield put({
      type: LIKE_POST_FAILURE,
      error: e,
    });
  }
}

function* watchLikePost() {
  yield takeLatest(LIKE_POST_REQUEST, likePost);
}

function unlikePostAPI(postId) {
  return axios.delete(
    `/post/${postId}/like`,
    {
      withCredentials: true,
    }
  );
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
  } catch (e) {
    console.error(e);
    yield put({
      type: UNLIKE_POST_FAILURE,
      error: e,
    });
  }
}

function* watchUnlikePost() {
  yield takeLatest(UNLIKE_POST_REQUEST, unlikePost);
}

function retweetAPI(postId) {
  return axios.post(
    `/post/${postId}/retweet`,
    {
      withCredentials: true,
    }
  );
}

function* retweet(action) {
  try {
    const result = yield call(retweetAPI, action.data);
    yield put({
      type: RETWEET_SUCCESS,
      data: result.data,
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: RETWEET_FAILURE,
      error: e,
    });
    alert(e.response && e.response.data);
  }
}

function* watchRetweet() {
  yield takeLatest(RETWEET_REQUEST, retweet);
}

function removePostAPI(postId) {
  return axios.delete(
    `/post/${postId}`,
    {
      withCredentials: true,
    }
  );
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
  } catch (e) {
    console.error(e);
    yield put({
      type: REMOVE_POST_FAILURE,
      error: e,
    });
  }
}

function* watchRemovePost() {
  yield takeLatest(REMOVE_POST_REQUEST, removePost);
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
  } catch (e) {
    console.error(e);
    yield put({
      type: LOAD_POST_FAILURE,
      error: e,
    });
  }
}

function* watchLoadPost() {
  yield takeLatest(LOAD_POST_REQUEST, loadPost);
}

function reportAPI(data) {
  return axios.post(
    `/post/${data.postId}/report`,
    data,
    {
      withCredentials: true,
    }
  );
}

function* report(action) {
  try {
    const result = yield call(reportAPI, action.data);
    yield put({
      // post reducer의 데이터를 수정
      type: REPORT_SUCCESS,
      data: result.data,
    });
  } catch (e) {
    yield put({
      type: REPORT_FAILURE,
      error: e,
    });
  }
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
