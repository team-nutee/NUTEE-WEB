/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-restricted-globals */
import React, { useState, useMemo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { List, Popover, Button, Modal } from 'antd';
import Link from 'next/link';
import moment from 'moment';
import PropTypes from 'prop-types';
import { HeartTwoTone, HeartOutlined, EllipsisOutlined, AlertOutlined } from '@ant-design/icons';
import { REMOVE_RECOMMENT_REQUEST, LIKE_RECOMMENT_REQUEST, UNLIKE_RECOMMENT_REQUEST } from '../../reducers/post';
import ProfileAvatar from '../profiles/ProfileAvatar';
import EditRecommentForm from './EditRecommentForm';
import ReportComment from '../report/ReportComment';

moment.locale('ko');

const Recomment = ({ item, post, parentId, userId }) => {
  const dispatch = useDispatch();
  const [edit, setEdit] = useState(false);
  const { me } = useSelector((state) => state.user);
  const id = useSelector((state) => state.user.me?.id);
  const [reportVisible, setReportVisible] = useState(false);
  const onEdit = () => {
    setEdit(true);
  };

  const onLike = useCallback(() => {
    if (!id) return alert('로그인이 필요합니다.');
    return (
      dispatch({
        type: LIKE_RECOMMENT_REQUEST,
        postId: post.id,
        commentId: item.id,
        parentId,
        userId,
      })
    );
  }, [me && me.id]);

  const onUnlike = useCallback(() => {
    if (!id) return alert('로그인이 필요합니다.');
    return (
      dispatch({
        type: UNLIKE_RECOMMENT_REQUEST,
        data: {
          commentId: item.id,
          postId: post.id,
          userId: id,
          parentId,
        },
      })
    );
  }, [me && me.id]);

  const onRemove = useCallback(() => {
    const result = confirm('정말로 삭제하시겠습니까?');
    if (!result) {
      return;
    }
    dispatch({
      type: REMOVE_RECOMMENT_REQUEST,
      commentId: item.id,
      postId: post.id,
      parentId,
    });
  });

  const onReport = useCallback(() => {
    setReportVisible(true);
  });

  const listWrapper = useMemo(() => ({ border: 'none', marginBottom: '-10px', paddingLeft: '10px' }), []);
  const contentWrapper = useMemo(() => ({ marginTop: '2px', wordWrap: 'break-word', whiteSpace: 'pre-wrap', wordBreak: 'break-all' }), []);
  const nicknameWrapper = useMemo(() => ({ marginRight: '10px', fontWeight: 'bold' }), []);
  const momentWrapper = useMemo(() => ({ fontSize: '12px' }), []);
  const prefixWrapper = useMemo(() => ({ marginRight: '10px' }), []);
  const iconWrapper = useMemo(() => ({ color: '#005000', marginRight: '7px', fontSize: '15px' }), []);

  const reportOk = useCallback(() => { setReportVisible(false); }, []);
  const reportCancel = useCallback(() => { setReportVisible(false); }, []);

  // eslint-disable-next-line react/prop-types
  const liked = item.likers.find((v) => v.id === id);

  const EllipsisContent = (
    <>
      {me.id === item.user.id
        ? (
          <>
            <Button onClick={onEdit}>수정</Button>
            <Button type="danger" onClick={onRemove}>삭제</Button>
          </>
        )
        : <Button onClick={onReport}>신고</Button>}

    </>
  );

  return (
    <List.Item
      style={listWrapper}
      actions={!edit ? [
        <div>
          {liked
            ? <HeartTwoTone style={iconWrapper} twoToneColor="#eb2f96" key="heart" onClick={onUnlike} />
            : <HeartOutlined style={iconWrapper} key="heart" onClick={onLike} />}
          {item.likers.length}
        </div>,
        <div>
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
              ? (
                <EditRecommentForm
                  comment={item}
                  edit={edit}
                  setEdit={setEdit}
                  postId={post.id}
                  parentId={parentId}
                />
              )
              : (
                <pre style={contentWrapper}>
                  <Link href={`/user/${item.user.id}`} prefetch={false}>

                    <a style={nicknameWrapper}>{item.user.nickname}</a>
                  </Link>
                  <div style={momentWrapper}>
                    {moment(item.createdAt).format('YYYY.MM.DDTHH:mm:ss') === moment(item.updatedAt).format('YYYY.MM.DDTHH:mm:ss')
                      ? moment(item.createdAt).format('YYYY.MM.DD')
                      : moment(item.updatedAt).format('YYYY.MM.DD', ' (수정됨)')}
                  </div>
                  {item.content}
                </pre>
              )}
          />
        )}
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
        { `
          div { font-family: "Nanum Barun Gothic", sans-serif, ; font-weight: 200; }
        `}
      </style>
    </List.Item>
  );
};

Recomment.propTypes = {
  post: PropTypes.object.isRequired,
  parentId: PropTypes.number.isRequired,
  userId: PropTypes.number.isRequired,
  item: PropTypes.shape({
    id: PropTypes.number,
    likers: PropTypes.shape({
      length: PropTypes.string,
    }),
    content: PropTypes.string,
    updatedAt: PropTypes.string,
    createdAt: PropTypes.string,
    user: PropTypes.shape({
      id: PropTypes.number,
      nickname: PropTypes.string,
      image: PropTypes.string,
    }),
    userId: PropTypes.number,
  }).isRequired,
};

export default Recomment;
