import React, {useCallback, useEffect, useState} from 'react';
import {Avatar, Button, Card, Comment, Form, Icon, Input, List, Modal, Skeleton, Dropdown, Menu, Row, Col} from 'antd';
import Link from 'next/link';
import PropTypes from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';
import styled from 'styled-components';
import {MdSend} from "react-icons/md";

import {
    ADD_COMMENT_REQUEST,
    LIKE_POST_REQUEST,
    LOAD_COMMENTS_REQUEST, REMOVE_POST_REQUEST,
    RETWEET_REQUEST,
    UNLIKE_POST_REQUEST,
} from '../reducers/post';
import PostImages from '../components/PostImages';
import PostCardContent from '../components/PostCardContent';
import EditForm from "../components/EditForm";
import TextareaAutosize from "react-textarea-autosize";
import Send from "../components/Send";

const CardWrapper = styled.div`
  margin-bottom: 20px;
`;
// <Button onClick={showModal}>수정</Button>
// <Button type="danger" onClick={onRemovePost(post.id)}>삭제</Button>
// <Modal footer={null} bodyStyle={{padding:'0px', zIndex:1}} title='게시글 수정' visible={visible} onOk={handelOk} onCancel={handleCancel}>
//     <EditForm postId={post.id}/>
// </Modal>

const PostCard = ({post}) => {
    const [commentFormOpened, setCommentFormOpened] = useState(false);
    const [commentText, setCommentText] = useState('');
    const {me} = useSelector(state => state.user);
    const {commentAdded, isAddingComment,editImagePaths} = useSelector(state => state.post);
    const dispatch = useDispatch();

    const [visible, setVisible] = useState(false);
    const showModal = () => {
        setVisible(true);
    };
    const handelOk = () => {
        setVisible(false);
    };
    const handleCancel = () => {
        setVisible(false);
    };

    const liked = me && post.Likers && post.Likers.find(v => v.id === me.id);

    const onToggleComment = useCallback(() => {
        setCommentFormOpened(prev => !prev);
        if (!commentFormOpened) {
            dispatch({
                type: LOAD_COMMENTS_REQUEST,
                data: post.id,
            });
        }
    }, []);


    const onSubmitComment = useCallback((e) => {
        e.preventDefault();
        console.log('댓글작성');
        if (!me) {
            return alert('로그인이 필요합니다.');
        }
        return dispatch({
            type: ADD_COMMENT_REQUEST,
            data: {
                postId: post.id,
                content: commentText,
            },
        });
    }, [me && me.id, commentText]);

    useEffect(() => {
        setCommentText('');
    }, [commentAdded === true]);

    const onChangeCommentText = useCallback((e) => {
        setCommentText(e.target.value);
    }, []);

    const onToggleLike = useCallback(() => {
        if (!me) {
            return alert('로그인이 필요합니다!');
        }
        if (liked) { // 좋아요 누른 상태
            dispatch({
                type: UNLIKE_POST_REQUEST,
                data: post.id,
            });
        } else { // 좋아요 안 누른 상태
            dispatch({
                type: LIKE_POST_REQUEST,
                data: post.id,
            });
        }
    }, [me && me.id, post && post.id, liked]);

    const onRetweet = useCallback(() => {
        if (!me) {
            return alert('로그인이 필요합니다.');
        }
        return dispatch({
            type: RETWEET_REQUEST,
            data: post.id,
        });
    }, [me && me.id, post && post.id]);

    const onRemovePost = useCallback(userId => () => {
        const result = confirm('정말로 삭제하시겠습니까?');
        if (!result) {

        } else {
            dispatch({
                type: REMOVE_POST_REQUEST,
                data: userId,
            });
        }
    });

    const menu1 = (
        <Menu>
            <Menu.Item>
                <a target='_blank' rel='noreferrer' onClick={showModal}>수정</a>
            </Menu.Item>
            <Menu.Item>
                <a target='_blank' rel='noreferrer' onClick={onRemovePost(post.id)}>삭제</a>
            </Menu.Item>
        </Menu>
    );

    const menu2 = (
        <Menu>
            <Menu.Item>
                신고
            </Menu.Item>
            <Menu.Item>
                채팅
            </Menu.Item>
        </Menu>
    );

    return (
        <CardWrapper>
            <Card
                cover={post.Images && post.Images[0] && <PostImages images={post.Images}/>}
                actions={[
                    <Icon type="retweet" key="retweet" onClick={onRetweet}/>,
                    <Icon
                        type="heart"
                        key="heart"
                        theme={liked ? 'twoTone' : 'outlined'}
                        twoToneColor="#eb2f96"
                        onClick={onToggleLike}
                    />,
                    <Icon type="message" key="message" onClick={onToggleComment}/>,
                    <>
                        {me && post.UserId === me.id
                            ? (
                                <Dropdown overlay={menu1} placement="topRight">
                                    <Icon type='ellipsis'/>
                                </Dropdown>
                            )
                            : (
                                <Dropdown overlay={menu2} placement="topRight">
                                    <Icon type='ellipsis'/>
                                </Dropdown>
                            )}
                    </>,
                ]}
                title={post.RetweetId ? `${post.User.nickname}님이 글을 공유하였습니다.` : null}
            >
                {post.RetweetId && post.Retweet
                    ? (
                        <Card
                            cover={post.Retweet.Images[0] && <PostImages images={post.Retweet.Images}/>}
                        >
                            <Card.Meta
                                avatar={(
                                    <Link
                                        href={{pathname: '/user', query: {id: post.Retweet.User.id}}}
                                        as={`/user/${post.Retweet.User.id}`}
                                    >
                                        <a><Avatar>{post.Retweet.User.nickname[0]}</Avatar></a>
                                    </Link>
                                )}
                                title={post.Retweet.User.nickname}
                                description={
                                    <PostCardContent
                                        likers={post.Likers ? post.Likers.length : 0}
                                        commentN={post.Comments ? post.Comments.length : 0}
                                        postData={post.Retweet.content}
                                    />
                                } // a tag x -> Link
                            />
                        </Card>
                    )
                    : (
                        <Card.Meta
                            avatar={post.User.id
                                ? (
                                <Link href={{pathname: '/user', query: {id: post.User.id}}}
                                      as={`/user/${post.User.id}`}>
                                    <a><Avatar>{post.User.nickname[0]}</Avatar></a>
                                </Link>
                            ) :(<>
                                </>)
                            }
                            title={post.User.nickname}
                            description={
                                <PostCardContent
                                    likers={post.Likers ? post.Likers.length : 0}
                                    commentN={post.Comments ? post.Comments.length : 0}
                                    postData={post.content}
                                />
                            } // a tag x -> Link
                            loading={true}
                        />
                    )}
            </Card>
            {commentFormOpened && (
                <>
                    <List
                        itemLayout="horizontal"
                        style={{background: 'white', border: '1px solid #e6e6e6', paddingBottom:'0px'}}
                        dataSource={post.Comments || []}
                        renderItem={item => (
                            <List.Item
                                actions={[<a key="edit">수정</a>, <a key="delete">삭제</a>]}
                            >
                                <List.Item.Meta
                                    avatar={(
                                        <Link href={{pathname: '/user', query: {id: item.User.id}}}
                                              as={`/user/${item.User.id}`}>
                                            <a><Avatar>{item.User.nickname[0]}</Avatar></a>
                                        </Link>
                                    )}
                                    title={
                                        <Link href={{pathname: '/user', query: {id: item.User.id}}}
                                              as={`/user/${item.User.id}`}>
                                            <a href="https://ant.design">{item.User.nickname}</a>
                                        </Link>
                                    }
                                    description={item.content}
                                />
                            </List.Item>
                        )}
                    />
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
                </>
            )}
            <Modal footer={null} bodyStyle={{padding: '0px', zIndex: 1}} title='게시글 수정' visible={visible}
                   onOk={handelOk} onCancel={handleCancel}>
                <EditForm postId={post.id} postContent={post.content} postImages={post.Images} setVisible={setVisible} visible={visible}/>
            </Modal>
        </CardWrapper>
    );
};

PostCard.propTypes = {
    post: PropTypes.shape({
        User: PropTypes.object,
        content: PropTypes.string,
        img: PropTypes.string,
        createdAt: PropTypes.string,
    }).isRequired,
};

export default PostCard;