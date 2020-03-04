import React, {useCallback, useEffect, useState} from 'react';
import {Col, Form, Icon, Row} from "antd";
import TextareaAutosize from "react-textarea-autosize";
import Send from "./Send";
import {ADD_COMMENT_REQUEST, EDIT_COMMENT_REQUEST} from "../reducers/post";
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

    return(
        <Form style={{margin: '-10px 0px 0px 0px'}} onSubmit={onSubmitComment}>
            <div style={{height: "auto", overflow: "hidden", display:'flex'}}>
                <div style={{
                    overflow: 'hidden',
                    height: 'auto',
                    background: 'white',
                    borderRadius: '20px',
                    margin: '5px 0px 0px 0px',
                    border: '1px solid #e6e6e6',
                    width:'calc(100% - 30px)'
                }}>
                    <Row gutter={2}>
                        <Col span={22}>
                            <TextareaAutosize
                                style={{
                                    margin: '0px 0px 0px 0px',
                                    paddingLeft: '15px',
                                    resize: 'none',
                                    outline: 'none',
                                    lineHeight: '30px',
                                    overflowY: 'hidden',
                                    width: '100%',
                                    minHeight: '30px',
                                    height: '30px',
                                    border: 'none'
                                }}
                                placeholder="댓글을 입력해주세요."
                                value={commentText}
                                onChange={onChangeCommentText}
                                autoFocus={true}
                            />
                        </Col>
                        <Col span={2}>
                            <div style={{minWidth: '10px', margin: '10px 0px 0px 10px'}}>
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
                <div style={{width:'30px',marginTop:'15px', marginLeft:'10px'}}>
                    <a onClick={cancelEdit}><Icon type='close'/></a>
                </div>
            </div>
        </Form>
    )
};

export default EditCommentForm;