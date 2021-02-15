import React, { useCallback, useEffect, useState, useMemo } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { Card, List, Badge, Modal, Tag, Dropdown, Menu } from "antd";
import { RetweetOutlined, MessageOutlined, HeartTwoTone, HeartOutlined, EllipsisOutlined } from "@ant-design/icons";
import Link from "next/link";
import moment from 'moment';
import {
  ADD_COMMENT_REQUEST,
  LIKE_POST_REQUEST,
  LOAD_COMMENTS_REQUEST,
  REMOVE_POST_REQUEST,
  REPORT_REQUEST,
  RETWEET_REQUEST,
  UNLIKE_POST_REQUEST,
} from "../../reducers/post";
import PostImages from "./PostImages";
import PostCardContent from "./PostCardContent";
import EditForm from "./EditForm";
import Comments from "../comments/Comments";
import CommentForm from "../comments/CommentForm";
import ProfileAvatar from "../profiles/ProfileAvatar";
import Report from '../Report';
moment.locale('ko');

const PostCard = ({ post }) => {
  const [commentFormOpened, setCommentFormOpened] = useState(false);
  const [commentText, setCommentText] = useState("");
  const { me } = useSelector(state => state.user);
  const { addCommentDone, addCommentLoading } = useSelector(
    state => state.post
  );
  const dispatch = useDispatch();
  const [editVisible, setEditVisible] = useState(false);
  const [reportVisible, setReportVisible] = useState(false);

  const [offset, setOffset] = useState(0);
  const { mainPosts } = useSelector(state => state.post);

  const liked = me && post.likers && post.likers.find(v => v.id === me.id);

  const showModal = () => { setEditVisible(true); };
  const editOk = () => { setEditVisible(false); };
  const editCancel = () => { setEditVisible(false); };
  const reportOk = () => { setReportVisible(false); };
  const reportCancel = () => {
    setReportVisible(false);
  };

  const onToggleComment = useCallback(() => {
    setCommentFormOpened(prev => !prev);
    if (!commentFormOpened) {
      dispatch({
        type: LOAD_COMMENTS_REQUEST,
        data: {
          postId: post.id,
          offset: offset,
        },
      });
      setOffset(offset + 5);
    }
  }, []);

  const onLoadMoreComments = () => {
    dispatch({
      type: LOAD_COMMENTS_REQUEST,
      data: {
        postId: post.id,
        offset: offset,
      },
    });
    setOffset(offset + 5);
  };

  const loadMore =
    mainPosts[mainPosts.findIndex(v => v.id === post.id)].Comments &&
      mainPosts[mainPosts.findIndex(v => v.id === post.id)].Comments.length !==
      0 &&
      mainPosts[mainPosts.findIndex(v => v.id === post.id)].Comments.length %
      5 ===
      0 ? (
        <div style={loadMoreDivWrapper}>
          <Tag color="cyan" onClick={onLoadMoreComments}>
            더보기
        </Tag>
        </div>
      ) : null;

  const onSubmitComment = useCallback(e => {
    e.preventDefault();
    if (!me) {
      return alert('로그인이 필요합니다.');
    }
    return dispatch({
      type: ADD_COMMENT_REQUEST,
      data: {
        postId: post.id,
        content: commentText,
      },
    });
  },
    [me && me.id, commentText]
  );

  useEffect(() => {
    setCommentText('');
  }, [addCommentDone === true]);

  const onChangeCommentText = useCallback(e => {
    setCommentText(e.target.value);
  }, []);

  const onToggleLike = useCallback(() => {
    if (!me) {
      return alert('로그인이 필요합니다.');
    }
    if (liked) { // 좋아요 누른 상태
      dispatch({
        type: UNLIKE_POST_REQUEST,
        data: post.id,
      });
    } else { // 좋아요 안 누른 상태
      dispatch({
        type: LIKE_POST_REQUEST,
        data: post.id,
      });
    }
  }, [me && me.id, post && post.id, liked]);

  const onRetweet = useCallback(() => {
    if (!me) {
      return alert('로그인이 필요합니다.');
    }
    return dispatch({
      type: RETWEET_REQUEST,
      data: post.id,
    });
  }, [me && me.id, post && post.id]);

  const onRemovePost = useCallback(userId => () => {
    const result = confirm("정말로 삭제하시겠습니까?");
    if (!result) {
    } else {
      dispatch({
        type: REMOVE_POST_REQUEST,
        data: userId,
      });
    }
  });
  const onReport = useCallback(() => {
    setReportVisible(true);
  });

  const userMenu = ( //사용자의 게시물
    <Menu>
      <Menu.Item>
        <a target="_blank" rel="noreferrer" onClick={showModal}>수정</a>
      </Menu.Item>
      <Menu.Item>
        <a target="_blank" rel="noreferrer" onClick={onRemovePost(post.id)}>삭제</a>
      </Menu.Item>
    </Menu>
  );

  const otherUserMenu = ( //다른 사용자의 게시물
    <Menu>
      <Menu.Item>
        <a onClick={onReport}>신고</a>
      </Menu.Item>
    </Menu>
  );

  const postCardWrapper = useMemo(() => ({ minWidth: '500px', width: '50wv', borderRadius: '2px', border: '2px solid #c8e6d7', maxWidth: '700px', marginBottom: '15px' }), []);
  const loadMoreDivWrapper = useMemo(() => ({ margin: '0px 0px 10px 30px', textAlign: 'center' }), []);
  const blockCardWrapper = useMemo(() => ({ background: '#F6CED8', textAlign: 'center' }), []);
  const aWrapper = useMemo(() => ({ margin: '0px 10px 0px 10px' }), []);
  const retweetCardWrapper = useMemo(() => ({ marginBottom: '10px' }), []);
  const retweetCardMetaWrapper = useMemo(() => ({ position: 'absolute', right: '15px', bottom: '15px', fontSize: '12px' }), []);
  const modalWrapper = useMemo(() => ({ padding: '0px', zIndex: 1 }), []);
  const heartWrapper = useMemo(() => ({ color: "#eb2f96" }), []);
  const badge1Wrapper = useMemo(() => ({ background: '#f50', size: 'small', zIndex: '0', }), []);
  const badge2Wrapper = useMemo(() => ({ background: '#87d068', size: 'small', zIndex: '0', }), []);
  const badge3Wrapper = useMemo(() => ({ background: '#005000', size: 'small', zIndex: '0', }), []);
  const listWrapper = useMemo(() => ({ background: '#f0faf5', paddingBottom: '0px', height: 'auto' }), []);
  const commentWrapper = useMemo(() => ({ background: '#f0faf5', border: '2px solid #fff', height: 'auto', justiceContent: 'center', }), []);
  const commentFormWrapper = useMemo(() => ({ background: '#f0faf5', height: 'auto', margin: '10px 15px', }), []);
  const momentWrapper = useMemo(() => ({ float: 'right' }), []);

  return (
    <div style={postCardWrapper}>
      {post.blocked ? <Card style={blockCardWrapper}>다수 사용자의 신고로 인해 잠시 가려진 게시물입니다.</Card>
        : (
          <Card
            cover={post.images && post.images[0] && <PostImages images={post.images} />}
            actions={[
              <Badge
                count={5} onClick={onRetweet} size="small" style={badge1Wrapper}
              ><RetweetOutlined />
              </Badge>,
              <Badge
                count={post.likers.length} onClick={onToggleLike} size="small" style={badge2Wrapper}
              >{liked ? <HeartTwoTone style={heartWrapper} /> : <HeartOutlined />}
              </Badge>,
              <Badge
                count={post.commentNum} onClick={onToggleComment} size="small" style={badge3Wrapper}
              ><MessageOutlined />
              </Badge>,
              <>
                {me && post.user.id === me.id ?
                  <Dropdown overlay={userMenu} placement="topCenter">
                    <EllipsisOutlined />
                  </Dropdown>
                  :
                  <Dropdown overlay={otherUserMenu} placement="topCenter">
                    <EllipsisOutlined />
                  </Dropdown>
                }
              </>,
            ]}
            title={post.retweet.id ?
              <>
                {post.user.image ? <ProfileAvatar imagePath={post.user.image} /> : <ProfileAvatar />}
                <a style={aWrapper}>{post.user.nickname}</a>님이 글을 공유하였습니다.
              </> : <></>}
          >
            {post.retweet.id && post.retweet ?
              <Card
                style={retweetCardWrapper}
                cover={post.retweet.images[0] && <PostImages images={post.retweet.images} />}
              >
                <div style={momentWrapper}>{moment(post.createdAt).format('YYYY.MM.DD')}</div>
                <Card.Meta
                  avatar={
                    <Link href={`/user/${post.retweet.user.id}`} prefetch={false}>
                      <a>
                        {post.retweet.user.image ?
                          <ProfileAvatar
                            nickname={post.retweet.user.nickname}
                            imagePath={post.retweet.user.image}
                          />
                          : <ProfileAvatar nickname={post.retweet.user.nickname} />}
                      </a>
                    </Link>
                  }
                  title={post.retweet.user.nickname}
                  description={
                    <>
                      <PostCardContent
                        likers={post.likers ? post.likers.length : 0}
                        commentN={commentNum} 
                        postTitle={post.retweet.title} 
                        postData={post.retweet.content}
                        retweet={1}
                      />
                      <h5 style={retweetCardMetaWrapper}>
                        댓글{" "}{post.retweet.commentNum}개 
                      좋아요{" "}{post.retweet.likers ? post.retweet.likers.length : 0}개 
                      </h5>
                    </>
                  }
                />
              </Card>
              :
              <>
                <div style={momentWrapper}>{moment(post.createdAt).format('YYYY.MM.DD')}</div>
                <Card.Meta
                  avatar={
                    post.user.id ?
                      <Link href={`/user/${post.user.id}`} prefetch={false}>
                        <a>
                          {post.user.image ?
                            <ProfileAvatar
                              nickname={post.user.nickname}
                              imagePath={post.user.image}
                            />
                            : <ProfileAvatar nickname={post.user.nickname} />}
                        </a>
                      </Link>
                      : <></>
                  }
                  title={post.user.nickname}
                  description={
                    <PostCardContent
                      likers={post.likers ? post.likers.length : 0}
                      commentN={commentNum}
                      postTitle={post.title}
                      postData={post.content}
                    />
                  }
                  loading={true}
                />
              </>}
          </Card>
        )}
      {commentFormOpened && (
        <div style={commentWrapper}>
          {mainPosts[mainPosts.findIndex(v => v.id === post.id)].comments.length !== 0 &&
            mainPosts[mainPosts.findIndex(v => v.id === post.id)] ?
            <List
              itemLayout="horizontal"
              style={listWrapper}
              loadMore={loadMore}
              dataSource={post.comments || []}
              renderItem={item => <Comments item={item} post={post} />}
            />
            : <></>
          }
          <div style={commentFormWrapper}>
            <CommentForm
              onSubmitComment={onSubmitComment}
              commentText={commentText}
              onChangeCommentText={onChangeCommentText}
              addCommentLoading={addCommentLoading}
            />
          </div>
        </div>
      )}

      <Modal
        title="게시글 수정"
        visible={editVisible}
        onOk={editOk}
        onCancel={editCancel}
        bodyStyle={modalWrapper}
        footer={null}
      >
        <EditForm
          postId={post.id}
          postContent={post.content}
          postImages={post.images}
          setVisible={setEditVisible}
          visible={editVisible}
        />
      </Modal>
      <Modal
        title="게시물 신고"
        visible={reportVisible}
        onOk={reportOk}
        onCancel={reportCancel}
        bodyStyle={modalWrapper}
        footer={null}
      >
        <Report setReportVisible={setReportVisible} />
      </Modal>
    </div>
  );
};

PostCard.propTypes = {
  post: PropTypes.shape({
    user: PropTypes.object,
    title: PropTypes.string,
    content: PropTypes.string,
    image: PropTypes.string,
    createdAt: PropTypes.string,
  }).isRequired,
};

export default PostCard;
