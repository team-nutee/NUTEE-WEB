/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-alert */
/* eslint-disable no-restricted-globals */
import React, { useCallback, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { List } from 'antd';
import Link from 'next/link';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { DeleteFilled, EditOutlined, MessageOutlined } from '@ant-design/icons';
import { REMOVE_COMMENT_REQUEST } from '../../reducers/post';
import EditCommentForm from './EditCommentForm';
import ProfileAvatar from '../profiles/ProfileAvatar';
import ReCommentForm from './ReCommentForm';
import RecommentBox from './RecommentBox';

moment.locale('ko');

const Comments = ({ item, post }) => {
  const dispatch = useDispatch();
  const [edit, setEdit] = useState(false);
  const [reply, setReply] = useState(false);

  const onEdit = () => {
    setEdit(true);
  };
  const onReply = () => {
    setReply(true);
  };
  const cancelReply = () => {
    setReply(false);
  };

  const onRemove = useCallback(() => {
    const result = confirm('정말로 삭제하시겠습니까?');
    if (!result) {
      return;
    }
    dispatch({
      type: REMOVE_COMMENT_REQUEST,
      commentId: item.id,
      postId: post.id,
    });
  });

  const listWrapper = useMemo(() => ({ fontFamily: 'NanumBarunGothic', marginLeft: '-15px', marginBottom: '-15px', border: 'none' }), []);
  const contentWrapper = useMemo(() => ({ marginTop: '5px', wordWrap: 'break-word', whiteSpace: 'pre-wrap', wordBreak: 'break-all' }), []);
  const nicknameWrapper = useMemo(() => ({ marginRight: '10px' }), []);
  const iconWrapper = useMemo(() => ({ color: '#005000' }), []);
  const momentWrapper = useMemo(() => ({ float: 'right' }), []);
  const commentWrapper = useMemo(() => ({ fontFamily: 'Nanum Barun Gothic' }), []);

  return (
    <div style={commentWrapper}>
      <List.Item
        style={listWrapper}
        actions={!edit ? [<a key="reComment" onClick={onReply}><MessageOutlined style={iconWrapper} /></a>,
          <a key="edit" onClick={onEdit}><EditOutlined style={iconWrapper} /></a>, // 수정 아이콘 내 댓글 아니면 안 보이도록
          <a key="delete" onClick={onRemove(post, item)}><DeleteFilled style={iconWrapper} /></a>] : <></>}
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
                ? <EditCommentForm comment={item} edit={edit} setEdit={setEdit} postId={post.id} />
                : (
                  <pre style={contentWrapper}>
                    <Link href={{ pathname: '/user', query: { id: item.user.id } }} as={`/user/${item.user.id}`}>
                      <a style={nicknameWrapper}>{item.user.nickname}</a>
                    </Link>
                    <div style={momentWrapper}>{moment(post.createdAt).format('YYYY.MM.DD')}</div>
                    {item.content}
                  </pre>
                )}
            />
          )}
      </List.Item>
      {item.reComment
        ? <RecommentBox reComment={item.reComment} post={post} onReply={onReply} />
        : <></>}
      {reply
        ? <ReCommentForm cancelReply={cancelReply} post={post} commentId={item.id} />
        : <></>}
      <style jsx>
        {`div { 
          font-family: "Nanum Barun Gothic", sans-serif, ; font-weight: 200;
        }`}
      </style>
    </div>
  );
};

Comments.propTypes = {
  post: PropTypes.object.isRequired,
  item: PropTypes.shape({
    id: PropTypes.number,
    content: PropTypes.string,
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
