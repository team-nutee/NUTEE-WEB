import React, { useCallback, useState, useMemo } from 'react';
import { Col, Form, Row } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import TextareaAutosize from "react-textarea-autosize";
import Send from "./Send";
import { ADD_RECOMMENT_REQUEST } from "../../reducers/post";
import { useDispatch, useSelector } from "react-redux";

const ReCommentForm = ({ post, commentId, cancelReply }) => {
    const dispatch = useDispatch();
    const [commentText, setCommentText] = useState('');
    const { isAddingComment, reCommentAdded } = useSelector(state => state.post);
    const { me } = useSelector(state => state.user);
    const onSubmitComment = useCallback((e) => {
        e.preventDefault();
        if (!me) {
            return alert('로그인이 필요합니다.');
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
    }, [me && me.id, commentText]);
    const onChangeCommentText = useCallback((e) => {
        setCommentText(e.target.value);
    }, []);

    const formDivWrapper = useMemo(() => ({ height: "auto", overflow: "hidden", display: 'flex' }), []);
    const formDivDiv1Wrapper = useMemo(() => ({ overflow: 'hidden', height: 'auto', background: 'white', borderRadius: '20px', margin: '5px 0px 0px 0px', border: '1px solid #e6e6e6', width: 'calc(100% - 30px)' }), []);
    const textareaAutosizeWrapper = useMemo(() => ({ margin: '0px 0px 0px 0px', paddingLeft: '15px', resize: 'none', outline: 'none', lineHeight: '30px', overflowY: 'hidden', width: '100%', minHeight: '30px', height: '30px', border: 'none' }), []);
    const formDivDiv1DivWrapper = useMemo(() => ({ width: '10px', margin: '10px 0px 0px 10px' }), []);
    const formDivDiv2Wrapper = useMemo(() => ({ width: '30px', marginTop: '15px', marginLeft: '10px' }), []);

    return (
        <Form onSubmit={onSubmitComment}>
            <div style={formDivWrapper}>
                <div style={formDivDiv1Wrapper}>
                    <Row gutter={4}>
                        <Col span={22}>
                            <TextareaAutosize
                                style={textareaAutosizeWrapper}
                                placeholder="답글을 입력해주세요."
                                value={commentText}
                                onChange={onChangeCommentText}
                                autoFocus={true}
                            />
                        </Col>
                        <Col span={2}>
                            <div style={formDivDiv1DivWrapper}>
                                <a>
                                    <Send
                                        onSubmitComment={onSubmitComment}
                                        isAddingComment={isAddingComment}
                                    />
                                </a>
                            </div>
                        </Col>
                    </Row>
                </div>
                <div style={formDivDiv2Wrapper}>
                    <a onClick={cancelReply}><CloseOutlined /></a>
                </div>
            </div>
        </Form>
    )
};

export default ReCommentForm;