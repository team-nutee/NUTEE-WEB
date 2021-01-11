import React, { useState, useMemo } from 'react';
import { useDispatch } from "react-redux";
import { REMOVE_COMMENT_REQUEST } from "../../reducers/post";
import { List } from "antd";
import Link from "next/link";
import ProfileAvatar from "../profiles/ProfileAvatar";
import EditCommentForm from "./EditCommentForm";
import { EditOutlined, DeleteFilled } from "@ant-design/icons";

const Recomment = ({ item, post }) => {
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

    const listItemWrapper = useMemo(() => ({ border: 'none', marginBottom: '-10px', paddingLeft: '10px' }), []);
    const divWrapper = useMemo(() => ({ marginTop: '5px' }), []);
    const preWrapper = useMemo(() => ({ wordWrap: 'break-word', whiteSpace: 'pre-wrap', wordBreak: 'break-all' }), []);

    return (
        <List.Item
            style={listItemWrapper}
            actions={!edit ? [<a key="edit" onClick={onEdit}><EditOutlined /></a>,
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
                        <div style={divWrapper}>
                            <pre style={preWrapper}>
                                <Link href={{ pathname: '/user', query: { id: item.User.id } }}
                                    as={`/user/${item.User.id}`}>
                                    <a style={{ marginRight: '10px' }}>{item.User.nickname}</a>
                                </Link>
                                {item.content}</pre>
                        </div>
                }
            />
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
        </List.Item>
    )
};

export default Recomment;