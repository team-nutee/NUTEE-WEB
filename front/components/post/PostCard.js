/* eslint-disable no-restricted-globals */
import React, { useCallback, useState, useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Card, List, Badge, Modal, Tag, Button, Popover } from 'antd';
import { AlertOutlined, MessageOutlined, HeartTwoTone, HeartOutlined, EllipsisOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { LIKE_POST_REQUEST, LOAD_COMMENTS_REQUEST, REMOVE_POST_REQUEST, UNLIKE_POST_REQUEST } from '../../reducers/post';
import PostImages from './PostImages';
import PostCardContent from './PostCardContent';
import Comments from '../comments/Comments';
import CommentForm from '../comments/CommentForm';
import ProfileAvatar from '../profiles/ProfileAvatar';
import Report from '../report/Report';
import PostTime from './PostTime';

const PostCard = ({ post }) => {
  const dispatch = useDispatch();
  const [commentFormOpened, setCommentFormOpened] = useState(false);
  const { me } = useSelector((state) => state.user);
  const { commentList } = useSelector((state) => state.post);
  const [reportVisible, setReportVisible] = useState(false);
  const [popoverVisible, setPopoverVisible] = useState(false);
  const [lastId, setlastId] = useState(0);
  const { mainPosts, loadPostDone } = useSelector((state) => state.post);
  const [editMode, setEditMode] = useState(false);
  const [mobileScreen, setMobileScreen] = useState(false);

  const postImage = post.images && post.images[0] ? <PostImages images={post.images} /> : <></>;
  const liked = me && post.likers && post.likers.find((v) => v.id === me.id);
  const postCardWrapper = useMemo(() => ({ minWidth: '500px', width: '50wv', borderRadius: '2px', border: '2px solid #c8e6d7', maxWidth: '700px', marginBottom: '15px' }), []);
  const mobilePostCardWrapper = useMemo(() => ({ minWidth: '250px', width: '50wv', borderRadius: '2px', border: '2px solid #c8e6d7', maxWidth: '700px', marginBottom: '15px' }), []);
  const blockCardWrapper = useMemo(() => ({ background: '#F6CED8', textAlign: 'center' }), []);
  const aWrapper = useMemo(() => ({ margin: '0px 10px' }), []);
  const retweetCardWrapper = useMemo(() => ({ marginBottom: '10px' }), []);
  const retweetCardMetaWrapper = useMemo(() => ({ position: 'absolute', right: '15px', bottom: '15px', fontSize: '12px' }), []);
  const heartWrapper = useMemo(() => ({ color: '#eb2f96', fontSize: '20px' }), []);
  const badge2Wrapper = useMemo(() => ({ background: '#87d068', size: 'small', zIndex: '0' }), []);
  const badge3Wrapper = useMemo(() => ({ background: '#005000', size: 'small', zIndex: '0' }), []);
  const listWrapper = useMemo(() => ({ background: '#f0faf5', paddingBottom: '0px', height: 'auto' }), []);
  const commentWrapper = useMemo(() => ({ background: '#f0faf5', border: '2px solid #fff', height: 'auto', justiceContent: 'center' }), []);
  const commentFormWrapper = useMemo(() => ({ background: '#f0faf5', height: 'auto', margin: '10px 15px' }), []);
  const nicknameWrapper = useMemo(() => ({ fontSize: '18px', margin: '0' }), []);
  const iconWrapper = useMemo(() => ({ fontSize: '23px' }), []);
  const tagWrapper = useMemo(() => ({ marginBottom: '15px' }), []);
  const postWrapperTest = useMemo(() => ({ margin: '0', padding: '0' }), []);
  const prefixWrapper = useMemo(() => ({ marginRight: '10px' }), []);

  const reportOk = useCallback(() => { setReportVisible(false); }, []);
  const reportCancel = useCallback(() => { setReportVisible(false); }, []);
  const onClickEdit = useCallback(() => { setPopoverVisible(false); setEditMode(true); }, []);
  const onCancelEdit = useCallback(() => { setEditMode(false); }, []);

  useEffect(
    function onMobileWidth() {
      if ((window.innerWidth || document.body.clientWidth) > 750) {
        setMobileScreen(false);
      } else {
        setMobileScreen(true);
      }
      window.addEventListener('resize', onMobileWidth);
      return () => {
        window.removeEventListener('resize', onMobileWidth);
      };
    },
  );

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

  const onLike = useCallback(() => {
    if (!me.id) return alert('로그인이 필요합니다.');
    if (me.id === post.user.id) return alert('자신의 글은 좋아요를 누를 수 없습니다.');
    return dispatch({
      type: LIKE_POST_REQUEST,
      data: post.id,
      user: {
        id: me.id,
        nickname: me.nickname,
        image: me.image,
      },
    });
  }, [me && me.id]);

  const onUnLike = useCallback(() => {
    if (!me.id) return alert('로그인이 필요합니다.');
    return dispatch({
      type: UNLIKE_POST_REQUEST,
      postId: post.id,
      userId: me.id,
    });
  }, [me && me.id]);

  const onRemovePost = useCallback(() => {
    setPopoverVisible(false);
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
    setPopoverVisible(false);
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

  const locale = {
    emptyText: (
      <div style={{ paddingTop: '20px', paddingBottom: '10px' }}>
        <p>댓글이 없습니다.</p>
      </div>
    ),
  };

  return (
    <div style={mobileScreen?mobilePostCardWrapper:postCardWrapper}>
      {post.blocked ? <Card style={blockCardWrapper}>다수 사용자의 신고로 인해 잠시 가려진 게시물입니다.</Card>
        : (
          <Card
            cover={editMode ? <></> : postImage}
            actions={[
              <Badge count={post.commentNum || 0} onClick={onToggleComment} size="small" style={badge3Wrapper}>
                <MessageOutlined style={iconWrapper} />
              </Badge>,
              <Badge count={post.likers ? post.likers.length : 0} size="small" style={badge2Wrapper}>
                {liked ? <HeartTwoTone twoToneColor="#eb2f96" key="heart" style={heartWrapper} onClick={onUnLike} />
                  : <HeartOutlined style={iconWrapper} key="heart" onClick={onLike} />}
              </Badge>,
              <Popover
                content={EllipsisContent}
                trigger="click"
                visible={popoverVisible}
                onVisibleChange={(visible) => setPopoverVisible(visible)}
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
                        <PostTime post={post} />
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
                        {editMode ? <></> : (<><PostTime post={post} /></>)}
                      </>
                    )}
                    description={(
                      <>
                        <PostCardContent
                          post={post}
                          editMode={editMode}
                          onCancelEdit={onCancelEdit}
                        />
                      </>
                    )}
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
                locale={locale}
                itemLayout="horizontal"
                style={listWrapper}
                dataSource={commentList[mainPosts.findIndex((v) => v.id === post.id)] || []}
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
