import produce from 'immer';

export const initialState = {
    mainPosts: [], // 화면에 보일 포스트들
    imagePaths: [], // 미리보기 이미지 경로
    editImagePaths:[],// 글 수정 미리보기 이미지 경로

    addPostErrorReason: '', // 포스트 업로드 실패 사유
    isAddingPost: false, // 포스트 업로드 중
    postAdded: false, // 포스트 업로드 성공

    editPostErrorReason: '', // 포스트 수정 실패 사유
    isEditingPost: false, // 포스트 수정중
    postEdited: false, // 포스트 수정성공

    editCommentErrorReason: '', // 댓글 수정 실패 사유
    isEditingComment: false, // 댓글 수정중
    commentEdited: false, // 댓글 수정성공

    isAddingComment: false,//댓글 업로드중
    addCommentErrorReason: '',//댓글업로드 실패사유
    commentAdded: false,//댓글 업로드 성공

    isAddingReComment: false,//답글 업로드중
    addReCommentErrorReason: '',//답글업로드 실패사유
    reCommentAdded: false,//답글 업로드 성공

    singlePost: null,
};

export const LOAD_MAIN_POSTS_REQUEST = 'LOAD_MAIN_POSTS_REQUEST';
export const LOAD_MAIN_POSTS_SUCCESS = 'LOAD_MAIN_POSTS_SUCCESS';
export const LOAD_MAIN_POSTS_FAILURE = 'LOAD_MAIN_POSTS_FAILURE';

export const LOAD_HASHTAG_POSTS_REQUEST = 'LOAD_HASHTAG_POSTS_REQUEST';
export const LOAD_HASHTAG_POSTS_SUCCESS = 'LOAD_HASHTAG_POSTS_SUCCESS';
export const LOAD_HASHTAG_POSTS_FAILURE = 'LOAD_HASHTAG_POSTS_FAILURE';

export const LOAD_USER_POSTS_REQUEST = 'LOAD_USER_POSTS_REQUEST';
export const LOAD_USER_POSTS_SUCCESS = 'LOAD_USER_POSTS_SUCCESS';
export const LOAD_USER_POSTS_FAILURE = 'LOAD_USER_POSTS_FAILURE';

export const UPLOAD_IMAGES_REQUEST = 'UPLOAD_IMAGES_REQUEST';
export const UPLOAD_IMAGES_SUCCESS = 'UPLOAD_IMAGES_SUCCESS';
export const UPLOAD_IMAGES_FAILURE = 'UPLOAD_IMAGES_FAILURE';

export const UPLOAD_EDIT_IMAGES_REQUEST = 'UPLOAD_EDIT_IMAGES_REQUEST';
export const UPLOAD_EDIT_IMAGES_SUCCESS = 'UPLOAD_EDIT_IMAGES_SUCCESS';
export const UPLOAD_EDIT_IMAGES_FAILURE = 'UPLOAD_EDIT_IMAGES_FAILURE';

export const REMOVE_IMAGE = 'REMOVE_IMAGE';

export const REMOVE_EDIT_IMAGE = 'REMOVE_EDIT_IMAGE';

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

export default (state = initialState, action) => {
    return produce(state, (draft) => {
        switch (action.type) {
            case UPLOAD_IMAGES_REQUEST: {
                break;
            }
            case UPLOAD_IMAGES_SUCCESS: {
                action.data.forEach((p) => {
                    draft.imagePaths.push(p);
                });
                break;
            }
            case UPLOAD_IMAGES_FAILURE: {
                break;
            }
            case REMOVE_IMAGE: {
                const index = draft.imagePaths.findIndex((v, i) => i === action.index);
                draft.imagePaths.splice(index, 1);
                break;
            }
            case UPLOAD_EDIT_IMAGES_REQUEST: {
                break;
            }
            case UPLOAD_EDIT_IMAGES_SUCCESS: {
                action.data.forEach((p) => {
                    draft.editImagePaths.push(p);
                });
                break;
            }
            case UPLOAD_EDIT_IMAGES_FAILURE: {
                break;
            }
            case REMOVE_EDIT_IMAGE: {
                const index = draft.editImagePaths.findIndex((v, i) => i === action.index);
                draft.editImagePaths.splice(index, 1);
                break;
            }
            case ADD_POST_REQUEST: {
                draft.isAddingPost = true;
                draft.addingPostErrorReason = '';
                draft.postAdded = false;
                break;
            }
            case ADD_POST_SUCCESS: {
                draft.isAddingPost = false;
                draft.mainPosts.unshift(action.data);
                draft.postAdded = true;
                draft.imagePaths = [];
                break;
            }
            case ADD_POST_FAILURE: {
                draft.isAddingPost = false;
                draft.addPostErrorReason = action.error;
                break;
            }
            case EDIT_POST_REQUEST: {
                draft.isEditingPost = true;
                draft.editingPostErrorReason = '';
                draft.postEdited = false;
                break;
            }
            case EDIT_POST_SUCCESS: {
                const index = draft.mainPosts.findIndex(v => v.id === action.data.id);
                draft.mainPosts[index] = action.data;
                draft.isEditingPost = false;
                draft.postEdited = true;
                draft.EditImagePaths = [];
                break;
            }
            case EDIT_POST_FAILURE: {
                draft.isEditingPost = false;
                draft.editPostErrorReason = action.error;
                break;
            }
            case EDIT_POST_IMAGES: {
                draft.editImagePaths = action.data;
                break;
            }
            case ADD_RECOMMENT_REQUEST: {
                draft.isAddingReComment = true;
                draft.addReCommentErrorReason = '';
                draft.reCommentAdded = false;
                break;
            }
            case ADD_RECOMMENT_SUCCESS: {
                const postIndex = draft.mainPosts.findIndex(v => v.id === action.data.postId);
                console.log(postIndex);
                console.log(action.data);
                const commentIndex = draft.mainPosts[postIndex].Comments.findIndex(v => v.id === action.data.parentId);
                console.log(commentIndex);
                draft.mainPosts[postIndex].Comments[commentIndex].ReComment.push(action.data.reComment);
                draft.isAddingReComment = false;
                draft.reCommentAdded = true;
                break;
            }
            case ADD_RECOMMENT_FAILURE: {
                draft.isAddingReComment = false;
                draft.addReCommentErrorReason = action.error;
                break;
            }
            case ADD_COMMENT_REQUEST: {
                draft.isAddingComment = true;
                draft.addCommentErrorReason = '';
                draft.commentAdded = false;
                break;
            }
            case ADD_COMMENT_SUCCESS: {
                const postIndex = draft.mainPosts.findIndex(v => v.id === action.data.postId);
                draft.mainPosts[postIndex].Comments.push(action.data.comment);
                draft.isAddingComment = false;
                draft.commentAdded = true;
                break;
            }
            case ADD_COMMENT_FAILURE: {
                draft.isAddingComment = false;
                draft.addingPostErrorReason = action.error;
                break;
            }
            case EDIT_COMMENT_REQUEST: {
                draft.isEditingComment = true;
                draft.editCommentErrorReason = '';
                draft.commentEdited = false;
                break;
            }
            case EDIT_COMMENT_SUCCESS: {
                // const postIndex = draft.mainPosts.findIndex(v => v.id === action.data.postId);
                // draft.mainPosts[postIndex].Comments = action.data.comment;
                draft.isEditingComment = false;
                draft.commentEdited = true;
                break;
            }
            case EDIT_COMMENT_FAILURE: {
                draft.isEditingComment = false;
                console.log('why?');
                draft.editingPostErrorReason = action.error;
                break;
            }
            case REMOVE_COMMENT_REQUEST: {
                break;
            }
            case REMOVE_COMMENT_SUCCESS: {
                const postIndex = draft.mainPosts.findIndex(v => v.id === action.data.postId);
                const commentIndex = draft.mainPosts[postIndex].Comments.findIndex(v => v.id === action.data.commentId);
                draft.mainPosts[postIndex].Comments.splice(commentIndex,1);
                draft.isAddingComment = false;
                draft.commentAdded = true;
                break;
            }
            case REMOVE_COMMENT_FAILURE: {
                draft.isAddingComment = false;
                draft.addingPostErrorReason = action.error;
                break;
            }
            case LOAD_COMMENTS_REQUEST: {
                break;
            }
            case LOAD_COMMENTS_SUCCESS: {
                const postIndex = draft.mainPosts.findIndex(v => v.id === action.data.postId);
                if(action.data.offset===0) {
                    draft.mainPosts[postIndex].Comments = action.data.comments;
                }else{
                    draft.mainPosts[postIndex].Comments = draft.mainPosts[postIndex].Comments.concat(action.data.comments);
                }
                break;
            }
            case LOAD_COMMENTS_FAILURE: {
                break;
            }
            case LOAD_MAIN_POSTS_REQUEST:
            case LOAD_HASHTAG_POSTS_REQUEST:
            case LOAD_USER_POSTS_REQUEST: {
                draft.mainPosts = !action.lastId ? [] : draft.mainPosts;
                draft.hasMorePost = action.lastId ? draft.hasMorePost : true;
                break;
            }
            case LOAD_MAIN_POSTS_SUCCESS:
            case LOAD_HASHTAG_POSTS_SUCCESS:
            case LOAD_USER_POSTS_SUCCESS: {
                action.data.forEach((d) => {
                    draft.mainPosts.push(d);
                });
                draft.hasMorePost = action.data.length === 10;
                break;
            }
            case LOAD_MAIN_POSTS_FAILURE:
            case LOAD_HASHTAG_POSTS_FAILURE:
            case LOAD_USER_POSTS_FAILURE: {
                break;
            }
            case LIKE_POST_REQUEST: {
                break;
            }
            case LIKE_POST_SUCCESS: {
                const postIndex = draft.mainPosts.findIndex(v => v.id === action.data.postId);
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
                const postIndex = draft.mainPosts.findIndex(v => v.id === action.data.postId);
                const likeIndex = draft.mainPosts[postIndex].Likers.findIndex(v => v.id === action.data.userId);
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
                if(action.data.isBlocked){
                    const index = draft.mainPosts.findIndex(v => v.id === action.data.postId);
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
                console.log("index",index);
                console.log("action.data",action.data);
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
};