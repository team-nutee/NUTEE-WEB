import React, { useCallback, useEffect, useMemo } from 'react';
import { Col, Form, Row, Input } from 'antd';
import PropTypes from 'prop-types';
import Send from './Send';
import { useSelector, useDispatch } from 'react-redux';
import {
  ADD_COMMENT_REQUEST
} from '../../reducers/post';
import useInput from '../../hooks/useInput';

const CommentForm = ({ post }) => {
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);
  const [commentText, onChangeCommentText, setCommentText] = useInput('');
  const { addCommentDone, addCommentLoading } = useSelector((state) => state.post);


  const formWrapper = useMemo(() => ({ margin: '10px 0px 0px 0px', height: 'auto', overflow: 'hidden' }), []);
  const commentWrapper = useMemo(() => ({ overflow: 'hidden', height: 'auto', background: 'white', borderRadius: '20px', margin: '5px 0px 0px 0px', border: '3px solid #c8e6d7' }), []);
  const inputWrapper = useMemo(() => ({ margin: '0px 0px 0px 0px', paddingLeft: '15px', resize: 'none', outline: 'none', lineHeight: '30px', overflowY: 'hidden', width: '100%', minHeight: '30px', height: '30px', border: 'none' }), []);
  const sendWrapper = useMemo(() => ({ width: '10px', margin: '10px 0px 0px 10px' }), []);

  const onSubmitComment = useCallback((e) => {
    e.preventDefault();
    if (!me) {
      return alert('로그인이 필요합니다.');
    }
    return dispatch({
      type: ADD_COMMENT_REQUEST,
      data: {
        content: commentText,
      },
      postId: post.id,
    });
  }, [me && me.id, commentText]);

  useEffect(() => {
    if(addCommentDone) {
      setCommentText('');
    }
  }, [addCommentDone]);

  return (
    <Form onFinish={onSubmitComment} style={formWrapper}>
      <Row gutter={4} style={commentWrapper}>
        <Col span={22}>
          <Input.TextArea
            style={inputWrapper}
            value={commentText}
            onChange={onChangeCommentText}
            autoSize={{ minRows: 2 }}
            placeholder="댓글을 입력해주세요."
          />
        </Col>
        <Col span={2}>
          <div style={sendWrapper}>
            <a>
              <Send
                onSubmitComment={onSubmitComment}
                addCommentLoading={addCommentLoading}
              />
            </a>
          </div>
        </Col>
      </Row>
    </Form>
  );
};

CommentForm.propTypes = {
  post: PropTypes.object.isRequired,
};

export default CommentForm;
