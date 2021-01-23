import produce from "../util/produce";
import { LOAD_FOLLOWERS_REQUEST, LOAD_FOLLOWERS_SUCCESS } from "./user";

export const initialState = {
  mainPosts: [], // 화면에 보일 포스트들
  imagePaths: [], // 미리보기 이미지 경로
  singlePost: null,
  editImagePaths: [], // 글 수정 미리보기 이미지 경로
  hasMorePosts: true,

  addPostLoading: false, //포스트 업로드
  addPostDone: false,
  addPostError: null,

  addCommentLoading: false, // 댓글 업로드
  addCommentDone: false,
  addCommentError: null,

  addReCommentLoading: false, // 답글 업로드
  addReCommentDone: false,
  addReCommentError: null,

  editPostLoading: false, //포스트 수정, 수정
  editPostDone: false,
  editPostError: null,

  editCommentLoading: false, // 댓글 수정
  editCommentDone: false,
  editCommentError: null,

  uploadImagesLoading: false, //이미지 업로드
  uploadImagesDone: false,
  uploadImagesError: null,

  uploadEditImagesLoading: false, //수정된 이미지 업로드
  uploadEditImagesDone: false,
  uploadEditImagesError: null,
};

export const LOAD_MAIN_POSTS_REQUEST = "LOAD_MAIN_POSTS_REQUEST";
export const LOAD_MAIN_POSTS_SUCCESS = "LOAD_MAIN_POSTS_SUCCESS";
export const LOAD_MAIN_POSTS_FAILURE = "LOAD_MAIN_POSTS_FAILURE";

export const LOAD_FAVORITE_POSTS_REQUEST = "LOAD_FAVORITE_POSTS_REQUEST";
export const LOAD_FAVORITE_POSTS_SUCCESS = "LOAD_FAVORITE_POSTS_SUCCESS";
export const LOAD_FAVORITE_POSTS_FAILURE = "LOAD_FAVORITE_POSTS_FAILURE";

export const LOAD_CATEGORY_POSTS_REQUEST = "LOAD_CATEGORY_POSTS_REQUEST";
export const LOAD_CATEGORY_POSTS_SUCCESS = "LOAD_CATEGORY_POSTS_SUCCESS";
export const LOAD_CATEGORY_POSTS_FAILURE = "LOAD_CATEGORY_POSTS_FAILURE";

export const LOAD_HASHTAG_POSTS_REQUEST = "LOAD_HASHTAG_POSTS_REQUEST";
export const LOAD_HASHTAG_POSTS_SUCCESS = "LOAD_HASHTAG_POSTS_SUCCESS";
export const LOAD_HASHTAG_POSTS_FAILURE = "LOAD_HASHTAG_POSTS_FAILURE";

export const LOAD_SEARCH_POSTS_REQUEST = "LOAD_SEARCH_POSTS_REQUEST";
export const LOAD_SEARCH_POSTS_SUCCESS = "LOAD_SEARCH_POSTS_SUCCESS";
export const LOAD_SEARCH_POSTS_FAILURE = "LOAD_SEARCH_POSTS_FAILURE";

export const LOAD_USER_POSTS_REQUEST = "LOAD_USER_POSTS_REQUEST";
export const LOAD_USER_POSTS_SUCCESS = "LOAD_USER_POSTS_SUCCESS";
export const LOAD_USER_POSTS_FAILURE = "LOAD_USER_POSTS_FAILURE";

export const UPLOAD_IMAGES_REQUEST = "UPLOAD_IMAGES_REQUEST";
export const UPLOAD_IMAGES_SUCCESS = "UPLOAD_IMAGES_SUCCESS";
export const UPLOAD_IMAGES_FAILURE = "UPLOAD_IMAGES_FAILURE";

export const UPLOAD_EDIT_IMAGES_REQUEST = "UPLOAD_EDIT_IMAGES_REQUEST";
export const UPLOAD_EDIT_IMAGES_SUCCESS = "UPLOAD_EDIT_IMAGES_SUCCESS";
export const UPLOAD_EDIT_IMAGES_FAILURE = "UPLOAD_EDIT_IMAGES_FAILURE";

export const ADD_POST_REQUEST = "ADD_POST_REQUEST";
export const ADD_POST_SUCCESS = "ADD_POST_SUCCESS";
export const ADD_POST_FAILURE = "ADD_POST_FAILURE";

export const EDIT_POST_REQUEST = "EDIT_POST_REQUEST";
export const EDIT_POST_SUCCESS = "EDIT_POST_SUCCESS";
export const EDIT_POST_FAILURE = "EDIT_POST_FAILURE";

export const EDIT_POST_IMAGES = "EDIT_POST_IMAGES";

export const LIKE_POST_REQUEST = "LIKE_POST_REQUEST";
export const LIKE_POST_SUCCESS = "LIKE_POST_SUCCESS";
export const LIKE_POST_FAILURE = "LIKE_POST_FAILURE";

export const UNLIKE_POST_REQUEST = "UNLIKE_POST_REQUEST";
export const UNLIKE_POST_SUCCESS = "UNLIKE_POST_SUCCESS";
export const UNLIKE_POST_FAILURE = "UNLIKE_POST_FAILURE";

export const ADD_COMMENT_REQUEST = "ADD_COMMENT_REQUEST";
export const ADD_COMMENT_SUCCESS = "ADD_COMMENT_SUCCESS";
export const ADD_COMMENT_FAILURE = "ADD_COMMENT_FAILURE";

export const EDIT_COMMENT_REQUEST = "EDIT_COMMENT_REQUEST";
export const EDIT_COMMENT_SUCCESS = "EDIT_COMMENT_SUCCESS";
export const EDIT_COMMENT_FAILURE = "EDIT_COMMENT_FAILURE";

export const REMOVE_COMMENT_REQUEST = "REMOVE_COMMENT_REQUEST";
export const REMOVE_COMMENT_SUCCESS = "REMOVE_COMMENT_SUCCESS";
export const REMOVE_COMMENT_FAILURE = "REMOVE_COMMENT_FAILURE";

export const LOAD_COMMENTS_REQUEST = "LOAD_COMMENTS_REQUEST";
export const LOAD_COMMENTS_SUCCESS = "LOAD_COMMENTS_SUCCESS";
export const LOAD_COMMENTS_FAILURE = "LOAD_COMMENTS_FAILURE";

export const ADD_RECOMMENT_REQUEST = "ADD_RECOMMENT_REQUEST";
export const ADD_RECOMMENT_SUCCESS = "ADD_RECOMMENT_SUCCESS";
export const ADD_RECOMMENT_FAILURE = "ADD_RECOMMENT_FAILURE";

export const RETWEET_REQUEST = "RETWEET_REQUEST";
export const RETWEET_SUCCESS = "RETWEET_SUCCESS";
export const RETWEET_FAILURE = "RETWEET_FAILURE";

export const REPORT_REQUEST = "REPORT_REQUEST";
export const REPORT_SUCCESS = "REPORT_SUCCESS";
export const REPORT_FAILURE = "REPORT_FAILURE";

export const REMOVE_POST_REQUEST = "REMOVE_POST_REQUEST";
export const REMOVE_POST_SUCCESS = "REMOVE_POST_SUCCESS";
export const REMOVE_POST_FAILURE = "REMOVE_POST_FAILURE";

export const LOAD_POST_REQUEST = "LOAD_POST_REQUEST";
export const LOAD_POST_SUCCESS = "LOAD_POST_SUCCESS";
export const LOAD_POST_FAILURE = "LOAD_POST_FAILURE";

export const REMOVE_IMAGE = "REMOVE_IMAGE";
export const REMOVE_EDIT_IMAGE = "REMOVE_EDIT_IMAGE";

export const addPost = data => ({
  type: ADD_POST_REQUEST,
  data,
});

export const addComment = data => ({
  type: ADD_COMMENT_REQUEST,
  data,
});

const reducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case UPLOAD_IMAGES_REQUEST: {
        draft.uploadImagesLoading = true;
        draft.uploadImagesDone = false;
        draft.uploadImagesError = null;
        break;
      }
      case UPLOAD_IMAGES_SUCCESS: {
        action.data.forEach(p => {
          draft.imagePaths.push(p);
        });
        draft.uploadImagesLoading = false;
        draft.uploadImagesDone = true;
        break;
      }
      case UPLOAD_IMAGES_FAILURE: {
        draft.uploadImagesLoading = false;
        draft.uploadImagesError = action.error;
        break;
      }
      case UPLOAD_EDIT_IMAGES_REQUEST: {
        draft.uploadEditImagesLoading = true;
        draft.uploadEditImagesDone = false;
        draft.uploadEditImagesError = null;
        break;
      }
      case UPLOAD_EDIT_IMAGES_SUCCESS: {
        action.data.forEach(p => {
          draft.editImagePaths.push(p);
        });
        draft.uploadEditImagesLoading = false;
        draft.uploadEditImagesDone = true;
        break;
      }
      case UPLOAD_EDIT_IMAGES_FAILURE: {
        draft.uploadEditImagesLoading = false;
        draft.uploadEditImagesError = action.error;
        break;
      }
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
          (v, i) => i !== action.data
        );
        break;
      }
      case ADD_POST_REQUEST: {
        draft.addPostLoading = true;
        draft.addPostDone = false;
        draft.addPostError = null;
        break;
      }
      case ADD_POST_SUCCESS: {
        draft.addPostLoading = false;
        draft.addPostDone = true;
        draft.mainPosts.unshift(action.data);
        draft.imagePaths = [];
        break;
      }
      case ADD_POST_FAILURE: {
        draft.addPostLoading = false;
        draft.addPostError = action.error;
        break;
      }
      case EDIT_POST_REQUEST: {
        draft.editPostLoading = true;
        draft.editPostDone = false;
        draft.editPostError = null;
        break;
      }
      case EDIT_POST_SUCCESS: {
        const index = draft.mainPosts.findIndex(v => v.id === action.data.id);
        draft.mainPosts[index] = action.data;
        draft.editPostLoading = false;
        draft.editPostDone = true;
        draft.EditImagePaths = [];
        break;
      }
      case EDIT_POST_FAILURE: {
        draft.editPostLoading = false;
        draft.editPostError = action.error;
        break;
      }
      case EDIT_POST_IMAGES: {
        draft.editImagePaths = action.data;
        break;
      }
      case ADD_COMMENT_REQUEST: {
        draft.addCommentLoading = true;
        draft.addCommentDone = false;
        draft.addCommentError = null;
        break;
      }
      case ADD_COMMENT_SUCCESS: {
        const postIndex = draft.mainPosts.find(
          v => v.id === action.data.PostId
        );
        draft.mainPosts[postIndex].Comments.push(action.data.comment);
        draft.addCommentLoading = false;
        draft.addCommentDone = true;
        break;
        /*       const postIndex = draft.mainPosts.findIndex(
          v => v.id === action.data.postId
        ); */
      }
      case ADD_COMMENT_FAILURE: {
        draft.addCommentLoading = false;
        draft.addCommentError = action.err;
        break;
      }
      case ADD_RECOMMENT_REQUEST: {
        draft.addReCommentLoading = true;
        draft.addReCommentDone = false;
        draft.addReCommentError = null;
        break;
      }
      case ADD_RECOMMENT_SUCCESS: {
        const postIndex = draft.mainPosts.findIndex(
          v => v.id === action.data.postId
        );
        const commentIndex = draft.mainPosts[postIndex].Comments.findIndex(
          v => v.id === action.data.parentId
        );
        if (
          draft.mainPosts[postIndex].Comments[commentIndex].ReComment ===
          undefined
        ) {
          draft.mainPosts[postIndex].Comments[commentIndex].ReComment = [];
          draft.mainPosts[postIndex].Comments[commentIndex].ReComment.push(
            action.data.reComment
          );
        } else {
          draft.mainPosts[postIndex].Comments[commentIndex].ReComment.push(
            action.data.reComment
          );
        }
        draft.addReCommentLoading = false;
        draft.addReCommentDone = true;
        break;
      }
      case ADD_RECOMMENT_FAILURE: {
        draft.addReCommentLoading = false;
        draft.addReCommentError = action.error;
        break;
      }
      case EDIT_COMMENT_REQUEST: {
        draft.editCommentLoading = true;
        draft.editCommentDone = false;
        draft.editCommentError = null;
        break;
      }
      case EDIT_COMMENT_SUCCESS: {
        // const postIndex = draft.mainPosts.findIndex(v => v.id === action.data.postId);
        // draft.mainPosts[postIndex].Comments = action.data.comment;
        draft.editCommentLoading = false;
        draft.editCommentDone = true;
        break;
      }
      case EDIT_COMMENT_FAILURE: {
        draft.editCommentLoading = false;
        console.log("why?");
        draft.editCommentError = action.error;
        break;
      }
      case REMOVE_COMMENT_REQUEST: {
        break;
      }
      case REMOVE_COMMENT_SUCCESS: {
        const postIndex = draft.mainPosts.findIndex(
          v => v.id === action.data.postId
        );
        const commentIndex = draft.mainPosts[postIndex].Comments.findIndex(
          v => v.id === action.data.commentId
        );
        draft.mainPosts[postIndex].Comments.splice(commentIndex, 1);
        draft.addCommentLoading = false;
        draft.addCommentDone = true;
        break;
      }
      case REMOVE_COMMENT_FAILURE: {
        draft.addCommentLoading = false;
        draft.addCommentError = action.error;
        break;
      }
      case LOAD_COMMENTS_REQUEST: {
        break;
      }
      case LOAD_COMMENTS_SUCCESS: {
        const postIndex = draft.mainPosts.findIndex(
          v => v.id === action.data.postId
        );
        if (action.data.offset === 0) {
          draft.mainPosts[postIndex].Comments = action.data.comments;
        } else {
          draft.mainPosts[postIndex].Comments = draft.mainPosts[
            postIndex
          ].Comments.concat(action.data.comments);
        }
        break;
      }
      case LOAD_COMMENTS_FAILURE: {
        break;
      }
      case LOAD_CATEGORY_POSTS_REQUEST:
      case LOAD_FAVORITE_POSTS_REQUEST:
      case LOAD_SEARCH_POSTS_REQUEST:
      case LOAD_MAIN_POSTS_REQUEST:
      case LOAD_HASHTAG_POSTS_REQUEST:
      case LOAD_USER_POSTS_REQUEST: {
        draft.mainPosts = !action.lastId ? [] : draft.mainPosts;
        draft.hasMorePost = action.lastId ? draft.hasMorePost : true;
        break;
      }
      case LOAD_CATEGORY_POSTS_SUCCESS:
      case LOAD_FAVORITE_POSTS_SUCCESS:
      case LOAD_SEARCH_POSTS_SUCCESS:
      case LOAD_MAIN_POSTS_SUCCESS:
      case LOAD_HASHTAG_POSTS_SUCCESS:
      case LOAD_USER_POSTS_SUCCESS: {
        action.data.forEach(d => {
          draft.mainPosts.push(d);
        });
        draft.hasMorePost = action.data.length === 10;
        break;
      }
      case LOAD_CATEGORY_POSTS_FAILURE:
      case LOAD_FAVORITE_POSTS_FAILURE:
      case LOAD_SEARCH_POSTS_FAILURE:
      case LOAD_MAIN_POSTS_FAILURE:
      case LOAD_HASHTAG_POSTS_FAILURE:
      case LOAD_USER_POSTS_FAILURE: {
        break;
      }
      case LIKE_POST_REQUEST: {
        break;
      }
      case LIKE_POST_SUCCESS: {
        const postIndex = draft.mainPosts.findIndex(
          v => v.id === action.data.postId
        );
        draft.mainPosts[postIndex].Likers.unshift({ id: action.data.userId });
        break;
      }
      case LIKE_POST_FAILURE: {
        break;
      }
      case UNLIKE_POST_REQUEST: {
        break;
      }
      case UNLIKE_POST_SUCCESS: {
        const postIndex = draft.mainPosts.findIndex(
          v => v.id === action.data.postId
        );
        const likeIndex = draft.mainPosts[postIndex].Likers.findIndex(
          v => v.id === action.data.userId
        );
        draft.mainPosts[postIndex].Likers.splice(likeIndex, 1);
        break;
      }
      case UNLIKE_POST_FAILURE: {
        break;
      }
      case RETWEET_REQUEST: {
        break;
      }
      case RETWEET_SUCCESS: {
        draft.mainPosts.unshift(action.data);
        break;
      }
      case RETWEET_FAILURE: {
        break;
      }
      case REPORT_REQUEST: {
        break;
      }
      case REPORT_SUCCESS: {
        if (action.data.isBlocked) {
          const index = draft.mainPosts.findIndex(
            v => v.id === action.data.postId
          );
          draft.mainPosts[index] = action.data;
        }
        break;
      }
      case REPORT_FAILURE: {
        break;
      }
      case REMOVE_POST_REQUEST: {
        break;
      }
      case REMOVE_POST_SUCCESS: {
        const index = draft.mainPosts.findIndex(v => v.id === action.data);
        draft.mainPosts.splice(index, 1);
        console.log("index", index);
        console.log("action.data", action.data);
        console.log("reducer: REMOVE_POST_SUCCESS");
        break;
      }
      case REMOVE_POST_FAILURE: {
        break;
      }
      case LOAD_POST_SUCCESS: {
        draft.singlePost = action.data;
        break;
      }
      default: {
        break;
      }
    }
  });

export default reducer;
