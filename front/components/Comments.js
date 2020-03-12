import React, {useCallback, useState} from 'react';
import {Avatar, Icon, List} from 'antd';
import Link from "next/link";
import EditCommentForm from "./EditCommentForm";
import {useDispatch} from "react-redux";
import {REMOVE_COMMENT_REQUEST, REMOVE_POST_REQUEST} from "../reducers/post";
import ProfileAvatar from "./ProfileAvatar";
import Recomment from "./Recomment";
import DeleteFilled from "@ant-design/icons/lib/icons/DeleteFilled";
import EditOutlined from "@ant-design/icons/lib/icons/EditOutlined";
import MessageTwoTone from "@ant-design/icons/lib/icons/MessageTwoTone";
import ReCommentForm from "./ReCommentForm";
import {LOAD_FOLLOWINGS_FAILURE, LOAD_FOLLOWINGS_REQUEST, LOAD_FOLLOWINGS_SUCCESS} from "../reducers/user";
import RecommentBox from "./RecommentBox";

const Comments = ({item, post}) => {
    const dispatch = useDispatch();
    const [edit, setEdit] = useState(false);
    const [reply,setReply] = useState(false);
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
    return (
        <>
            <List.Item
                style={{marginLeft:'-15px',marginBottom:'-15px', border:'none'}}
                actions={!edit ? [<a key="reComment" onClick={onReply}><MessageTwoTone /></a>,
                    <a key="edit" onClick={onEdit}><EditOutlined /></a>,
                    <a key="delete" onClick={onRemove(post, item)}><DeleteFilled /></a>] : <></>}
            >{item===null ?
                <></>
                :
                <List.Item.Meta
                    avatar={(
                        <Link
                            href={{pathname: '/user', query: {id: item.User.id}}}
                            as={`/user/${item.User.id}`}
                        >
                            <a>
                                {item.User.Image ?
                                    <ProfileAvatar nickname={item.User.nickname} imagePath={item.User.Image.src}/>
                                    :
                                    <ProfileAvatar nickname={item.User.nickname}/>
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
                            <div style={{marginTop: '5px'}}>
                            <pre style={{
                                wordWrap: 'break-word',
                                whiteSpace: 'pre-wrap',
                                wordBreak: 'break-all',
                            }}><Link href={{pathname: '/user', query: {id: item.User.id}}}
                                     as={`/user/${item.User.id}`}>
                                <a style={{marginRight: '10px'}}>{item.User.nickname}</a>
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
            {reply?
                <ReCommentForm cancelReply={cancelReply} post={post} commentId={item.id}/>
                :
                <></>
            }
        </>
    )
};

export default Comments;