import React, { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from "react-redux";
import {
    LOAD_FOLLOWERS_REQUEST,
    LOAD_FOLLOWINGS_REQUEST,
    REMOVE_FOLLOWER_REQUEST,
    UNFOLLOW_USER_REQUEST
} from "../../reducers/user";
import Link from "next/link";
import { Avatar, Button, Card, Col, List } from "antd";
import styled from "styled-components";
import MyProfile from "./MyProfile";
import ProfileAvatar from "./ProfileAvatar";
import ProfileEditModal from "./ProfileEditModal";
import PwEditModal from "./PwEditModal";

const Box = styled.div`
    position: sticky;
    margin : auto 0;
    top: 50px;
    height: 93vh;
    overflow: scroll;
    ::-webkit-scrollbar {
       display: none;
    }
`;

const LeftProfile = ({ span }) => {
    const { me } = useSelector(state => state.user);
    const dispatch = useDispatch();
    const { followingList, followerList, hasMoreFollower, hasMoreFollowing } = useSelector(state => state.user);

    const onUnfollow = useCallback(userId => () => {
        dispatch({
            type: UNFOLLOW_USER_REQUEST,
            data: userId,
        });
    }, []);

    const onRemoveFollower = useCallback(userId => () => {
        dispatch({
            type: REMOVE_FOLLOWER_REQUEST,
            data: userId,
        });
    }, []);

    const loadMoreFollowings = useCallback(() => {
        dispatch({
            type: LOAD_FOLLOWINGS_REQUEST,
            offset: followingList.length,
        });
    }, [followingList.length]);

    const loadMoreFollowers = useCallback(() => {
        dispatch({
            type: LOAD_FOLLOWERS_REQUEST,
            offset: followerList.length,
        });
    }, [followerList.length]);

    const listWrapper = useMemo(() => ({ marginBottom: '20px', backgroundColor: 'WHITE' }), []);
    const listButtonWrapper = useMemo(() => ({ width: '100%' }), []);
    const listItemWrapper = useMemo(() => ({ marginTop: '20px' }), []);
    const listCardWrapper = useMemo(() => ({ margin: '0 auto' }), []);
    const listCardH2Wrapper = useMemo(() => ({ display: 'inline-block', fontSize: '15px', paddingTop: '3px' }), []);
    const listCardAvatarWrapper = useMemo(() => ({ margin: '0px 5px 0px 0px' }), []);

    return (
        <Col span={span}>
            <Box>
                {me
                    ?
                    <>
                        <MyProfile target={me} />
                        <ProfileEditModal />
                        <PwEditModal />
                        <List
                            style={listWrapper}
                            grid={{ gutter: 4 }}
                            size="small"
                            header={<div>팔로잉 목록</div>}
                            loadMore={hasMoreFollowing &&
                                <Button style={listButtonWrapper} onClick={loadMoreFollowings}>더 보기</Button>}
                            bordered
                            dataSource={followingList}
                            renderItem={item => (
                                <List.Item style={listItemWrapper}>
                                    <Card style={listCardWrapper} actions={[<a onClick={onUnfollow(item.id)}>팔로우 취소</a>]}>
                                        <Link
                                            href={{ pathname: '/user', query: { id: item.id } }}
                                            as={`/user/${item.id}`}
                                        >
                                            <a>
                                                {item.Image ?
                                                    <ProfileAvatar nickname={item.nickname} imagePath={item.Image.src} />
                                                    :
                                                    <ProfileAvatar nickname={item.nickname} />
                                                }
                                            </a>
                                        </Link>
                                        <h2 style={listCardH2Wrapper}>{item.nickname}</h2>
                                    </Card>
                                </List.Item>
                            )}
                        />
                        <List
                            style={listWrapper}
                            grid={{ gutter: 2 }}
                            size="small"
                            header={<div>팔로워 목록</div>}
                            loadMore={hasMoreFollower &&
                                <Button style={{ listButtonWrapper }} onClick={loadMoreFollowers}>더 보기</Button>}
                            bordered
                            dataSource={followerList}
                            renderItem={item => (
                                <List.Item style={{ listItemWrapper }}>
                                    <Card actions={[<a onClick={onRemoveFollower(item.id)}>팔로워 차단</a>]}>
                                        <Avatar size='large' style={listCardAvatarWrapper}>
                                            {item.nickname[0]}
                                        </Avatar>
                                        <h2 style={listCardH2Wrapper}>{item.nickname}</h2>
                                    </Card>
                                </List.Item>
                            )}
                        />
                    </>
                    :
                    <></>
                }

            </Box>
        </Col>
    );
};
export default LeftProfile;