import React, { useCallback, useState, useMemo } from 'react';
import { List } from 'antd';
import Link from "next/link";
import { useDispatch } from "react-redux";
import { REMOVE_COMMENT_REQUEST } from "../../reducers/post";
import { DeleteFilled, EditOutlined, MessageTwoTone } from "@ant-design/icons";
import EditCommentForm from "./EditCommentForm";
import ProfileAvatar from "../profiles/ProfileAvatar";
import ReCommentForm from "./ReCommentForm";
import RecommentBox from "./RecommentBox";

const Comments = ({ item, post }) => {
    const dispatch = useDispatch();
    const [edit, setEdit] = useState(false);
    const [reply, setReply] = useState(false);
    const onEdit = () => {
        setEdit(true);
    };
    const onReply = () => {
        setReply(true);
    };
    const cancelReply = () => {
        setReply(false);
    };
    const onRemove = (post, item) => () => {
        const result = confirm('정말로 삭제하시겠습니까?');
        if (!result) {

        } else {
            dispatch({
                type: REMOVE_COMMENT_REQUEST,
                data: {
                    postId: post.id,
                    commentId: item.id,
                }
            });
        }
    };

    const listItemWrapper = useMemo(() => ({ marginLeft: '-15px', marginBottom: '-15px', border: 'none' }), []);
    const listItemMetaDivWrapper = useMemo(() => ({ marginTop: '5px' }), []);
    const listItemMetaPreWrapper = useMemo(() => ({ wordWrap: 'break-word', whiteSpace: 'pre-wrap', wordBreak: 'break-all', }), []);
    const listItemMetaPreAWrapper = useMemo(() => ({ marginRight: '10px' }), []);

    return (
        <>
            <List.Item
                style={listItemWrapper}
                actions={!edit ? [<a key="reComment" onClick={onReply}><MessageTwoTone /></a>,
                <a key="edit" onClick={onEdit}><EditOutlined /></a>,
                <a key="delete" onClick={onRemove(post, item)}><DeleteFilled /></a>] : <></>}
            >{item === null ?
                <></>
                :
                <List.Item.Meta
                    avatar={(
                        <Link
                            href={{ pathname: '/user', query: { id: item.User.id } }}
                            as={`/user/${item.User.id}`}
                        >
                            <a>
                                {item.User.Image ?
                                    <ProfileAvatar nickname={item.User.nickname} imagePath={item.User.Image.src} />
                                    :
                                    <ProfileAvatar nickname={item.User.nickname} />
                                }
                            </a>
                        </Link>
                    )}
                    description={
                        edit
                            ?
                            <EditCommentForm
                                comment={item}
                                edit={edit}
                                setEdit={setEdit}
                                postId={post.id}
                            />
                            :
                            <div style={listItemMetaDivWrapper}>
                                <pre style={listItemMetaPreWrapper}><Link href={{ pathname: '/user', query: { id: item.User.id } }}
                                    as={`/user/${item.User.id}`}>
                                    <a style={listItemMetaPreAWrapper}>{item.User.nickname}</a>
                                </Link>
                                    {item.content}</pre>
                            </div>
                    }
                />
                }
            </List.Item>
            {item.ReComment
                ?
                <RecommentBox reCom={item.ReComment} post={post} onReply={onReply} />
                :
                <></>
            }
            {reply ?
                <ReCommentForm cancelReply={cancelReply} post={post} commentId={item.id} />
                :
                <></>
            }
            <style jsx>
                {
                    `
                    pre {
                        font-family:"Do Hyeon", sans-serif;
                        font-weight: 200;
                    }
                   `
                }
            </style>
        </>
    )
};

export default Comments;