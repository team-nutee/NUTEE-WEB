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

    const listWrapper = useMemo(() => ({ border: 'none', marginBottom: '-10px', paddingLeft: '10px' }), []);
    const contentWrapper = useMemo(() => ({  marginTop: '5px', wordWrap: 'break-word', whiteSpace: 'pre-wrap', wordBreak: 'break-all', }), []);
    const nicknameWrapper = useMemo(() => ({ marginRight: '10px' }), []);

    return (
        <List.Item
            style={listWrapper}
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
                            <pre style={contentWrapper}>
                                <Link href={{ pathname: '/user', query: { id: item.User.id } }} as={`/user/${item.User.id}`}>
                                    <a style={nicknameWrapper}>{item.User.nickname}</a>
                                </Link>
                                {item.content}
                            </pre>
                }
            />
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
        </List.Item>
    )
};

export default Recomment;