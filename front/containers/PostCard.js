import React, { useCallback, useEffect, useState } from 'react';
import {Avatar, Button, Card, Comment, Form, Icon, Input, List, Modal, Popover} from 'antd';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

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

const CardWrapper = styled.div`
  margin-bottom: 20px;
`;

const PostCard = ({ post }) => {
    const [commentFormOpened, setCommentFormOpened] = useState(false);
    const [commentText, setCommentText] = useState('');
    const { me } = useSelector(state => state.user);
    const { commentAdded, isAddingComment } = useSelector(state => state.post);
    const dispatch = useDispatch();

    const [visible,setVisible] = useState(false);
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
        dispatch({
            type: REMOVE_POST_REQUEST,
            data: userId,
        });
    });

    const onUpdatePost = useCallback()

    return (
        <CardWrapper>
            <Card
                cover={post.Images && post.Images[0] && <PostImages images={post.Images} />}
                actions={[
                    <Icon type="retweet" key="retweet" onClick={onRetweet} />,
                    <Icon
                        type="heart"
                        key="heart"
                        theme={liked ? 'twoTone' : 'outlined'}
                        twoToneColor="#eb2f96"
                        onClick={onToggleLike}
                    />,
                    <Icon type="message" key="message" onClick={onToggleComment} />,
                    <Popover
                        key="ellipsis"
                        content={(
                            <Button.Group>
                                {me && post.UserId === me.id
                                    ? (
                                        <>
                                            <Button onClick={showModal}>수정</Button>
                                            <Button type="danger" onClick={onRemovePost(post.id)}>삭제</Button>
                                            <Modal footer={null} bodyStyle={{padding:'0px', zIndex:1}} title='게시글 수정' visible={visible} onOk={handelOk} onCancel={handleCancel}>
                                                <EditForm postId={post.id}/>
                                            </Modal>
                                        </>
                                    )
                                    : <><Button>신고</Button><Button>채팅</Button></>}
                            </Button.Group>
                        )}
                    >
                        <Icon type="ellipsis" />
                    </Popover>,
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
                                        likers={post.Likers?post.Likers.length:0}
                                        commentN={post.Comments?post.Comments.length:0}
                                        postData={post.Retweet.content}
                                    />
                                } // a tag x -> Link
                            />
                        </Card>
                    )
                    : (
                        <Card.Meta
                            avatar={(
                                <Link href={{ pathname: '/user', query: { id: post.User.id } }} as={`/user/${post.User.id}`}>
                                    <a><Avatar>{post.User.nickname[0]}</Avatar></a>
                                </Link>
                            )}
                            title={post.User.nickname}
                            description={
                                <PostCardContent
                                    likers={post.Likers?post.Likers.length:0}
                                    commentN={post.Comments?post.Comments.length:0}
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
                        dataSource={post.Comments || []}
                        renderItem={item => (
                            <li style={{listStyle:'none'}}>
                                <Comment
                                    author={item.User.nickname}
                                    avatar={(
                                        <Link href={{ pathname: '/user', query: { id: item.User.id } }} as={`/user/${item.User.id}`}>
                                            <a><Avatar>{item.User.nickname[0]}</Avatar></a>
                                        </Link>
                                    )}
                                    content={item.content}
                                />
                            </li>
                        )}
                    />
                    <Form onSubmit={onSubmitComment}>
                        <Form.Item>
                            <Input.TextArea rows={4} value={commentText} onChange={onChangeCommentText} />
                        </Form.Item>
                        <Button type="primary" htmlType="submit" loading={isAddingComment}>작성</Button>
                    </Form>
                </>
            )}
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