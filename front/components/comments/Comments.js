import React, { useCallback, useState, useMemo } from 'react';
import { List } from 'antd';
import Link from "next/link";
import { useDispatch } from "react-redux";
import { REMOVE_COMMENT_REQUEST } from "../../reducers/post";
import { DeleteFilled, EditOutlined, MessageOutlined } from "@ant-design/icons";
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

    const listWrapper = useMemo(() => ({ fontFamily: "NanumBarunGothic", marginLeft: '-15px', marginBottom: '-15px', border: 'none' }), []);
    const contentWrapper = useMemo(() => ({  marginTop: '5px', wordWrap: 'break-word', whiteSpace: 'pre-wrap', wordBreak: 'break-all', }), []);
    const nicknameWrapper = useMemo(() => ({ marginRight: '10px' }), []);
    const iconWrapper = useMemo(() => ({ color: '#005000' }), []);
    const commentWrapper = useMemo(() => ({ fontFamily: "Nanum Barun Gothic", }), []);


    return (
        <div style={commentWrapper}>
            <List.Item
                style={listWrapper}
                actions={!edit ? [<a key="reComment" onClick={onReply}><MessageOutlined style={iconWrapper} /></a>,
                <a key="edit" onClick={onEdit}><EditOutlined style={iconWrapper} /></a>, //수정 아이콘 내 댓글 아니면 안 보이도록
                <a key="delete" onClick={onRemove(post, item)}><DeleteFilled style={iconWrapper} /></a>] : <></>}
            >{item === null ?
                <></>
                :
                <List.Item.Meta
                    avatar={(
                        /* 댓글 usericon */
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
                                <pre style={contentWrapper}>
                                    <Link href={{ pathname: '/user', query: { id: item.User.id } }} as={`/user/${item.User.id}`}>
                                        <a style={nicknameWrapper}>{item.User.nickname}</a>
                                    </Link>
                                    {item.content}
                                </pre>
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
                    div {
                        font-family: "Nanum Barun Gothic", sans-serif, ;
                        font-weight: 200;
                    }
                   `
                }
            </style>
        </div>
    )
};

export default Comments;