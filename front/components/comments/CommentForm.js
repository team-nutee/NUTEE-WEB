import React, { useMemo } from 'react';
import { Col, Form, Row, Input } from 'antd';
import PropTypes from 'prop-types';
import Send from './Send';

const CommentForm = ({ onSubmitComment, commentText, onChangeCommentText, addCommentLoading }) => {
  const formWrapper = useMemo(() => ({ margin: '10px 0px 0px 0px', height: 'auto', overflow: 'hidden' }), []);
  const commentWrapper = useMemo(() => ({ overflow: 'hidden', height: 'auto', background: 'white', borderRadius: '20px', margin: '5px 0px 0px 0px', border: '3px solid #c8e6d7' }), []);
  const inputWrapper = useMemo(() => ({ margin: '0px 0px 0px 0px', paddingLeft: '15px', resize: 'none', outline: 'none', lineHeight: '30px', overflowY: 'hidden', width: '100%', minHeight: '30px', height: '30px', border: 'none' }), []);
  const sendWrapper = useMemo(() => ({ width: '10px', margin: '10px 0px 0px 10px' }), []);

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

CommentForm.prototype = {
  onSubmitComment: PropTypes.func,
  commentText: PropTypes.string,
  onChangeCommentText: PropTypes.func,
  addCommentLoading: PropTypes.bool,
}.isRequired;

export default CommentForm;
