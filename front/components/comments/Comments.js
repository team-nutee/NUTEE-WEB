/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-restricted-globals */
import React, { useCallback, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { List, Popover, Button, Modal } from 'antd';
import Link from 'next/link';
import moment from 'moment';
import { MessageOutlined, HeartTwoTone, HeartOutlined, EllipsisOutlined, AlertOutlined } from '@ant-design/icons';
import { REMOVE_COMMENT_REQUEST, LIKE_COMMENT_REQUEST, UNLIKE_COMMENT_REQUEST } from '../../reducers/post';
import EditCommentForm from './EditCommentForm';
import ProfileAvatar from '../profiles/ProfileAvatar';
import ReCommentForm from './ReCommentForm';
import RecommentBox from './RecommentBox';
import ReportComment from '../report/ReportComment';
import CommentsContent from './CommentsContent';

moment.locale('ko');

const Comments = ({ item, post }) => {
  const dispatch = useDispatch();
  const [edit, setEdit] = useState(false);
  const [reply, setReply] = useState(false);
  const [reportVisible, setReportVisible] = useState(false);
  const { me } = useSelector((state) => state.user);
  const id = useSelector((state) => state.user.me?.id);

  const onEdit = () => { setEdit(true); };
  const onReply = () => { setReply(true); };
  const cancelReply = () => { setReply(false); };
  const onReport = useCallback(() => { setReportVisible(true); });

  const onLike = useCallback(() => {
    if (!id) return alert('로그인이 필요합니다.');
    return (
      dispatch({
        type: LIKE_COMMENT_REQUEST,
        postId: post.id,
        commentId: item.id,
        userId: id,
      })
    );
  }, []);

  const onUnlike = useCallback(() => {
    if (!id) return alert('로그인이 필요합니다.');
    return (
      dispatch({
        type: UNLIKE_COMMENT_REQUEST,
        data: {
          commentId: item.id,
          postId: post.id,
          userId: id,
        },
      })
    );
  }, []);

  const onRemove = useCallback(() => {
    const result = confirm('정말로 삭제하시겠습니까?');
    if (!result) return;
    dispatch({
      type: REMOVE_COMMENT_REQUEST,
      commentId: item.id,
      postId: post.id,
    });
  }, []);

  const listWrapper = useMemo(() => ({ fontFamily: 'NanumBarunGothic', marginLeft: '-15px', marginBottom: '-15px', border: 'none' }), []);
  const contentWrapper = useMemo(() => ({ marginRight: '-30px', marginTop: '2px', wordWrap: 'break-word', whiteSpace: 'pre-wrap', wordBreak: 'break-all' }), []);
  const nicknameWrapper = useMemo(() => ({ marginRight: '10px', fontWeight: 'bold', color: '#005000' }), []);
  const iconWrapper = useMemo(() => ({ color: '#005000', marginRight: '7px', fontSize: '15px' }), []);
  const momentWrapper = useMemo(() => ({ fontSize: '12px', marginBottom: '5px' }), []);
  const commentWrapper = useMemo(() => ({ fontFamily: 'Nanum Barun Gothic' }), []);
  const editWrapper = useMemo(() => ({ marginRight: '2px' }), []);
  const prefixWrapper = useMemo(() => ({ marginRight: '10px' }), []);

  const reportOk = useCallback(() => { setReportVisible(false); }, []);
  const reportCancel = useCallback(() => { setReportVisible(false); }, []);

  // eslint-disable-next-line react/prop-types
  const liked = item.likers && item.likers.find((v) => v.id === id);

  const EllipsisContent = (
    <>
      {me.id === item.user.id
        ? (
          <>
            <Button onClick={onEdit}>수정</Button>
            <Button type="danger" onClick={onRemove}>삭제</Button>
          </>
        ) : <Button onClick={onReport}>신고</Button>}
    </>
  );

  return (
    <div style={commentWrapper}>
      <List.Item
        style={listWrapper}
        actions={!edit ? [
          <div>
            {liked
              ? <HeartTwoTone style={iconWrapper} twoToneColor="#eb2f96" key="heart" onClick={onUnlike} />
              : <HeartOutlined style={iconWrapper} key="heart" onClick={onLike} />}
            {item.likers.length}
          </div>,
          <div style={editWrapper}>
            <a key="reComment" onClick={onReply}><MessageOutlined style={iconWrapper} /></a>
            <Popover
              content={EllipsisContent}
              trigger="click"
            >
              <EllipsisOutlined style={iconWrapper} />
            </Popover>
          </div>,
        ] : <></>}
      >
        {item === null
          ? <></>
          : (
            <List.Item.Meta
              avatar={(
                <Link href={`/user/${item.user.id}`} prefetch={false}>
                  <a>
                    {item.user.image ? <ProfileAvatar imagePath={item.user.image} />
                      : <ProfileAvatar />}
                  </a>
                </Link>
              )}
              description={edit
                ? <EditCommentForm comment={item} setEdit={setEdit} postId={post.id} />
                : (
                  <pre style={contentWrapper}>
                    <Link href={{ pathname: '/user', query: { id: item.user.id } }} as={`/user/${item.user.id}`}>
                      <a style={nicknameWrapper}>{item.user.nickname}</a>
                    </Link>
                    <div style={momentWrapper}>
                      {moment(item.createdAt).format('YYYY.MM.DDTHH:mm:ss') === moment(item.updatedAt).format('YYYY.MM.DDTHH:mm:ss')
                        ? moment(item.createdAt).format('YYYY.MM.DD') : moment(item.updatedAt).format('YYYY.MM.DD', ' (수정됨)')}
                    </div>
                    <>
                      <CommentsContent
                        commentsData={item.content}
                      />
                    </>
                  </pre>
                )}
            />
          )}
      </List.Item>
      {reply
        ? <ReCommentForm cancelReply={cancelReply} post={post} commentId={item.id} />
        : <></>}
      <RecommentBox
        reComment={item.reComment || []}
        post={post}
        onReply={onReply}
        cancelReply={cancelReply}
        parentId={item.id}
        userId={id}
      />
      <Modal
        title={(
          <span>
            <AlertOutlined style={prefixWrapper} />
            댓글 신고
          </span>
        )}
        visible={reportVisible}
        onOk={reportOk}
        onCancel={reportCancel}
        footer={null}
      >
        <ReportComment setReportVisible={setReportVisible} item={item} post={post} />
      </Modal>
      <style jsx>
        {
          `div { 
            font-family: "Nanum Barun Gothic", sans-serif, ; font-weight: 200;
          }`
        }
      </style>
    </div>
  );
};

Comments.propTypes = {
  post: PropTypes.object.isRequired,
  item: PropTypes.shape({
    id: PropTypes.number,
    content: PropTypes.string,
    createdAt: PropTypes.string,
    updatedAt: PropTypes.string,
    likers: PropTypes.shape({
      length: PropTypes.string,
    }),
    user: PropTypes.shape({
      id: PropTypes.number,
      nickname: PropTypes.string,
      image: PropTypes.string,
    }),
    reComment: PropTypes.shape({
      id: PropTypes.number,
      createdAt: PropTypes.string,
      user: PropTypes.shape({
        id: PropTypes.number,
        nickname: PropTypes.string,
        image: PropTypes.string,
      }),
    }),
  }).isRequired,
};

export default Comments;
