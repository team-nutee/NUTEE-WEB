import React from 'react';
import {Col, Form, Row} from "antd";
import TextareaAutosize from "react-textarea-autosize";
import Send from "./Send";

const CommentForm =({onSubmitComment,commentText,onChangeCommentText,isAddingComment})=>{

    return(
        <Form style={{margin: '0px 0 10px'}} onSubmit={onSubmitComment}>
            <div style={{height: "auto", overflow: "hidden", background: '#effbf5'}}>
                <div style={{
                    overflow: 'hidden',
                    height: 'auto',
                    background: 'white',
                    borderRadius: '20px',
                    marginTop: '5px',
                    border: '1px solid #e6e6e6'
                }}>
                    <Row gutter={4}>
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
                            <div style={{width: '10px', margin: '10px 0px 0px 10px'}}>
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
            </div>
        </Form>
    )
};

export default CommentForm;