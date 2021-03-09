/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-alert */
/* eslint-disable no-restricted-globals */
import React, { useState, useMemo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { List } from 'antd';
import Link from 'next/link';
import moment from 'moment';
import PropTypes from 'prop-types';
import { EditOutlined, DeleteFilled, HeartTwoTone, HeartOutlined } from '@ant-design/icons';
import { REMOVE_RECOMMENT_REQUEST, LIKE_RECOMMENT_REQUEST, UNLIKE_RECOMMENT_REQUEST } from '../../reducers/post';
import ProfileAvatar from '../profiles/ProfileAvatar';
import EditRecommentForm from './EditRecommentForm';

moment.locale('ko');

const Recomment = ({ item, post, parentId }) => {
  const dispatch = useDispatch();
  const [edit, setEdit] = useState(false);
  const { me } = useSelector((state) => state.user);
  const id = useSelector((state) => state.user.me?.id);
  const onEdit = () => {
    setEdit(true);
  };

  const onLike = useCallback(() => {
    if (!id) {
      return alert('로그인이 필요합니다.');
    }
    dispatch({
      type: LIKE_RECOMMENT_REQUEST,
      data: {
        commentId: item.id,
        postId: post.id,
        parentId,
      }
    })
  }, [id]);
  const onUnlike = useCallback(() => {
    if (!id) {
      return alert('로그인이 필요합니다.');
    }
    dispatch({
      type: UNLIKE_RECOMMENT_REQUEST,
      data: {
        commentId: item.id,
        postId: post.id,
        userId: id,
        parentId,
      }
    })
  }, [id]);

  const onRemove = useCallback(() => {
    const result = confirm('정말로 삭제하시겠습니까?');
    if (!result) {
      return;
    }
    dispatch({
      type: REMOVE_RECOMMENT_REQUEST,
      commentId: item.id,
      postId: post.id,
      parentId: parentId,
    });
  });

  const listWrapper = useMemo(() => ({ border: 'none', marginBottom: '-10px', paddingLeft: '10px' }), []);
  const contentWrapper = useMemo(() => ({ marginTop: '5px', wordWrap: 'break-word', whiteSpace: 'pre-wrap', wordBreak: 'break-all' }), []);
  const nicknameWrapper = useMemo(() => ({ marginRight: '10px' }), []);
  const momentWrapper = useMemo(() => ({ float: 'right' }), []);

  const liked = item.likers.find((v) => v.id === id);

  return (
    <List.Item
      style={listWrapper}
      actions={!edit ? [
        <div>
          {liked
            ? <HeartTwoTone twoToneColor="#eb2f96" key="heart" onClick={onUnlike}/>
            : <HeartOutlined key="heart" onClick={onLike} />
          }
          {item.likers.length}
        </div>,
        <div>
        <a key="edit" onClick={onEdit}><EditOutlined /></a>,
        {me.id === item.user.id 
          ? (
            <>
              <a key="delete" onClick={onRemove}><DeleteFilled /></a> 
            </> 
          ) 
          : <></>}
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
              ? <EditRecommentForm comment={item} edit={edit} setEdit={setEdit} postId={post.id} parentId={parentId} />
              : (
                <pre style={contentWrapper}>
                  <Link href={`/user/${item.user.id}`} prefetch={false}>

                    <a style={nicknameWrapper}>{item.user.nickname}</a>
                  </Link>
                  <div style={momentWrapper}>{moment(item.createdAt).format('YYYY.MM.DD')}</div>
                  {item.content}
                </pre>
              )}
          />
        )}
      <style jsx>
        { `
          div { font-family: "Nanum Barun Gothic", sans-serif, ; font-weight: 200; }
        `}
      </style>
    </List.Item>
  );
};

Recomment.propTypes = {
  post: PropTypes.object.isRequired,
  item: PropTypes.shape({
    id: PropTypes.number,
    content: PropTypes.string,
    user: PropTypes.shape({
      id: PropTypes.number,
      nickname: PropTypes.string,
      image: PropTypes.string,
    }),
  }).isRequired,
};

export default Recomment;
