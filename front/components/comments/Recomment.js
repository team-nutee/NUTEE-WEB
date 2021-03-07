/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-alert */
/* eslint-disable no-restricted-globals */
import React, { useState, useMemo, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { List } from 'antd';
import Link from 'next/link';
import moment from 'moment';
import PropTypes from 'prop-types';
import { EditOutlined, DeleteFilled } from '@ant-design/icons';
import { REMOVE_RECOMMENT_REQUEST } from '../../reducers/post';
import ProfileAvatar from '../profiles/ProfileAvatar';
import EditRecommentForm from './EditRecommentForm';

moment.locale('ko');

const Recomment = ({ item, post, parentId }) => {
  const dispatch = useDispatch();
  const [edit, setEdit] = useState(false);
  const onEdit = () => {
    setEdit(true);
  };

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

  return (
    <List.Item
      style={listWrapper}
      actions={!edit ? [<a key="edit" onClick={onEdit}><EditOutlined /></a>,
        <a key="delete" onClick={onRemove}><DeleteFilled /></a>] : <></>}
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
                  <div style={momentWrapper}>{moment(post.createdAt).format('YYYY.MM.DD')}</div>
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
