import React, {useCallback, useEffect, useState} from 'react';
import { Button, Card, Icon, Input, List, Modal, Tag, Dropdown, Menu, Row, Col,Alert} from 'antd';
import Link from 'next/link';
import PropTypes from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';
import styled from 'styled-components';
import {
    ADD_COMMENT_REQUEST,
    LIKE_POST_REQUEST,
    LOAD_COMMENTS_REQUEST, REMOVE_POST_REQUEST, REPORT_REQUEST,
    RETWEET_REQUEST,
    UNLIKE_POST_REQUEST,
} from '../reducers/post';
import PostImages from '../components/PostImages';
import PostCardContent from '../components/PostCardContent';
import EditForm from "../components/EditForm";
import Comments from "../components/Comments";
import CommentForm from "../components/CommentForm";
import ProfileAvatar from "../components/ProfileAvatar";

const CardWrapper = styled.div`
  margin-bottom: 20px;
`;

const PostCard = ({post}) => {
    const [commentFormOpened, setCommentFormOpened] = useState(false);
    const [commentText, setCommentText] = useState('');
    const {me} = useSelector(state => state.user);
    const {commentAdded, isAddingComment} = useSelector(state => state.post);
    const dispatch = useDispatch();

    const [visible, setVisible] = useState(false);
    const [report,setReport] = useState('');
    const [reportVisible, setReportVisible] = useState(false);

    const [offset,setOffset] = useState(0);
    const { mainPosts } = useSelector(state => state.post);

    const showModal = () => {
        setVisible(true);
    };
    const handelOk = () => {
        setVisible(false);
    };
    const handleCancel = () => {
        setVisible(false);
    };
    const reportCancel = () => {
        setReport('');
        setReportVisible(false);
    };

    const liked = me && post.Likers && post.Likers.find(v => v.id === me.id);

    const onToggleComment = useCallback(() => {
        setCommentFormOpened(prev => !prev);
        if (!commentFormOpened) {
            dispatch({
                type: LOAD_COMMENTS_REQUEST,
                data: {
                    postId:post.id,
                    offset:offset,
                },
            });
            setOffset(offset+5);
        }
    }, []);

    const onLoadMoreComments = () => {
        dispatch({
            type: LOAD_COMMENTS_REQUEST,
            data: {
                postId:post.id,
                offset:offset,
            },
        });
        setOffset(offset+5);
    };

    const loadMore =
        (mainPosts[mainPosts.findIndex(v => v.id === post.id)].Comments &&
            mainPosts[mainPosts.findIndex(v => v.id === post.id)].Comments.length !== 0)&&
        mainPosts[mainPosts.findIndex(v => v.id === post.id)].Comments.length % 5 === 0 ? (
            <div style={{margin:'0px 0px 10px 30px',textAlign:'center'}}>
                <Tag color="cyan" onClick={onLoadMoreComments}>더보기</Tag>
            </div>
        ) : null;


    const onSubmitComment = useCallback((e) => {
        e.preventDefault();
        console.log('댓글작성');
        if (!me) {
            return <Alert
                message="로그인이 필요합니다."
                type="success"
                showIcon
            />;
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

    const onChangeReport = useCallback((e) => {
        setReport(e.target.value);
    }, []);

    const onToggleLike = useCallback(() => {
        if (!me) {
            return <Alert
                message="로그인이 필요합니다."
                type="success"
                showIcon
            />;
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
            return <Alert
                message="로그인이 필요합니다."
                type="success"
                showIcon
            />
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
    const onReport = useCallback(()=>{
        setReportVisible(true);
    });

    const onSubmitReport = useCallback(()=>{
        dispatch({
            type: REPORT_REQUEST,
            data: {
                postId : post.id,
                content : report,
            },
        });
        setReportVisible(false);
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
                <a onClick={onReport}>신고</a>
            </Menu.Item>
            <Menu.Item>
                채팅
            </Menu.Item>
        </Menu>
    );

    return (
        <CardWrapper>
            {post.isBlocked ? <Card style={{background: '#F6CED8', textAlign:'center'}}>다수 사용자의 신고로 인해 잠시 가려진 게시물입니다.</Card> :
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
                    title={post.RetweetId ?
                        <>
                            {post.User.Image ?
                                <ProfileAvatar nickname={post.User.nickname} imagePath={post.User.Image.src}/>
                                :
                                <ProfileAvatar nickname={post.User.nickname}/>
                            }
                            <a style={{margin: '0px 10px 0px 10px'}}>{post.User.nickname}</a>님이 글을 공유하였습니다.
                        </>
                        : null
                    }
                >
                    {post.RetweetId && post.Retweet
                        ? (
                            <Card
                                style={{marginBottom: '10px'}}
                                cover={post.Retweet.Images[0] && <PostImages images={post.Retweet.Images}/>}
                            >
                                <Card.Meta
                                    avatar={(
                                        <Link
                                            href={{pathname: '/user', query: {id: post.Retweet.User.id}}}
                                            as={`/user/${post.Retweet.User.id}`}
                                        >
                                            <a>
                                                {post.Retweet.User.Image ?
                                                    <ProfileAvatar nickname={post.Retweet.User.nickname}
                                                                   imagePath={post.Retweet.User.Image.src}/>
                                                    :
                                                    <ProfileAvatar nickname={post.Retweet.User.nickname}/>
                                                }
                                            </a>
                                        </Link>
                                    )}
                                    title={post.Retweet.User.nickname}
                                    description={
                                        <>
                                            <PostCardContent
                                                likers={post.Likers ? post.Likers.length : 0}
                                                commentN={post.Comments ? post.Comments.length : 0}
                                                postData={post.Retweet.content}
                                                retweet={1}
                                            />
                                            <h5 style={{
                                                position: 'absolute',
                                                right: '15px',
                                                bottom: '15px',
                                                fontSize: '12px'
                                            }}>댓글 {post.Retweet.Comments ? post.Retweet.Comments.length : 0}개
                                                좋아요 {post.Retweet.Likers ? post.Retweet.Likers.length : 0}개</h5>
                                        </>
                                    } // a tag x -> Link
                                />
                            </Card>
                        )
                        : (
                            <Card.Meta
                                avatar={post.UserId
                                    ? (
                                        <Link href={{pathname: '/user', query: {id: post.User.id}}}
                                              as={`/user/${post.User.id}`}>
                                            <a>
                                                {post.User.Image ?
                                                    <ProfileAvatar nickname={post.User.nickname}
                                                                   imagePath={post.User.Image.src}/>
                                                    :
                                                    <ProfileAvatar nickname={post.User.nickname}/>
                                                }
                                            </a>
                                        </Link>
                                    ) : (<>
                                    </>)
                                }
                                title={"hello"}
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
            }
            {commentFormOpened && (
                <>
                    <List
                        itemLayout="horizontal"
                        style={{background: 'white', border: '1px solid #e6e6e6', paddingBottom:'0px'}}
                        loadMore={loadMore}
                        dataSource={post.Comments || []}
                        renderItem={item => (
                            <Comments item={item} post={post} />
                        )}
                    />
                    <CommentForm
                        onSubmitComment={onSubmitComment}
                        commentText={commentText}
                        onChangeCommentText={onChangeCommentText}
                        isAddingComment={isAddingComment}
                    />
                </>
            )}
            <Modal footer={null} bodyStyle={{padding: '0px', zIndex: 1}} title='게시글 수정' visible={visible}
                   onOk={handelOk} onCancel={handleCancel}>
                <EditForm postId={post.id} postContent={post.content} postImages={post.Images} setVisible={setVisible} visible={visible}/>
            </Modal>
            <Modal
                title="게시물 신고"
                visible={reportVisible}
                onOk={onSubmitReport}
                onCancel={reportCancel}
                footer={null}
            >
                <div style={{width:'80%', margin:'0 auto'}}>
                    <br/>
                    <Row gutter={8}>
                        <Col span={18}>
                            <Input
                                prefix={<Icon type="message" style={{ color: 'rgba(0,0,0,.25)' }}/>}
                                placeholder='신고사유' value={report} required onChange={onChangeReport}
                            />
                        </Col>
                        <Col span={6}>
                            <Button onClick={onSubmitReport} >신고</Button>
                        </Col>
                    </Row>
                </div>
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