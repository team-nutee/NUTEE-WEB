import produce from '../util/produce';

export const initialState = {
  /* user */
  loadUserInfo: null, // 사용자의 정보 조회
  isLoadUserInfoLoading: false, // 사용자의 정보 로드
  isLoadUserInfoDone: false,
  isLoadUserInfoError: null,

  /* post */
  mainPosts: [], // 전체 포스트들
  categoryPosts: [], // 카테고리 포스트들
  majorPosts: [], // 전공 포스트들
  favoritePosts: [], // 즐겨찾기 포스트들
  myPosts: [], // 나의 전체 포스트들
  myCommentPosts: [], // 나의 댓글 포스트들
  myLikePosts: [], // 나의 좋아요 포스트들
  searchPosts: [], // 검색 포스트들
  imagePaths: [], // 미리보기 이미지 경로
  editImagePaths: [], // 수정 미리보기 이미지 경로
  singlePost: null,
  hasMorePosts: true,
  loadPostsLoading: false, // 모든 포스트 로드
  loadPostsDone: false,
  loadPostsError: null,
  loadMyPostsLoading: false, // 나의 포스트 로드
  loadMyPostsDone: false,
  loadMyPostsError: null,
  loadCategoryPostsLoading: false, // 카테고리 포스트 로드
  loadCategoryPostsDone: false,
  loadCategoryPostsError: null,
  loadFavoritePostsLoading: false, // 즐겨찾기 포스트 로드
  loadFavoritePostsDone: false,
  loadFavoritePostsError: null,
  loadMajorPostsLoading: false, // 전공 포스트 로드
  loadMajorPostsDone: false,
  loadMajorPostsError: null,
  loadSearchPostsLoading: false, // 전공 포스트 로드
  loadSearchPostsDone: false,
  loadSearchPostsError: null,
  addPostLoading: false, // 포스트 업로드
  addPostDone: false,
  addPostError: null,
  editPostLoading: false, // 포스트 수정
  editPostDone: false,
  editPostError: null,
  removePostLoading: false, // 포스트 삭제
  removePostDone: false,
  removePostError: null,
  likePostLoading: false, // 포스트 좋아요
  likePostDone: false,
  likePostError: null,
  unlikePostLoading: false, // 포스트 좋아요 취소
  unlikePostDone: false,
  unlikePostError: null,

  /* comment */
  commentList: [], // 댓글들
  loadCommentsLoading: false, // 댓글 로드
  loadCommentsDone: false,
  loadCommentsError: null,
  addCommentLoading: false, // 댓글 업로드
  addCommentDone: false,
  addCommentError: null,
  editCommentLoading: false, // 댓글 수정
  editCommentDone: false,
  editCommentError: null,
  editReCommentLoading: false, // 답글 수정
  editReCommentDone: false,
  editReCommentError: null,
  removeCommentLoading: false, // 댓글 삭제
  removeCommentDone: false,
  removeCommentError: null,
  removeReCommentLoading: false, // 답글 삭제
  removeReCommentDone: false,
  removeReCommentError: null,
  addReCommentLoading: false, // 답글 업로드
  addReCommentDone: false,
  addReCommentError: null,
  likeCommentLoading: false, // 댓글 좋아요
  likeCommentDone: false,
  likeCommentError: null,
  unlikeCommentLoading: false, // 댓글 좋아요 취소
  unlikeCommentDone: false,
  unlikeCommentError: null,
  likeReCommentLoading: false, // 답글 좋아요
  likeReCommentDone: false,
  likeReCommentError: null,
  unlikeReCommentLoading: false, // 답글 좋아요 취소
  unlikeReCommentDone: false,
  unlikeReCommentError: null,
  reportCommentLoading: false, // 댓글 신고
  reportCommentDone: false,
  reportCommentError: null,

  /* major&category data */
  majorsData: [],
  categoryData: [],
  loadMajorDataLoading: false, // 전공 목록 로드
  loadMajorDataDone: false,
  loadMajorDataError: null,
  loadCategoryLoading: false, // 카테고리 목록 로드
  loadCategoryDone: false,
  loadCategoryError: null,

  /* upload */
  uploadLoading: false, // 업로드
  uploadDone: false,
  uploadError: null,
  uploadEditImagesLoading: false, // 수정된 이미지 업로드
  uploadEditImagesDone: false,
  uploadEditImagesError: null,
};

export const LOAD_POSTS_REQUEST = 'LOAD_POSTS_REQUEST';
export const LOAD_POSTS_SUCCESS = 'LOAD_POSTS_SUCCESS';
export const LOAD_POSTS_FAILURE = 'LOAD_POSTS_FAILURE';

export const LOAD_FAVORITE_POSTS_REQUEST = 'LOAD_FAVORITE_POSTS_REQUEST';
export const LOAD_FAVORITE_POSTS_SUCCESS = 'LOAD_FAVORITE_POSTS_SUCCESS';
export const LOAD_FAVORITE_POSTS_FAILURE = 'LOAD_FAVORITE_POSTS_FAILURE';

export const LOAD_MAJOR_POSTS_REQUEST = 'LOAD_MAJOR_POSTS_REQUEST';
export const LOAD_MAJOR_POSTS_SUCCESS = 'LOAD_MAJOR_POSTS_SUCCESS';
export const LOAD_MAJOR_POSTS_FAILURE = 'LOAD_MAJOR_POSTS_FAILURE';

export const LOAD_CATEGORY_POSTS_REQUEST = 'LOAD_CATEGORY_POSTS_REQUEST';
export const LOAD_CATEGORY_POSTS_SUCCESS = 'LOAD_CATEGORY_POSTS_SUCCESS';
export const LOAD_CATEGORY_POSTS_FAILURE = 'LOAD_CATEGORY_POSTS_FAILURE';

export const LOAD_HASHTAG_POSTS_REQUEST = 'LOAD_HASHTAG_POSTS_REQUEST';
export const LOAD_HASHTAG_POSTS_SUCCESS = 'LOAD_HASHTAG_POSTS_SUCCESS';
export const LOAD_HASHTAG_POSTS_FAILURE = 'LOAD_HASHTAG_POSTS_FAILURE';

export const LOAD_SEARCH_POSTS_REQUEST = 'LOAD_SEARCH_POSTS_REQUEST';
export const LOAD_SEARCH_POSTS_SUCCESS = 'LOAD_SEARCH_POSTS_SUCCESS';
export const LOAD_SEARCH_POSTS_FAILURE = 'LOAD_SEARCH_POSTS_FAILURE';

export const LOAD_USER_POSTS_REQUEST = 'LOAD_USER_POSTS_REQUEST';
export const LOAD_USER_POSTS_SUCCESS = 'LOAD_USER_POSTS_SUCCESS';
export const LOAD_USER_POSTS_FAILURE = 'LOAD_USER_POSTS_FAILURE';

export const LOAD_USER_INFO_REQUEST = 'LOAD_USER_INFO_REQUEST';
export const LOAD_USER_INFO_SUCCESS = 'LOAD_USER_INFO_SUCCESS';
export const LOAD_USER_INFO_FAILURE = 'LOAD_USER_INFO_FAILURE';

export const LOAD_MY_POSTS_REQUEST = 'LOAD_MY_POSTS_REQUEST';
export const LOAD_MY_POSTS_SUCCESS = 'LOAD_MY_POSTS_SUCCESS';
export const LOAD_MY_POSTS_FAILURE = 'LOAD_MY_POSTS_FAILURE';

export const LOAD_MY_COMMENTS_REQUEST = 'LOAD_MY_COMMENTS_REQUEST';
export const LOAD_MY_COMMENTS_SUCCESS = 'LOAD_MY_COMMENTS_SUCCESS';
export const LOAD_MY_COMMENTS_FAILURE = 'LOAD_MY_COMMENTS_FAILURE';

export const LOAD_MY_LIKE_REQUEST = 'LOAD_MY_LIKE_REQUEST';
export const LOAD_MY_LIKE_SUCCESS = 'LOAD_MY_LIKE_SUCCESS';
export const LOAD_MY_LIKE_FAILURE = 'LOAD_MY_LIKE_FAILURE';

export const LOAD_MAJOR_DATA_REQUEST = 'LOAD_MAJOR_DATA_REQUEST';
export const LOAD_MAJOR_DATA_SUCCESS = 'LOAD_MAJOR_DATA_SUCCESS';
export const LOAD_MAJOR_DATA_FAILURE = 'LOAD_MAJOR_DATA_FAILURE';

export const LOAD_CATEGORY_DATA_REQUEST = 'LOAD_CATEGORY_DATA_REQUEST';
export const LOAD_CATEGORY_DATA_SUCCESS = 'LOAD_CATEGORY_DATA_SUCCESS';
export const LOAD_CATEGORY_DATA_FAILURE = 'LOAD_CATEGORY_DATA_FAILURE';

export const UPLOAD_REQUEST = 'UPLOAD_REQUEST';
export const UPLOAD_SUCCESS = 'UPLOAD_SUCCESS';
export const UPLOAD_FAILURE = 'UPLOAD_FAILURE';

export const UPLOAD_EDIT_REQUEST = 'UPLOAD_EDIT_REQUEST';
export const UPLOAD_EDIT_SUCCESS = 'UPLOAD_EDIT_SUCCESS';
export const UPLOAD_EDIT_FAILURE = 'UPLOAD_EDIT_FAILURE';

export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';

export const EDIT_POST_REQUEST = 'EDIT_POST_REQUEST';
export const EDIT_POST_SUCCESS = 'EDIT_POST_SUCCESS';
export const EDIT_POST_FAILURE = 'EDIT_POST_FAILURE';

export const EDIT_POST_IMAGES = 'EDIT_POST_IMAGES';

export const LIKE_POST_REQUEST = 'LIKE_POST_REQUEST';
export const LIKE_POST_SUCCESS = 'LIKE_POST_SUCCESS';
export const LIKE_POST_FAILURE = 'LIKE_POST_FAILURE';

export const UNLIKE_POST_REQUEST = 'UNLIKE_POST_REQUEST';
export const UNLIKE_POST_SUCCESS = 'UNLIKE_POST_SUCCESS';
export const UNLIKE_POST_FAILURE = 'UNLIKE_POST_FAILURE';

export const REPORT_COMMENT_REQUEST = 'REPORT_COMMENT_REQUEST';
export const REPORT_COMMENT_SUCCESS = 'REPORT_COMMENT_SUCCESS';
export const REPORT_COMMENT_FAILURE = 'REPORT_COMMENT_FAILURE';

export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE';

export const EDIT_COMMENT_REQUEST = 'EDIT_COMMENT_REQUEST';
export const EDIT_COMMENT_SUCCESS = 'EDIT_COMMENT_SUCCESS';
export const EDIT_COMMENT_FAILURE = 'EDIT_COMMENT_FAILURE';

export const EDIT_RECOMMENT_REQUEST = 'EDIT_RECOMMENT_REQUEST';
export const EDIT_RECOMMENT_SUCCESS = 'EDIT_RECOMMENT_SUCCESS';
export const EDIT_RECOMMENT_FAILURE = 'EDIT_RECOMMENT_FAILURE';

export const REMOVE_COMMENT_REQUEST = 'REMOVE_COMMENT_REQUEST';
export const REMOVE_COMMENT_SUCCESS = 'REMOVE_COMMENT_SUCCESS';
export const REMOVE_COMMENT_FAILURE = 'REMOVE_COMMENT_FAILURE';

export const REMOVE_RECOMMENT_REQUEST = 'REMOVE_RECOMMENT_REQUEST';
export const REMOVE_RECOMMENT_SUCCESS = 'REMOVE_RECOMMENT_SUCCESS';
export const REMOVE_RECOMMENT_FAILURE = 'REMOVE_RECOMMENT_FAILURE';

export const LOAD_COMMENTS_REQUEST = 'LOAD_COMMENTS_REQUEST';
export const LOAD_COMMENTS_SUCCESS = 'LOAD_COMMENTS_SUCCESS';
export const LOAD_COMMENTS_FAILURE = 'LOAD_COMMENTS_FAILURE';

export const ADD_RECOMMENT_REQUEST = 'ADD_RECOMMENT_REQUEST';
export const ADD_RECOMMENT_SUCCESS = 'ADD_RECOMMENT_SUCCESS';
export const ADD_RECOMMENT_FAILURE = 'ADD_RECOMMENT_FAILURE';

export const LIKE_COMMENT_REQUEST = 'LIKE_COMMENT_REQUEST';
export const LIKE_COMMENT_SUCCESS = 'LIKE_COMMENT_SUCCESS';
export const LIKE_COMMENT_FAILURE = 'LIKE_COMMENT_FAILURE';

export const UNLIKE_COMMENT_REQUEST = 'UNLIKE_COMMENT_REQUEST';
export const UNLIKE_COMMENT_SUCCESS = 'UNLIKE_COMMENT_SUCCESS';
export const UNLIKE_COMMENT_FAILURE = 'UNLIKE_COMMENT_FAILURE';

export const LIKE_RECOMMENT_REQUEST = 'LIKE_RECOMMENT_REQUEST';
export const LIKE_RECOMMENT_SUCCESS = 'LIKE_RECOMMENT_SUCCESS';
export const LIKE_RECOMMENT_FAILURE = 'LIKE_RECOMMENT_FAILURE';

export const UNLIKE_RECOMMENT_REQUEST = 'UNLIKE_RECOMMENT_REQUEST';
export const UNLIKE_RECOMMENT_SUCCESS = 'UNLIKE_RECOMMENT_SUCCESS';
export const UNLIKE_RECOMMENT_FAILURE = 'UNLIKE_RECOMMENT_FAILURE';

export const RETWEET_REQUEST = 'RETWEET_REQUEST';
export const RETWEET_SUCCESS = 'RETWEET_SUCCESS';
export const RETWEET_FAILURE = 'RETWEET_FAILURE';

export const REPORT_REQUEST = 'REPORT_REQUEST';
export const REPORT_SUCCESS = 'REPORT_SUCCESS';
export const REPORT_FAILURE = 'REPORT_FAILURE';

export const REMOVE_POST_REQUEST = 'REMOVE_POST_REQUEST';
export const REMOVE_POST_SUCCESS = 'REMOVE_POST_SUCCESS';
export const REMOVE_POST_FAILURE = 'REMOVE_POST_FAILURE';

export const LOAD_POST_REQUEST = 'LOAD_POST_REQUEST';
export const LOAD_POST_SUCCESS = 'LOAD_POST_SUCCESS';
export const LOAD_POST_FAILURE = 'LOAD_POST_FAILURE';

export const REMOVE_IMAGE = 'REMOVE_IMAGE';
export const REMOVE_EDIT_IMAGE = 'REMOVE_EDIT_IMAGE';
export const LOAD_EDIT_IMAGE = 'LOAD_EDIT_IMAGE';

export const addPost = (data) => ({
  type: ADD_POST_REQUEST,
  data,
});

export const addComment = (data) => ({
  type: ADD_COMMENT_REQUEST,
  data,
});

const reducer = (state = initialState, action) => produce(state, (draft) => {
  switch (action.type) {
    case LOAD_USER_INFO_REQUEST:
      draft.isLoadUserInfoLoading = true;
      draft.isLoadUserInfoError = null;
      draft.isLoadUserInfoDone = false;
      break;
    case LOAD_USER_INFO_SUCCESS:
      draft.isLoadUserInfoLoading = false;
      draft.loadUserInfo = action.data;
      draft.isLoadUserInfoDone = true;
      break;
    case LOAD_USER_INFO_FAILURE:
      draft.isLoadUserInfoLoading = false;
      draft.isLoadUserInfoError = action.error;
      break;
    case UPLOAD_REQUEST:
      draft.uploadLoading = true;
      draft.uploadDone = false;
      draft.uploadError = null;
      break;
    case UPLOAD_SUCCESS:
      draft.imagePaths = draft.imagePaths.concat(action.data);
      draft.uploadLoading = false;
      draft.uploadDone = true;
      break;
    case UPLOAD_FAILURE:
      draft.uploadLoading = false;
      draft.uploadError = action.error;
      break;
    case UPLOAD_EDIT_REQUEST:
      draft.uploadEditImagesLoading = true;
      draft.uploadEditImagesDone = false;
      draft.uploadEditImagesError = null;
      break;
    case UPLOAD_EDIT_SUCCESS:
      draft.editImagePaths = draft.editImagePaths.concat(action.data);
      draft.uploadEditImagesLoading = false;
      draft.uploadEditImagesDone = true;
      break;
    case UPLOAD_EDIT_FAILURE:
      draft.uploadEditImagesLoading = false;
      draft.uploadEditImagesError = action.error;
      break;
    case LOAD_EDIT_IMAGE:
      draft.editImagePaths = action.imageData;
      break;
    case REMOVE_IMAGE:
      draft.imagePaths.splice(action.index, 1);
      break;
    case REMOVE_EDIT_IMAGE:
      draft.editImagePaths.splice(action.index, 1);
      break;
    case ADD_POST_REQUEST:
      draft.addPostLoading = true;
      draft.addPostDone = false;
      draft.addPostError = null;
      break;
    case ADD_POST_SUCCESS:
      if (draft.categoryData.find((c) => c === action.category) !== undefined
      || draft.majorsData.find((m) => m === action.category) !== undefined) {
        draft.mainPosts.unshift(action.data);
      }
      if ((draft.categoryData.find((c) => c === action.category)) !== undefined) {
        draft.favoritePosts.unshift(action.data);
      }
      if ((draft.majorsData.find((m) => m === action.category)) !== undefined) {
        draft.majorPosts.unshift(action.data);
      }
      draft.imagePaths = [];
      draft.addPostLoading = false;
      draft.addPostDone = true;
      break;
    case ADD_POST_FAILURE:
      draft.addPostLoading = false;
      draft.addPostError = action.error;
      break;
    case EDIT_POST_REQUEST:
      draft.editPostLoading = true;
      draft.editPostDone = false;
      draft.editPostError = null;
      break;
    case EDIT_POST_SUCCESS: {
      const mainPostsIndex = draft.mainPosts.findIndex((v) => v.id === action.data.id);
      const favoritePostsIndex = draft.favoritePosts.findIndex((v) => v.id === action.data.id);
      const majorPostsIndex = draft.majorPosts.findIndex((v) => v.id === action.data.id);
      if (mainPostsIndex !== -1) draft.mainPosts[mainPostsIndex] = action.data;
      if (favoritePostsIndex !== -1) draft.favoritePosts[favoritePostsIndex] = action.data;
      if (majorPostsIndex !== -1) draft.majorPosts[majorPostsIndex] = action.data;
      draft.EditImagePaths = [];
      draft.editPostLoading = false;
      draft.editPostDone = true;
      break;
    }
    case EDIT_POST_FAILURE:
      draft.editPostLoading = false;
      draft.editPostError = action.error;
      break;
    case REPORT_REQUEST:
      break;
    case REPORT_SUCCESS:
      if (action.data.isBlocked) {
        const index = draft.mainPosts.findIndex((v) => v.id === action.data.postId);
        draft.mainPosts[index] = action.data;
      }
      break;
    case REPORT_FAILURE:
      break;
    case REMOVE_POST_REQUEST:
      break;
    case REMOVE_POST_SUCCESS: {
      const mainPostsIndex = draft.mainPosts.findIndex((v) => v.id === action.data);
      const favoritePostsIndex = draft.favoritePosts.findIndex((v) => v.id === action.data);
      const majorPostsIndex = draft.majorPosts.findIndex((v) => v.id === action.data);
      if (mainPostsIndex !== -1) draft.mainPosts.splice(mainPostsIndex, 1);
      if (favoritePostsIndex !== -1) draft.favoritePosts.splice(favoritePostsIndex, 1);
      if (majorPostsIndex !== -1) draft.majorPosts.splice(majorPostsIndex, 1);
      draft.unlikePostLoading = false;
      draft.unlikePostDone = true;
      break;
    }
    case REMOVE_POST_FAILURE:
      break;
    case EDIT_POST_IMAGES:
      draft.editImagePaths = action.data;
      break;
    case ADD_RECOMMENT_REQUEST:
      draft.addReCommentLoading = true;
      draft.addReCommentDone = false;
      draft.addReCommentError = null;
      break;
    case ADD_RECOMMENT_SUCCESS: {
      const postIndex = draft.mainPosts.findIndex(
        (v) => v.id === action.data.postId,
      );
      const commentIndex = draft.commentList[postIndex].findIndex(
        (v) => v.id === action.data.parentId,
      );
      if (draft.commentList[postIndex][commentIndex].reComment === null) {
        draft.commentList[postIndex][commentIndex].reComment = [];
      }
      draft.commentList[postIndex][commentIndex].reComment.push(action.data.reComment);
      const reCommentIndex = draft.commentList[postIndex][commentIndex].reComment.findIndex(
        (v) => v.id === action.data.reComment.id,
      );
      if (draft.commentList[postIndex][commentIndex].reComment[reCommentIndex].likers === null) {
        draft.commentList[postIndex][commentIndex].reComment[reCommentIndex].likers = [];
      }
      draft.addReCommentLoading = false;
      draft.addReCommentDone = true;
      break;
    }
    case ADD_RECOMMENT_FAILURE:
      draft.addReCommentLoading = false;
      draft.addReCommentError = action.error;
      break;
    case EDIT_COMMENT_REQUEST:
      draft.editCommentLoading = true;
      draft.editCommentDone = false;
      draft.editCommentError = null;
      break;
    case EDIT_COMMENT_SUCCESS: {
      const postIndex = draft.mainPosts.findIndex(
        (v) => v.id === action.data.postId,
      );
      const commentId = action.data.comment.id;
      const commentIndex = draft.commentList[postIndex].findIndex((v) => v.id === commentId);
      draft.commentList[postIndex][commentIndex] = action.data.comment;
      if (draft.commentList[postIndex][commentIndex].likers === null) {
        draft.commentList[postIndex][commentIndex].likers = [];
      }
      draft.editCommentLoading = false;
      draft.editCommentDone = true;
      break;
    }
    case EDIT_COMMENT_FAILURE:
      draft.editCommentLoading = false;
      draft.editCommentError = action.error;
      break;
    case EDIT_RECOMMENT_REQUEST:
      draft.editCommentLoading = true;
      draft.editCommentDone = false;
      draft.editCommentError = null;
      break;
    case EDIT_RECOMMENT_SUCCESS: {
      const postIndex = draft.mainPosts.findIndex(
        (v) => v.id === action.data.postId,
      );
      const commentIndex = draft.commentList[postIndex
      ].findIndex((v) => v.id === action.data.parentId);
      const reCommentIndex = draft.commentList[postIndex][commentIndex
      ].reComment.findIndex((v) => v.id === action.data.comment.id);
      draft.commentList[postIndex][commentIndex].reComment[reCommentIndex] = action.data.comment;
      if (draft.commentList[postIndex][commentIndex].reComment[reCommentIndex].likers === null) {
        draft.commentList[postIndex][commentIndex].reComment[reCommentIndex].likers = [];
      }
      draft.editCommentLoading = false;
      draft.editCommentDone = true;
      break;
    }
    case EDIT_RECOMMENT_FAILURE:
      draft.editCommentLoading = false;
      draft.editCommentError = action.error;
      break;
    case REMOVE_COMMENT_REQUEST:
      draft.removeCommentLoading = true;
      draft.removeCommentDone = false;
      draft.removeCommentError = null;
      break;
    case REMOVE_COMMENT_SUCCESS: {
      const postIndex = draft.mainPosts.findIndex((v) => v.id === action.data.postId);
      const commentIndex = draft.commentList[postIndex].findIndex(
        (v) => v.id === action.data.commentId,
      );
      draft.commentList[postIndex].splice(commentIndex, 1);
      draft.removeCommentLoading = false;
      draft.removeCommentDone = true;
      break;
    }
    case REMOVE_COMMENT_FAILURE:
      draft.removeCommentLoading = false;
      draft.removeCommentError = action.error;
      break;
    case REMOVE_RECOMMENT_REQUEST:
      draft.removeReCommentLoading = true;
      draft.removeReCommentDone = false;
      draft.removeReCommentError = null;
      break;
    case REMOVE_RECOMMENT_SUCCESS: {
      const postIndex = draft.mainPosts.findIndex((v) => v.id === action.data.postId);
      const commentIndex = draft.commentList[postIndex].findIndex(
        (v) => v.id === action.data.parentId,
      );
      draft.commentList[postIndex][commentIndex].reComment = draft.commentList[postIndex
      ][commentIndex].reComment.filter((v) => v.id !== action.data.commentId);
      draft.removeReCommnetLoading = false;
      draft.removeReCommnetDone = true;
      break;
    }
    case REMOVE_RECOMMENT_FAILURE:
      draft.removeReCommentLoading = false;
      draft.removeReCommentError = action.error;
      break;
    case ADD_COMMENT_REQUEST:
      draft.addCommentLoading = true;
      draft.addCommentDone = false;
      draft.addCommentError = null;
      break;
    case ADD_COMMENT_SUCCESS: {
      const commentId = action.data.comment.id;
      const postIndex = draft.mainPosts.findIndex(
        (v) => v.id === action.data.postId,
      );
      draft.commentList[postIndex].push(action.data.comment);
      const commentIndex = draft.commentList[postIndex].findIndex(
        (v) => v.id === commentId,
      );
      if (draft.commentList[postIndex][commentIndex].likers === null) {
        draft.commentList[postIndex][commentIndex].likers = [];
      }
      draft.addCommentLoading = false;
      draft.addCommentDone = true;
      break;
    }
    case ADD_COMMENT_FAILURE:
      draft.addCommentLoading = false;
      draft.addCommentsError = action.error;
      break;
    case LIKE_COMMENT_REQUEST:
      draft.likeCommentLoading = true;
      draft.likeCommentDone = false;
      draft.likeCommentError = null;
      break;
    case LIKE_COMMENT_SUCCESS: {
      const postIndex = draft.mainPosts.findIndex(
        (v) => v.id === action.data.postId,
      );
      const commentIndex = draft.commentList[postIndex].findIndex(
        (v) => v.id === action.data.commentId,
      );
      draft.commentList[postIndex][commentIndex].likers.push({ id: action.data.userId });
      draft.likeCommentLoading = false;
      draft.likeCommentDone = true;
      break;
    }
    case LIKE_COMMENT_FAILURE:
      draft.likeCommentLoading = false;
      draft.likeCommentsError = action.error;
      break;
    case UNLIKE_COMMENT_REQUEST:
      draft.unlikeCommentLoading = true;
      draft.unlikeCommentDone = false;
      draft.unlikeCommentError = null;
      break;
    case UNLIKE_COMMENT_SUCCESS: {
      const postIndex = draft.mainPosts.findIndex((v) => v.id === action.data.postId);
      const commentIndex = draft.commentList[postIndex].findIndex(
        (v) => v.id === action.data.commentId,
      );
      const likeIndex = draft.commentList[postIndex][commentIndex].likers.findIndex(
        (v) => v.id === action.data.userId,
      );
      draft.commentList[postIndex][commentIndex].likers.splice(likeIndex, 1);
      draft.unlikeCommentLoading = false;
      draft.unlikeCommentDone = true;
      break;
    }
    case UNLIKE_COMMENT_FAILURE:
      draft.unlikeCommentLoading = false;
      draft.unlikeCommentsError = action.error;
      break;
    case LIKE_RECOMMENT_REQUEST:
      draft.likeReCommentLoading = true;
      draft.likeReCommentDone = false;
      draft.likeReCommentError = null;
      break;
    case LIKE_RECOMMENT_SUCCESS: {
      const postIndex = draft.mainPosts.findIndex(
        (v) => v.id === action.data.postId,
      );
      const commentIndex = draft.commentList[postIndex].findIndex(
        (v) => v.id === action.data.parentId,
      );
      const reCommnetIndex = draft.commentList[postIndex][commentIndex].reComment.findIndex(
        (v) => v.id === action.data.commentId,
      );
      draft.commentList[postIndex][commentIndex].reComment[reCommnetIndex].likers.push(
        { id: action.data.userId },
      );
      draft.likeReCommentLoading = false;
      draft.likeReCommentDone = true;
      break;
    }
    case LIKE_RECOMMENT_FAILURE:
      draft.likeReCommentLoading = false;
      draft.likeReCommentsError = action.error;
      break;
    case UNLIKE_RECOMMENT_REQUEST:
      draft.unlikeReCommentLoading = true;
      draft.unlikeReCommentDone = false;
      draft.unlikeReCommentError = null;
      break;
    case UNLIKE_RECOMMENT_SUCCESS: {
      const postIndex = draft.mainPosts.findIndex(
        (v) => v.id === action.data.postId,
      );
      const commentIndex = draft.commentList[postIndex].findIndex(
        (v) => v.id === action.data.parentId,
      );
      const reCommentIndex = draft.commentList[postIndex][commentIndex].reComment.findIndex(
        (v) => v.id === action.data.commentId,
      );
      const likeIndex = draft.commentList[postIndex][commentIndex].reComment[
        reCommentIndex].likers.findIndex((v) => v.id === action.data.userId);
      draft.commentList[postIndex][commentIndex].reComment[
        reCommentIndex].likers.splice(likeIndex, 1);
      draft.unlikeReCommentLoading = false;
      draft.unlikeReCommentDone = true;
      break;
    }
    case UNLIKE_RECOMMENT_FAILURE:
      draft.unlikeReCommentLoading = false;
      draft.unlikeReCommentsError = action.error;
      break;
    case LOAD_COMMENTS_REQUEST:
      draft.loadCommentsLoading = true;
      draft.loadCommentsDone = false;
      draft.loadCommentsError = null;
      break;
    case LOAD_COMMENTS_SUCCESS: {
      const postIndex = draft.mainPosts.findIndex(
        (v) => v.id === action.data.postId,
      );
      if (action.data.comments !== null) {
        draft.commentList[postIndex] = action.data.comments;
        if (action.data.offset === 0) {
          draft.mainPosts[postIndex].commentNum = action.data.comments.length;
        } else {
          draft.mainPosts[postIndex].commentNum = draft.mainPosts[postIndex
          ].commentNum.concat(action.data.comments);
        }
      } else {
        draft.commentList[postIndex] = [];
      }
      draft.loadCommentsLoading = false;
      draft.loadCommentsDone = true;
      break;
    }
    case LOAD_COMMENTS_FAILURE:
      draft.addCommentLoading = false;
      draft.loadCommentsError = action.error;
      break;
    case LOAD_CATEGORY_POSTS_REQUEST:
      draft.categoryPosts = !action.lastId ? [] : draft.categoryPosts;
      draft.hasMorePost = action.lastId ? draft.hasMorePost : true;
      draft.loadCategoryPostsLoading = true;
      draft.loadCategoryPostsDone = false;
      draft.loadCategoryPostsError = null;
      break;
    case LOAD_CATEGORY_POSTS_SUCCESS:
      action.data.forEach((data) => { draft.categoryPosts.push(data); });
      draft.hasMorePost = action.data.length === 10;
      draft.loadCategoryPostsLoading = false;
      draft.loadCategoryPostsDone = true;
      break;
    case LOAD_CATEGORY_POSTS_FAILURE:
      draft.loadCategoryPostsLoading = false;
      draft.loadCategoryPostsError = action.error;
      break;
    case LOAD_FAVORITE_POSTS_REQUEST:
      draft.favoritePosts = !action.lastId ? [] : draft.favoritePosts;
      draft.hasMorePost = action.lastId ? draft.hasMorePost : true;
      draft.loadFavoritePostsLoading = true;
      draft.loadFavoritePostsDone = false;
      draft.loadFavoritePostsError = null;
      break;
    case LOAD_FAVORITE_POSTS_SUCCESS:
      action.data.forEach((data) => { draft.favoritePosts.push(data); });
      draft.hasMorePost = action.data.length === 10;
      draft.loadFavoritePostsLoading = false;
      draft.loadFavoritePostsDone = true;
      break;
    case LOAD_FAVORITE_POSTS_FAILURE:
      draft.loadFavoritePostsLoading = false;
      draft.loadFavoritePostsDone = true;
      break;
    case LOAD_MAJOR_POSTS_REQUEST:
      draft.majorPosts = !action.lastId ? [] : draft.majorPosts;
      draft.hasMorePost = action.lastId ? draft.hasMorePost : true;
      draft.loadMajorPostsLoading = true;
      draft.loadMajorPostsDone = false;
      draft.loadMajorPostsError = null;
      break;
    case LOAD_MAJOR_POSTS_SUCCESS:
      action.data.forEach((data) => {
        draft.majorPosts.push(data);
      });
      draft.loadMajorPostsLoading = false;
      draft.loadMajorPostsDone = true;
      break;
    case LOAD_MAJOR_POSTS_FAILURE:
      draft.loadMajorPostsLoading = false;
      // draft.loadMajorPostsError = action.error;
      break;
    case LOAD_MY_POSTS_REQUEST:
      draft.loadMyPostsLoading = true;
      draft.loadMyPostsDone = false;
      draft.loadMyPostsError = null;
      draft.myPosts = !action.lastId ? [] : draft.myPosts;
      draft.hasMorePost = action.lastId ? draft.hasMorePost : true;
      break;
    case LOAD_MY_POSTS_SUCCESS:
      action.data.forEach((data) => {
        draft.myPosts.push(data);
      });
      action.data.forEach((data) => {
        if (!draft.mainPosts.includes(data)) {
          draft.mainPosts.push(data);
        }
      });
      draft.hasMorePost = action.data.length === 10;
      draft.loadMyPostsLoading = false;
      draft.loadMyPostsDone = true;
      break;
    case LOAD_MY_POSTS_FAILURE:
      draft.loadMyPostsLoading = false;
      break;
    case LOAD_MY_COMMENTS_REQUEST:
      draft.myCommentPosts = !action.lastId ? [] : draft.myCommentPosts;
      draft.hasMorePost = action.lastId ? draft.hasMorePost : true;
      break;
    case LOAD_MY_COMMENTS_SUCCESS:
      action.data.forEach((data) => {
        draft.myCommentPosts.push(data);
      });
      action.data.forEach((data) => {
        if (!draft.mainPosts.includes(data)) {
          draft.mainPosts.push(data);
        }
      });
      draft.hasMorePost = action.data.length === 10;
      break;
    case LOAD_MY_COMMENTS_FAILURE:
      break;
    case LOAD_MY_LIKE_REQUEST:
      draft.myLikePosts = !action.lastId ? [] : draft.myLikePosts;
      draft.hasMorePost = action.lastId ? draft.hasMorePost : true;
      break;
    case LOAD_MY_LIKE_SUCCESS:
      action.data.forEach((data) => {
        draft.myLikePosts.push(data);
      });
      action.data.forEach((data) => {
        if (!draft.mainPosts.includes(data)) {
          draft.mainPosts.push(data);
        }
      });
      draft.hasMorePost = action.data.length === 10;
      break;
    case LOAD_MY_LIKE_FAILURE:
      break;
    case LIKE_POST_REQUEST:
      draft.likePostLoading = true;
      draft.likePostDone = false;
      draft.likePostError = null;
      break;
    case LIKE_POST_SUCCESS: {
      const { postId, user } = action;
      const mainPostsIndex = draft.mainPosts.findIndex((v) => v.id === postId);
      const favoritePostsIndex = draft.favoritePosts.findIndex((v) => v.id === postId);
      const majorPostsIndex = draft.majorPosts.findIndex((v) => v.id === postId);
      const myCommentPostsIndex = draft.myCommentPosts.findIndex((v) => v.id === postId);
      const myLikePostsIndex = draft.myLikePosts.findIndex((v) => v.id === postId);
      if (mainPostsIndex !== -1) {
        if (draft.mainPosts[mainPostsIndex].likers === null) {
          draft.mainPosts[mainPostsIndex].likers = [];
          draft.mainPosts[mainPostsIndex].likers.push({ id: user.id });
        } else draft.mainPosts[mainPostsIndex].likers.push({ id: user.id });
      }
      if (favoritePostsIndex !== -1) {
        if (draft.favoritePosts[favoritePostsIndex].likers === null) {
          draft.favoritePosts[favoritePostsIndex].likers = [];
          draft.favoritePosts[favoritePostsIndex].likers.push({ id: user.id });
        } else draft.favoritePosts[favoritePostsIndex].likers.push({ id: user.id });
      }
      if (majorPostsIndex !== -1) {
        if (draft.majorPosts[majorPostsIndex].likers === null) {
          draft.majorPosts[majorPostsIndex].likers = [];
          draft.majorPosts[majorPostsIndex].likers.push({ id: user.id });
        } else draft.majorPosts[majorPostsIndex].likers.push({ id: user.id });
      }
      if (myCommentPostsIndex !== -1) {
        if (draft.myCommentPosts[myCommentPostsIndex].likers === null) {
          draft.myCommentPosts[myCommentPostsIndex].likers = [];
          draft.myCommentPosts[myCommentPostsIndex].likers.push({ id: user.id });
        } else draft.myCommentPosts[myCommentPostsIndex].likers.push({ id: user.id });
      }
      if (myLikePostsIndex !== -1) {
        if (draft.myLikePosts[myLikePostsIndex].likers === null) {
          draft.myLikePosts[myLikePostsIndex].likers = [];
          draft.myLikePosts[myLikePostsIndex].likers.push({ id: user.id });
        } else draft.myLikePosts[myLikePostsIndex].likers.push({ id: user.id });
      }
      draft.likePostLoading = false;
      draft.likePostDone = true;
      break;
    }
    case LIKE_POST_FAILURE:
      draft.likePostLoading = false;
      draft.likePostError = action.error;
      break;
    case UNLIKE_POST_REQUEST:
      draft.unlikePostLoading = true;
      draft.unlikePostDone = false;
      draft.unlikePostError = null;
      break;
    case UNLIKE_POST_SUCCESS: {
      const mainPostsIndex = draft.mainPosts.findIndex((v) => v.id === action.postId);
      const favoritePostsIndex = draft.favoritePosts.findIndex((v) => v.id === action.postId);
      const majorPostsIndex = draft.majorPosts.findIndex((v) => v.id === action.postId);
      const myCommentPostsIndex = draft.myCommentPosts.findIndex((v) => v.id === action.postId);
      const myLikePostsIndex = draft.myLikePosts.findIndex((v) => v.id === action.postId);
      if (mainPostsIndex !== -1) {
        const mainPostLikeIndex = draft.mainPosts[mainPostsIndex
        ].likers.findIndex((v) => v.id !== action.userId);
        draft.mainPosts[mainPostsIndex].likers.splice(mainPostLikeIndex, 1);
      }
      if (favoritePostsIndex !== -1) {
        const favoritePostLikeIndex = draft.mainPosts[favoritePostsIndex
        ].likers.findIndex((v) => v.id !== action.userId);
        draft.favoritePosts[favoritePostsIndex].likers.splice(favoritePostLikeIndex, 1);
      }
      if (majorPostsIndex !== -1) {
        const majorPostLikeIndex = draft.mainPosts[majorPostsIndex
        ].likers.findIndex((v) => v.id !== action.userId);
        draft.majorPosts[majorPostsIndex].likers.splice(majorPostLikeIndex, 1);
      }
      if (myCommentPostsIndex !== -1) {
        const myCommentPostLikeIndex = draft.myCommentPosts[myCommentPostsIndex
        ].likers.findIndex((v) => v.id !== action.userId);
        draft.myCommentPosts[myCommentPostsIndex].likers.splice(myCommentPostLikeIndex, 1);
      }
      if (myLikePostsIndex !== -1) {
        const myLikePostLikeIndex = draft.myLikePosts[myLikePostsIndex
        ].likers.findIndex((v) => v.id !== action.userId);
        draft.myLikePosts[myLikePostsIndex].likers.splice(myLikePostLikeIndex, 1);
      }
      draft.unlikePostLoading = false;
      draft.unlikePostDone = true;
      break;
    }
    case UNLIKE_POST_FAILURE:
      draft.unlikePostLoading = false;
      draft.unlikePostError = action.error;
      break;
    case LOAD_SEARCH_POSTS_REQUEST:
      draft.searchPosts = !action.lastId ? [] : draft.searchPosts;
      draft.hasMorePost = action.lastId ? draft.hasMorePost : true;
      draft.loadSearchPostsLoading = true;
      draft.loadSearchPostsDone = false;
      draft.loadSearchPostsError = null;
      break;
    case LOAD_SEARCH_POSTS_SUCCESS:
      action.data.forEach((data) => { draft.searchPosts.push(data); });
      draft.hasMorePost = action.data.length === 10;
      draft.loadsearchPostsLoading = false;
      draft.loadsearchPostsDone = true;
      break;
    case LOAD_SEARCH_POSTS_FAILURE:
      draft.loadsearchPostsLoading = false;
      // draft.loadSearchPostsError = action.error;
      break;
    case LOAD_POSTS_REQUEST:
    case LOAD_HASHTAG_POSTS_REQUEST:
    case LOAD_USER_POSTS_REQUEST:
      draft.mainPosts = !action.lastId ? [] : draft.mainPosts;
      draft.hasMorePost = action.lastId ? draft.hasMorePost : true;
      draft.loadPostsLoading = true;
      draft.loadPostsDone = false;
      draft.loadPostsError = null;
      break;
    case LOAD_POSTS_SUCCESS:
    case LOAD_HASHTAG_POSTS_SUCCESS:
    case LOAD_USER_POSTS_SUCCESS:
      action.data.forEach((data) => { draft.mainPosts.push(data); });
      draft.hasMorePost = action.data.length === 10;
      draft.loadPostsLoading = false;
      draft.loadPostsDone = true;
      break;
    case LOAD_POSTS_FAILURE:
    case LOAD_HASHTAG_POSTS_FAILURE:
    case LOAD_USER_POSTS_FAILURE:
      draft.loadPostsLoading = false;
      // draft.loadPostError = action.error;
      break;
    case LOAD_MAJOR_DATA_REQUEST:
      draft.loadMajorDataLoading = true;
      draft.loadMajorDataDone = false;
      draft.loadMajorDataError = null;
      break;
    case LOAD_MAJOR_DATA_SUCCESS:
      draft.loadMajorDataLoading = false;
      draft.majorsData = action.data;
      draft.loadMajorDataDone = true;
      break;
    case LOAD_MAJOR_DATA_FAILURE:
      draft.loadMajorDataLoading = false;
      draft.loadMajorDataError = action.error;
      break;
    case LOAD_CATEGORY_DATA_REQUEST:
      draft.loadCategoryLoading = true;
      draft.loadCategoryDone = false;
      draft.loadCategoryError = null;
      break;
    case LOAD_CATEGORY_DATA_SUCCESS:
      draft.loadCategoryLoading = false;
      draft.categoryData = action.data;
      draft.loadCategoryDone = true;
      break;
    case LOAD_CATEGORY_DATA_FAILURE:
      draft.loadCategoryLoading = false;
      draft.loadCategoryError = action.error;
      break;
    case RETWEET_REQUEST:
      break;
    case RETWEET_SUCCESS:
      draft.mainPosts.unshift(action.data);
      break;
    case RETWEET_FAILURE:
      break;
    case REPORT_COMMENT_REQUEST:
      draft.reportCommentLoading = true;
      draft.reportCommentDone = false;
      draft.reportCommentError = null;
      break;
    case REPORT_COMMENT_SUCCESS: {
      draft.reportCommentLoading = false;
      draft.reportCommentDone = true;
      break;
    }
    case REPORT_COMMENT_FAILURE:
      draft.reportCommentLoading = false;
      draft.reportCommentsError = action.error;
      break;
    case LOAD_POST_REQUEST:
      draft.loadPostLoading = true;
      draft.loadPostDone = false;
      draft.loadPostError = null;
      break;
    case LOAD_POST_SUCCESS:
      draft.loadPostLoading = false;
      draft.loadPostDone = true;
      draft.singlePost = action.data;
      break;
    case LOAD_POST_FAILURE:
      draft.loadPostLoading = false;
      draft.loadPostError = action.error;
      break;
    default:
      break;
  }
});

export default reducer;
