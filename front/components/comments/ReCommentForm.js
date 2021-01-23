import React, { useCallback, useState, useMemo } from "react";
import { Col, Form, Row, Input } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import Send from "./Send";
import { ADD_RECOMMENT_REQUEST } from "../../reducers/post";
import { useDispatch, useSelector } from "react-redux";

const ReCommentForm = ({ post, commentId, cancelReply }) => {
  const dispatch = useDispatch();
  const [commentText, setCommentText] = useState("");
  const { addCommentLoading, addReCommentDone } = useSelector(
    state => state.post
  );
  const { me } = useSelector(state => state.user);
  
  const onSubmitComment = useCallback(
    e => {
      e.preventDefault();
      if (!me) {
        return alert("로그인이 필요합니다.");
      }
      dispatch({
        type: ADD_RECOMMENT_REQUEST,
        data: {
          postId: post.id,
          parentId: commentId,
          content: commentText,
        },
      });
      cancelReply();
    },
    [me && me.id, commentText]
  );

  const onChangeCommentText = useCallback(e => {
    setCommentText(e.target.value);
  }, []);

  const formWrapper = useMemo(() => ({ height: "auto", overflow: "hidden", display: 'flex' }), []);
  const commentWrapper = useMemo(() => ({ overflow: 'hidden', height: 'auto', background: 'white', borderRadius: '20px', margin: '5px 0px 0px 0px', border: '1px solid #e6e6e6', width: 'calc(100% - 30px)' }), []);
  const inputWrapper = useMemo(() => ({ margin: '0px 0px 0px 0px', paddingLeft: '15px', resize: 'none', outline: 'none', lineHeight: '30px', overflowY: 'hidden', width: '100%', minHeight: '30px', height: '30px', border: 'none' }), []);
  const sendWrapper = useMemo(() => ({ width: '10px', margin: '10px 0px 0px 10px' }), []);
  const closeWrapper = useMemo(() => ({ width: '30px', marginTop: '15px', marginLeft: '10px' }), []);
  const iconWrapper = useMemo(() => ({ color: '#005000', }), []);

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
        <Col span={2} style={sendWrapper}>
            <a>
              <Send
                onSubmitComment={onSubmitComment}
                addCommentLoading={addCommentLoading}
              />
            </a>
        </Col>
      </Row>
      <div style={closeWrapper}>
        <a onClick={cancelReply}>
          <CloseOutlined style={iconWrapper} />
        </a>
      </div>
    </Form>
  );
};

export default ReCommentForm;
