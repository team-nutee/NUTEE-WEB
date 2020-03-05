import React, {useCallback} from 'react';
import {Avatar, Button, Card, Col, List} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {
    LOAD_FOLLOWERS_REQUEST,
    LOAD_FOLLOWINGS_REQUEST,
    REMOVE_FOLLOWER_REQUEST,
    UNFOLLOW_USER_REQUEST
} from "../reducers/user";
import Link from "next/link";
import ProfileAvatar from "./ProfileAvatar";

const RightProfile = ()=>{
    const dispatch = useDispatch();
    const {followingList, followerList, hasMoreFollower, hasMoreFollowing} = useSelector(state => state.user);

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

    return(
        <Col span={6} style={{minWidth: '270px'}}>
            <List
                style={{marginBottom: '20px', backgroundColor: 'WHITE'}}
                grid={{gutter: 4}}
                size="small"
                header={<div>팔로잉 목록</div>}
                loadMore={hasMoreFollowing &&
                <Button style={{width: '100%'}} onClick={loadMoreFollowings}>더 보기</Button>}
                bordered
                dataSource={followingList}
                renderItem={item => (
                    <List.Item style={{marginTop: '20px'}}>
                        <Card style={{margin: '0 auto'}} actions={[<a onClick={onUnfollow(item.id)}>팔로우 취소</a>]}>
                            <Link
                                href={{pathname: '/user', query: {id: item.id}}}
                                as={`/user/${item.id}`}
                            >
                                <a>
                                    {item.Image ?
                                        <ProfileAvatar nickname={item.nickname} imagePath={item.Image.src}/>
                                        :
                                        <ProfileAvatar nickname={item.nickname}/>
                                    }
                                </a>
                            </Link>
                            <h2 style={{
                                display: 'inline-block',
                                fontSize: '15px',
                                paddingTop: '3px'
                            }}>{item.nickname}</h2>
                        </Card>
                    </List.Item>
                )}
            />
            <List
                style={{marginBottom: '20px', backgroundColor: 'white'}}
                grid={{gutter: 2}}
                size="small"
                header={<div>팔로워 목록</div>}
                loadMore={hasMoreFollower &&
                <Button style={{width: '100%'}} onClick={loadMoreFollowers}>더 보기</Button>}
                bordered
                dataSource={followerList}
                renderItem={item => (
                    <List.Item style={{marginTop: '20px'}}>
                        <Card actions={[<a onClick={onRemoveFollower(item.id)}>팔로워 차단</a>]}>
                            <Avatar size='large' style={{margin: '0px 5px 0px 0px'}}>
                                {item.nickname[0]}
                            </Avatar>
                            <h2 style={{
                                display: 'inline-block',
                                fontSize: '15px',
                                paddingTop: '3px'
                            }}>{item.nickname}</h2>
                        </Card>
                    </List.Item>
                )}
            />
        </Col>
    )
};
export default RightProfile;