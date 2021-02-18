/* eslint-disable no-alert */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useCallback, useEffect, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Col, Form, Row, Input } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import Send from './Send';
import { EDIT_COMMENT_REQUEST } from '../../reducers/post';

const EditCommentForm = ({ comment, setEdit, postId }) => {
  const dispatch = useDispatch();
  const [commentText, setCommentText] = useState(comment.content);
  const [editComment, setEditComment] = useState(false);
  const { me } = useSelector((state) => state.user);
  const { editCommentLoading } = useSelector((state) => state.post);

  const cancelEdit = () => {
    setEdit(false);
  };

  const onSubmitComment = useCallback((e) => {
    e.preventDefault();
    if (!me) {
      alert('로그인이 필요합니다.');
      return;
    }
    dispatch({
      type: EDIT_COMMENT_REQUEST,
      data: {
        postId,
        commentId: comment.id,
        content: commentText,
      },
    });
    setEditComment(true);
  }, [me && me.id, commentText, editComment]);

  useEffect(() => {
    setCommentText(comment.content);
    if (editComment) {
      setEdit(false);
      comment.content = commentText;
    }
  }, [editComment]);

  const onChangeCommentText = useCallback((e) => {
    setCommentText(e.target.value);
  }, []);

  const formWrapper = useMemo(() => ({ margin: '-10px 0px 0px 0px', height: 'auto', overflow: 'hidden', display: 'flex' }), []);
  const commentWrapper = useMemo(() => ({ overflow: 'hidden', height: 'auto', background: 'white', borderRadius: '20px', margin: '5px 0px 0px 0px', border: '1px solid #e6e6e6', width: 'calc(100% - 30px)' }), []);
  const inputWrapper = useMemo(() => ({ margin: '0px 0px 0px 0px', paddingLeft: '15px', resize: 'none', outline: 'none', lineHeight: '30px', overflowY: 'hidden', width: '100%', minHeight: '30px', height: '30px', border: 'none' }), []);
  const sendWrapper = useMemo(() => ({ width: '10px', margin: '10px 0px 0px 10px' }), []);
  const closeWrapper = useMemo(() => ({ width: '30px', marginTop: '15px', marginLeft: '10px' }), []);
  const iconWrapper = useMemo(() => ({ color: '#005000' }), []);

  return (
    <Form style={formWrapper} onFinish={onSubmitComment}>
      <Row gutter={2} style={commentWrapper}>
        <Col span={22}>
          <Input.TextArea
            style={inputWrapper}
            value={commentText}
            onChange={onChangeCommentText}
            autoSize={{ minRows: 2 }}
            placeholder="댓글을 입력해주세요."
          />
        </Col>
        <Col span={2} style={sendWrapper}>
          <a>
            <Send
              onSubmitComment={onSubmitComment}
              addCommentLoading={editCommentLoading}
            />
          </a>
        </Col>
      </Row>
      <div style={closeWrapper}>
        <a onClick={cancelEdit}>
          <CloseOutlined style={iconWrapper} />
        </a>
      </div>
    </Form>
  );
};

EditCommentForm.propTypes = {
  comment: PropTypes.shape({
    id: PropTypes.number,
    content: PropTypes.string,
  }),
  setEdit: PropTypes.bool,
  postId: PropTypes.number,
}.isRequired;

export default EditCommentForm;
