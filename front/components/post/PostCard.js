/* eslint-disable no-restricted-globals */ /* eslint-disable no-alert */
import React, { useCallback, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Card, List, Badge, Modal, Tag, Button, Popover } from 'antd';
import { AlertOutlined, RetweetOutlined, MessageOutlined, HeartTwoTone, HeartOutlined, EllipsisOutlined } from '@ant-design/icons';
import Link from 'next/link';
import moment from 'moment';
import { LIKE_POST_REQUEST, LOAD_COMMENTS_REQUEST, REMOVE_POST_REQUEST, RETWEET_REQUEST, UNLIKE_POST_REQUEST } from '../../reducers/post';
import PostImages from './PostImages';
import PostCardContent from './PostCardContent';
import Comments from '../comments/Comments';
import CommentForm from '../comments/CommentForm';
import ProfileAvatar from '../profiles/ProfileAvatar';
import Report from '../Report';

moment.locale('ko');

const PostCard = ({ post }) => {
  const dispatch = useDispatch();
  const [commentFormOpened, setCommentFormOpened] = useState(false);
  const { me } = useSelector((state) => state.user);
  const { commentlist } = useSelector((state) => state.post);
  const [reportVisible, setReportVisible] = useState(false);
  const [lastId, setlastId] = useState(0);
  const { mainPosts, loadPostDone } = useSelector((state) => state.post);
  const [editMode, setEditMode] = useState(false);

  const liked = me && post.likers && post.likers.find((v) => v.id === me.id);
  const postCardWrapper = useMemo(() => ({ minWidth: '500px', width: '50wv', borderRadius: '2px', border: '2px solid #c8e6d7', maxWidth: '700px', marginBottom: '15px' }), []);
  const loadMoreDivWrapper = useMemo(() => ({ margin: '0px 0px 10px 30px', textAlign: 'center' }), []);
  const blockCardWrapper = useMemo(() => ({ background: '#F6CED8', textAlign: 'center' }), []);
  const aWrapper = useMemo(() => ({ margin: '0px 10px' }), []);
  const retweetCardWrapper = useMemo(() => ({ marginBottom: '10px' }), []);
  const retweetCardMetaWrapper = useMemo(() => ({ position: 'absolute', right: '15px', bottom: '15px', fontSize: '12px' }), []);
  const heartWrapper = useMemo(() => ({ color: '#eb2f96', fontSize: '20px' }), []);
  const badge1Wrapper = useMemo(() => ({ background: '#f50', size: 'small', zIndex: '0' }), []);
  const badge2Wrapper = useMemo(() => ({ background: '#87d068', size: 'small', zIndex: '0' }), []);
  const badge3Wrapper = useMemo(() => ({ background: '#005000', size: 'small', zIndex: '0' }), []);
  const listWrapper = useMemo(() => ({ background: '#f0faf5', paddingBottom: '0px', height: 'auto' }), []);
  const commentWrapper = useMemo(() => ({ background: '#f0faf5', border: '2px solid #fff', height: 'auto', justiceContent: 'center' }), []);
  const commentFormWrapper = useMemo(() => ({ background: '#f0faf5', height: 'auto', margin: '10px 15px' }), []);
  const momentWrapper = useMemo(() => ({ fontSize: '14px' }), []);
  const nicknameWrapper = useMemo(() => ({ fontSize: '18px', margin: '0' }), []);
  const iconWrapper = useMemo(() => ({ fontSize: '20px' }), []);
  const tagWrapper = useMemo(() => ({ marginBottom: '15px' }), []);
  const postWrapperTest = useMemo(() => ({ margin: '0', padding: '0' }), []);
  const prefixWrapper = useMemo(() => ({ marginRight: '10px' }), []);

  const reportOk = useCallback(() => { setReportVisible(false); }, []);
  const reportCancel = useCallback(() => { setReportVisible(false); }, []);
  const onClickEdit = useCallback(() => { setEditMode(true); }, []);
  const onCancelEdit = useCallback(() => { setEditMode(false); }, []);

  const onToggleComment = useCallback(() => {
    setCommentFormOpened((prev) => !prev);
    if (!commentFormOpened) {
      dispatch({
        type: LOAD_COMMENTS_REQUEST,
        data: {
          postId: post.id,
        },
        lastId,
      });
      setlastId(lastId + 5);
    }
  }, [loadPostDone]);

  /*
  const onLoadMoreComments = () => {
    dispatch({
      type: LOAD_COMMENTS_REQUEST,
      data: {
        postId: post.id,
        lastId,
      },
    });
    setlastId(lastId + 5);
  };
  */

  const onLike = useCallback(() => {
    if (!me.id) {
      return alert('로그인이 필요합니다.');
    }
    return dispatch({
      type: LIKE_POST_REQUEST,
      data: post.id,
    });
  }, [me && me.id]);

  const onUnLike = useCallback(() => {
    if (!me.id) {
      return alert('로그인이 필요합니다.');
    }
    return dispatch({
      type: UNLIKE_POST_REQUEST,
      data: post.id,
    });
  }, [me && me.id]);

  const onRetweet = useCallback(() => {
    if (!me) {
      return alert('로그인이 필요합니다.');
    }
    return dispatch({
      type: RETWEET_REQUEST,
      data: post.id,
    });
  }, [me && me.id, post && post.id]);

  const onRemovePost = useCallback(() => {
    const result = confirm('정말로 삭제하시겠습니까?');
    if (!result) {
      return;
    }
    dispatch({
      type: REMOVE_POST_REQUEST,
      data: post.id,
    });
  });

  const onReport = useCallback(() => {
    setReportVisible(true);
  });

  const EllipsisContent = (
    <>
      {me && post.user.id === me.id ? (
        <>
          {(post.retweet === null || !post.retweet.id) && <Button onClick={onClickEdit}>수정</Button>}
          <Button type="danger" onClick={onRemovePost}>삭제</Button>
        </>
      )
        : <Button onClick={onReport}>신고</Button>}
    </>
  );

  const time = () => {
    const date = new Date();
    const postCreateAt = new Date(post.createdAt);
    const today = moment(date).format('YYYY.MM.DD');
    const postCreatedAtHours = moment(postCreateAt).add(9, 'hours');
    const postCreatedAt = moment(postCreatedAtHours).format('YYYY.MM.DD');
    const todayBetweenTime = moment(date);
    const postCreateAtBetweenTime = moment(postCreatedAtHours).subtract(-0.7, 'minute');
    const betweenTime = moment.duration(todayBetweenTime.diff(postCreateAtBetweenTime)).asMinutes();

    return (
      <>
        {today === postCreatedAt && (betweenTime <= 59) ? (
          <>
            <span style={momentWrapper}>{moment(postCreateAtBetweenTime).startOf('minute').fromNow()}</span>
          </>
        ) : (
          <>
            <span style={momentWrapper}>{moment(postCreatedAtHours).format('LLLL')}</span>
          </>
        )}
        {post.updatedAt === post.createdAt ? <></> : <small> (수정)</small>}
      </>
    );
  };

  /*
  const loadMore = (
    mainPosts[mainPosts.findIndex((v) => v.id === post.id)].comments
      && mainPosts[mainPosts.findIndex((v) => v.id === post.id)].comments !== 0
      && mainPosts[mainPosts.findIndex((v) => v.id === post.id)].comments % 5 === 0
      ? (
        <div style={loadMoreDivWrapper}>
          <Tag color="cyan" onClick={onLoadMoreComments}>더보기</Tag>
        </div>
      ) : null
  );
  */

  return (
    <div style={postCardWrapper}>
      {post.blocked ? <Card style={blockCardWrapper}>다수 사용자의 신고로 인해 잠시 가려진 게시물입니다.</Card>
        : (
          <Card
            cover={post.images && post.images[0] ? <PostImages images={post.images} /> : <></>}
            actions={[
              <Badge count={0} onClick={onRetweet} size="small" style={badge1Wrapper}>
                <RetweetOutlined style={iconWrapper} />
              </Badge>,
              <Badge count={post.likers ? post.likers.length : 0} size="small" style={badge2Wrapper}>
                {liked ? <HeartTwoTone style={heartWrapper} onClick={onUnLike} />
                  : <HeartOutlined style={iconWrapper} onClick={onLike} />}
              </Badge>,
              <Badge count={post.commentNum || 0} onClick={onToggleComment} size="small" style={badge3Wrapper}>
                <MessageOutlined style={iconWrapper} />
              </Badge>,
              <Popover
                content={EllipsisContent}
                trigger="click"
              >
                <EllipsisOutlined />
              </Popover>,
            ]}
            title={post.retweet
              ? (
                <>
                  {post.user.image
                    ? <ProfileAvatar imagePath={post.user.image} /> : <ProfileAvatar />}
                  <a style={aWrapper}>{post.user.nickname}</a>
                  님이 글을 공유하였습니다.
                </>
              ) : <></>}
          >
            {post.retweet
              ? (
                <Card
                  style={retweetCardWrapper}
                  cover={post.retweet.images[0] && <PostImages images={post.retweet.images} />}
                >
                  <Card.Meta
                    avatar={(
                      <Link href={`/user/${post.retweet.user.id}`} prefetch={false}>
                        <a>
                          {post.retweet.user.image
                            ? <ProfileAvatar imagePath={post.retweet.user.image} />
                            : <ProfileAvatar />}
                        </a>
                      </Link>
                    )}
                    title={(
                      <>
                        <p style={nicknameWrapper}>{post.retweet.user.nickname}</p>
                        {time()}
                      </>
                    )}
                    description={(
                      <>
                        <PostCardContent
                          post={post.retweet}
                          retweet={1}
                        />
                        <h5 style={retweetCardMetaWrapper}>
                          {`댓글 ${post.retweet.commentNum}개 좋아요 ${post.retweet.likers ? post.retweet.likers.length : 0}개`}
                        </h5>
                      </>
                    )}
                  />
                </Card>
              )
              : (
                <div style={postWrapperTest}>
                  {editMode ? <></> : <div style={tagWrapper}><Tag color="purple">{post.category}</Tag></div>}
                  <Card.Meta
                    avatar={
                      post.user.id
                        ? (
                          <Link href={`/user/${post.user.id}`} prefetch={false}>
                            <a>
                              {post.user.image ? <ProfileAvatar imagePath={post.user.image} />
                                : <ProfileAvatar />}
                            </a>
                          </Link>
                        ) : <></>
                    }
                    title={(
                      <>
                        <p style={nicknameWrapper}>{post.user.nickname}</p>
                        {editMode ? <></> : <>{time()}</>}
                      </>
                    )}
                    description={(
                      <>
                        <PostCardContent
                          post={post}
                          me={me}
                          editMode={editMode}
                          onCancelEdit={onCancelEdit}
                        />
                      </>
                    )}
                    loading
                  />
                </div>
              )}
          </Card>
        )}
      {commentFormOpened && (
        <div style={commentWrapper}>
          {mainPosts[mainPosts.findIndex((v) => v.id === post.id)].comments !== 0
            && mainPosts[mainPosts.findIndex((v) => v.id === post.id)]
            ? (
              <List
                itemLayout="horizontal"
                style={listWrapper}
                // loadMore={loadMore}
                dataSource={commentlist[post.id] || []}
                renderItem={(item) => <Comments item={item} post={post} />}
              />
            )
            : <></>}
          <div style={commentFormWrapper}>
            <CommentForm
              post={post}
            />
          </div>
        </div>
      )}
      <Modal
        title={(
          <span>
            <AlertOutlined style={prefixWrapper} />
            게시글 신고
          </span>
        )}
        visible={reportVisible}
        onOk={reportOk}
        onCancel={reportCancel}
        footer={null}
      >
        <Report setReportVisible={setReportVisible} postId={post.id} />
      </Modal>
    </div>
  );
};

PostCard.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number,
    user: PropTypes.shape({
      id: PropTypes.number,
      nickname: PropTypes.string,
      image: PropTypes.object,
    }),
    images: PropTypes.array,
    title: PropTypes.string,
    likers: PropTypes.array,
    commentNum: PropTypes.number,
    category: PropTypes.string,
    content: PropTypes.string,
    comments: PropTypes.object,
    blocked: PropTypes.bool,
    createdAt: PropTypes.string,
    updatedAt: PropTypes.string,
    retweet: PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      content: PropTypes.string,
      commentNum: PropTypes.number,
      user: PropTypes.shape({
        id: PropTypes.number,
        nickname: PropTypes.string,
        image: PropTypes.string,
      }),
      likers: PropTypes.string,
      images: PropTypes.shape({
        src: PropTypes.string,
      }),
    }),
  }).isRequired,
};

export default PostCard;
