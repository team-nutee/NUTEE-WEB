import produce from '../util/produce';

export const initialState = {
  /* user */
  loadUserInfo: null, // 사용자의 정보 조회
  isLoadUserInfoLoading: false, // 사용자의 정보 로드
  isLoadUserInfoDone: false,
  isLoadUserInfoError: null,

  /* post */
  mainPosts: [], // 전체 포스트들
  commentlist: [], // 댓글들
  reCommentList: [],
  categoryPosts: [], // 화면에 보일 카테고리 포스트들
  majorPosts: [], // 화면에 보일 전공 포스트들
  favoritePosts: [],
  imagePaths: [], // 미리보기 이미지 경로
  singlePost: null,
  editImagePaths: [], // 글 수정 미리보기 이미지 경로
  hasMorePosts: true,
  loadPostsLoading: false, // 모든 포스트 로드
  loadPostsDone: false,
  loadPostsError: null,
  loadCategoryPostsLoading: false, // 카테고리 포스트 로드
  loadCategoryPostsDone: false,
  loadCategoryPostsError: null,
  loadFavoritePostsLoading: false, // 즐겨찾기 포스트 로드
  loadFavoritePostsDone: false,
  loadFavoritePostsError: null,
  loadMajorPostsLoading: false, // 전공 포스트 로드
  loadMajorPostsDone: false,
  loadMajorPostsError: null,
  addPostLoading: false, // 포스트 업로드
  addPostDone: false,
  addPostError: null,
  editPostLoading: false, // 포스트 수정
  editPostDone: false,
  editPostError: null,
  removePostLoading: false, // 포스트 삭제
  removePostDone: false,
  removePostError: null,

  /* comment */
  loadCommentsLoading: false, // 댓글 로드
  loadCommentsDone: false,
  loadCommentsError: null,
  addCommentLoading: false, // 댓글 업로드
  addCommentDone: false,
  addCommentError: null,
  editCommentLoading: false, // 댓글 수정
  editCommentDone: false,
  editCommentError: null,
  removeCommentLoading: false, // 댓글 삭제
  removeCommentDone: false,
  removeCommentError: null,
  addReCommentLoading: false, // 답글 업로드
  addReCommentDone: false,
  addReCommentError: null,

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

export const UPLOAD_EDIT_IMAGES_REQUEST = 'UPLOAD_EDIT_IMAGES_REQUEST';
export const UPLOAD_EDIT_IMAGES_SUCCESS = 'UPLOAD_EDIT_IMAGES_SUCCESS';
export const UPLOAD_EDIT_IMAGES_FAILURE = 'UPLOAD_EDIT_IMAGES_FAILURE';

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

export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE';

export const EDIT_COMMENT_REQUEST = 'EDIT_COMMENT_REQUEST';
export const EDIT_COMMENT_SUCCESS = 'EDIT_COMMENT_SUCCESS';
export const EDIT_COMMENT_FAILURE = 'EDIT_COMMENT_FAILURE';

export const REMOVE_COMMENT_REQUEST = 'REMOVE_COMMENT_REQUEST';
export const REMOVE_COMMENT_SUCCESS = 'REMOVE_COMMENT_SUCCESS';
export const REMOVE_COMMENT_FAILURE = 'REMOVE_COMMENT_FAILURE';

export const LOAD_COMMENTS_REQUEST = 'LOAD_COMMENTS_REQUEST';
export const LOAD_COMMENTS_SUCCESS = 'LOAD_COMMENTS_SUCCESS';
export const LOAD_COMMENTS_FAILURE = 'LOAD_COMMENTS_FAILURE';

export const ADD_RECOMMENT_REQUEST = 'ADD_RECOMMENT_REQUEST';
export const ADD_RECOMMENT_SUCCESS = 'ADD_RECOMMENT_SUCCESS';
export const ADD_RECOMMENT_FAILURE = 'ADD_RECOMMENT_FAILURE';

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
      console.log('UPLOAD_SUCCESS', draft.imagePaths);
      /*       action.data.forEach((p) => {
        draft.imagePaths.push(p);
      }); */
      draft.uploadLoading = false;
      draft.uploadDone = true;
      break;
    case UPLOAD_FAILURE:
      draft.uploadLoading = false;
      draft.uploadError = action.error;
      break;
    case UPLOAD_EDIT_IMAGES_REQUEST:
      draft.uploadEditImagesLoading = true;
      draft.uploadEditImagesDone = false;
      draft.uploadEditImagesError = null;
      break;
    case UPLOAD_EDIT_IMAGES_SUCCESS: {
      action.data.forEach((p) => {
        draft.editImagePaths.push(p);
      });
      draft.uploadEditImagesLoading = false;
      draft.uploadEditImagesDone = true;
      break;
    }
    case UPLOAD_EDIT_IMAGES_FAILURE:
      draft.uploadEditImagesLoading = false;
      draft.uploadEditImagesError = action.error;
      break;
    case REMOVE_IMAGE: {
      /* const index = draft.imagePaths.findIndex((v, i) => i === action.index);
        draft.imagePaths.splice(index, 1); */
      draft.imagePaths = draft.imagePaths.filter((v, i) => i !== action.data);
      break;
    }
    case REMOVE_EDIT_IMAGE: {
      /*  const index = draft.editImagePaths.findIndex(
          (v, i) => i === action.index
        );
        draft.editImagePaths.splice(index, 1); */
      draft.editImagePaths = draft.editImagePaths.filter(
        (v, i) => i !== action.data,
      );
      break;
    }
    case ADD_POST_REQUEST:
      draft.addPostLoading = true;
      draft.addPostDone = false;
      draft.addPostError = null;
      break;
    case ADD_POST_SUCCESS:
      draft.addPostLoading = false;
      draft.addPostDone = true;
      draft.mainPosts.unshift(action.data);
      draft.imagePaths = [];
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
      const index = draft.mainPosts.findIndex((v) => v.id === action.data.id);
      draft.mainPosts[index] = action.data;
      draft.editPostLoading = false;
      draft.editPostDone = true;
      draft.EditImagePaths = [];
      break;
    }
    case EDIT_POST_FAILURE:
      draft.editPostLoading = false;
      draft.editPostError = action.error;
      break;
    case EDIT_POST_IMAGES:
      draft.editImagePaths = action.data;
      break;
    case ADD_COMMENT_FAILURE:
      draft.addCommentLoading = false;
      draft.addCommentError = action.err;
      break;
    case ADD_RECOMMENT_REQUEST:
      draft.addReCommentLoading = true;
      draft.addReCommentDone = false;
      draft.addReCommentError = null;
      break;
    case ADD_RECOMMENT_SUCCESS: {
      const parentId = action.data.parentId;
      
      if( draft.reCommentList[parentId] === undefined){
        draft.reCommentList[parentId] = [];
        draft.reCommentList[parentId].push(action.data.reComment);
      } else {
        draft.reCommentList[parentId].push(action.data.reComment);
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
      const postIndex = draft.mainPosts.findIndex((v) => v.id === action.data.post.id);
      draft.mainPosts[postIndex].comments = action.data.comment;
      draft.editCommentLoading = false;
      draft.editCommentDone = true;
      break;
    }
    case EDIT_COMMENT_FAILURE:
      draft.editCommentLoading = false;
      draft.editCommentError = action.error;
      break;
    case REMOVE_COMMENT_REQUEST:
      draft.removeCommentLoading = true;
      draft.removeCommentDone = false;
      draft.removeCommentError = null;
      break;
    case REMOVE_COMMENT_SUCCESS: {
      const commentIndex = draft.commentlist[action.data.postId].findIndex(
        (v) => v.id === action.data.commentId,
      );
      draft.commentlist[action.data.postid].splice(commentIndex, 1);
      draft.addCommentLoading = false;
      draft.addCommentDone = true;
      break;
    }
    case REMOVE_COMMENT_FAILURE:
      draft.removeCommentLoading = false;
      draft.removeCommentError = action.error;
      break;
    case ADD_COMMENT_REQUEST:
      draft.addCommentLoading = true;
      draft.addCommentDone = false;
      draft.addCommentError = null;
      break;
    case ADD_COMMENT_SUCCESS: {
      const commentIndex = action.data.postId;
      draft.commentlist[commentIndex].push(action.data.comment);
      draft.addCommentLoading = false;
      draft.addCommentDone = true;
      break;
    }
    case LOAD_COMMENTS_REQUEST:
      draft.loadCommentsLoading = true;
      draft.loadCommentsDone = false;
      draft.loadCommentsError = null;
      break;
    case LOAD_COMMENTS_SUCCESS: {
      const postIndex = draft.mainPosts.findIndex(
        (v) => v.id === action.data.postId,
      );
      const commentIndex = action.data.postId;
      if (action.data.comments !== null ) {
        if (action.data.offset === 0) {
          draft.mainPosts[postIndex].commentNum = action.data.comments.length;
        } else {
          draft.mainPosts[postIndex].commentNum = draft.mainPosts[
            postIndex
          ].commentNum.concat(action.data.comments);
        }
      }
      if (action.data.comments === null) {
        draft.commentlist[commentIndex] = [];
      }else {
        draft.commentlist[commentIndex] = action.data.comments;                          
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
      action.data.forEach((data) => {
        draft.categoryPosts.push(data);
      });
      draft.hasMorePost = action.data.length === 10;
      draft.loadCategoryPostsLoading = false;
      draft.loadCategoryPostsDone = true;
      break;
    case LOAD_CATEGORY_POSTS_FAILURE:
      draft.loadCategoryPostsLoading = false;
      draft.loadCategoryPostsError = action.error;
      break;
    case LOAD_FAVORITE_POSTS_REQUEST:
      draft.categoryPosts = !action.lastId ? [] : draft.favoritePosts;
      draft.hasMorePost = action.lastId ? draft.hasMorePost : true;
      draft.loadFavoritePostsLoading = true;
      draft.loadFavoritePostsDone = false;
      draft.loadFavoritePostsError = null;
      break;
    case LOAD_FAVORITE_POSTS_SUCCESS:
      action.data.forEach((data) => {
        draft.favoritePosts.push(data);
      });
      draft.hasMorePost = action.data.length === 10;
      draft.loadFavoritePostsLoading = false;
      draft.loadFavoritePostsDone = true;
      break;
    case LOAD_FAVORITE_POSTS_FAILURE:
      draft.loadFavoritePostsLoading = false;
      draft.loadFavoritePostsDone = true;
      break;
    case LOAD_SEARCH_POSTS_REQUEST:
    case LOAD_POSTS_REQUEST:
    case LOAD_HASHTAG_POSTS_REQUEST:
    case LOAD_USER_POSTS_REQUEST:
    case LOAD_MY_POSTS_REQUEST:
    case LOAD_MY_COMMENTS_REQUEST:
    case LOAD_MY_LIKE_REQUEST:
      draft.mainPosts = !action.lastId ? [] : draft.mainPosts;
      draft.hasMorePost = action.lastId ? draft.hasMorePost : true;
      draft.loadPostsLoading = true;
      draft.loadPostsDone = false;
      draft.loadPostsError = null;
      break;

    case LOAD_SEARCH_POSTS_SUCCESS:
    case LOAD_POSTS_SUCCESS:
    case LOAD_HASHTAG_POSTS_SUCCESS:
    case LOAD_USER_POSTS_SUCCESS:
    case LOAD_MY_POSTS_SUCCESS:
    case LOAD_MY_COMMENTS_SUCCESS:
    case LOAD_MY_LIKE_SUCCESS:
      action.data.forEach((data) => {
        draft.mainPosts.push(data);
      });
      draft.hasMorePost = action.data.length === 10;
      draft.loadPostsLoading = false;
      draft.loadPostsDone = true;
      break;
    case LOAD_SEARCH_POSTS_FAILURE:
    case LOAD_POSTS_FAILURE:
    case LOAD_HASHTAG_POSTS_FAILURE:
    case LOAD_USER_POSTS_FAILURE:
    case LOAD_MY_POSTS_FAILURE:
    case LOAD_MY_COMMENTS_FAILURE:
    case LOAD_MY_LIKE_FAILURE:
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
    case LIKE_POST_REQUEST:
      break;
    case LIKE_POST_SUCCESS: {
      const postIndex = draft.mainPosts.findIndex((v) => v.id === action.data.postId);
      draft.mainPosts[postIndex].likers.unshift({ id: action.data.userId });
      break;
    }
    case LIKE_POST_FAILURE:
      break;
    case UNLIKE_POST_REQUEST:
      break;
    case UNLIKE_POST_SUCCESS: {
      const postIndex = draft.mainPosts.findIndex((v) => v.id === action.data.postId);
      const likeIndex = (
        draft.mainPosts[postIndex].likers.findIndex((v) => v.id === action.data.userId)
      );
      draft.mainPosts[postIndex].likers.splice(likeIndex, 1);
      break;
    }
    case UNLIKE_POST_FAILURE:
      break;
    case RETWEET_REQUEST:
      break;
    case RETWEET_SUCCESS:
      draft.mainPosts.unshift(action.data);
      break;
    case RETWEET_FAILURE:
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
      const index = draft.mainPosts.findIndex((v) => v.id === action.data);
      draft.mainPosts.splice(index, 1);
      console.log('index', index);
      console.log('action.data', action.data);
      console.log('reducer: REMOVE_POST_SUCCESS');
      break;
    }
    case REMOVE_POST_FAILURE:
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
