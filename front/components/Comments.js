import React, {useCallback, useState} from 'react';
import {Avatar, Icon, List} from "antd";
import Link from "next/link";
import EditCommentForm from "./EditCommentForm";
import {useDispatch} from "react-redux";
import {REMOVE_COMMENT_REQUEST, REMOVE_POST_REQUEST} from "../reducers/post";
import ProfileAvatar from "./ProfileAvatar";

const Comments = ({item, post}) => {
    const dispatch = useDispatch();
    const [edit, setEdit] = useState(false);
    const onEdit = () => {
        setEdit(true);
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
        <List.Item
            actions={!edit ? [<a key="edit" onClick={onEdit}>수정</a>,
                <a key="delete" onClick={onRemove(post, item)}>삭제</a>] : <></>}
        >{item===null?
        <></>
            :
            <List.Item.Meta
                avatar={(
                    <Link
                        href={{pathname: '/user', query: {id: item.User.id}}}
                        as={`/user/${item.User.id}`}
                    >
                        <a>
                            {item.User.Image?
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
    )
};

export default Comments;