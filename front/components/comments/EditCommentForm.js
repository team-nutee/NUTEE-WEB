import React, {useCallback, useEffect, useState, useMeme } from 'react';
import {Col, Form, Row} from "antd";
import { CloseOutlined } from '@ant-design/icons';

import TextareaAutosize from "react-textarea-autosize";
import Send from "./Send";
import { EDIT_COMMENT_REQUEST } from "../../reducers/post";
import {useDispatch, useSelector} from "react-redux";

const EditCommentForm =({comment,edit,setEdit,postId})=>{
    const dispatch = useDispatch();
    const [commentText, setCommentText] = useState(comment.content);
    const [commentEdited,setCommentEdited] = useState(false);
    const {me} = useSelector(state => state.user);
    const { isEditingComment} = useSelector(state => state.post);

    const cancelEdit =()=>{
        setEdit(false);
    };

    const onSubmitComment = useCallback((e) => {
        e.preventDefault();
        if (!me) {
            return alert('로그인이 필요합니다.');
        }
        dispatch({
            type: EDIT_COMMENT_REQUEST,
            data: {
                postId : postId,
                commentId: comment.id,
                content: commentText,
            },
        });
        setCommentEdited(true);
    }, [me && me.id, commentText,commentEdited]);

    useEffect(() => {
        setCommentText(comment.content);
        if(commentEdited){
            setEdit(false);
            comment.content = commentText;
        }
    }, [commentEdited]);

    const onChangeCommentText = useCallback((e) => {
        setCommentText(e.target.value);
    }, []);

    const formWrapper = useMemo(() => ({ margin: '-10px 0px 0px 0px' }), []);
    const formDivWrapper = useMemo(() => ({ height: "auto", overflow: "hidden", display:'flex' }), []);
    const formDiv1Wrapper = useMemo(() => ({  overflow: 'hidden', height: 'auto', background: 'white', borderRadius: '20px', margin: '5px 0px 0px 0px', border: '1px solid #e6e6e6', width:'calc(100% - 30px)' }), []);
    const textareaAutosizeWrapper = useMemo(() => ({ margin: '0px 0px 0px 0px', paddingLeft: '15px', resize: 'none', outline: 'none', lineHeight: '30px', overflowY: 'hidden', width: '100%', minHeight: '30px', height: '30px', border: 'none'}), []);
    const colDivWrapper = useMemo(() => ({ width: '10px', margin: '10px 0px 0px 10px' }), []);
    const formDiv2Wrapper = useMemo(() => ({ width:'30px',marginTop:'15px', marginLeft:'10px' }), []);

    return(
        <Form style={ formWrapper } onSubmit={onSubmitComment}>
            <div style={ formDivWrapper}>
                <div style={ formDiv1Wrapper }>
                    <Row gutter={2}>
                        <Col span={22}>
                            <TextareaAutosize
                                style={ textareaAutosizeWrapper }
                                placeholder="댓글을 입력해주세요."
                                value={commentText}
                                onChange={onChangeCommentText}
                                autoFocus={true}
                            />
                        </Col>
                        <Col span={2}>
                            <div style={ colDivWrapper }>
                                <a>
                                    <Send
                                        onSubmitComment={onSubmitComment}
                                        isAddingComment={isEditingComment}
                                    />
                                </a>
                            </div>
                        </Col>
                    </Row>
                </div>
                <div style={ formDiv2Wrapper }>
                    <a onClick={cancelEdit}><CloseOutlined /></a>
                </div>
            </div>
        </Form>
    )
};

export default EditCommentForm;