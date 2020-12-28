import React, { useCallback, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FOLLOW_USER_REQUEST, UNFOLLOW_USER_REQUEST } from "../reducers/user";
import Link from 'next/link';
import ProfileAvatar from "./profiles/ProfileAvatar";
import { Button, Card } from 'antd';

const UserProfile = () => {
    const dispatch = useDispatch();
    const { me, userInfo } = useSelector(state => state.user);
    const onFollow = useCallback(userId => () => {
        dispatch({
            type: FOLLOW_USER_REQUEST,
            data: userId,
        });
    }, []);

    const onUnfollow = useCallback(userId => () => {
        dispatch({
            type: UNFOLLOW_USER_REQUEST,
            data: userId,
        });
    }, []);

    const cardWrapper = useMemo(() => ({ marginLeft: '10px', minWidth: '220px', minHeight: '140px', float: 'right' }), []);

    return (
        <>
            {userInfo ?
                <Card style={cardWrapper}
                    actions={[
                        <Link href="/profile" key="twit">
                            <a>
                                <div>게시물<br />{userInfo.Posts.length}</div>
                            </a>
                        </Link>,
                        <Link href="/profile" key="following">
                            <a>
                                <div>팔로잉<br />{userInfo.Followings.length}</div>
                            </a>
                        </Link>,
                        <Link href="/profile" key="follower">
                            <a>
                                <div>팔로워<br />{userInfo.Followers.length}</div>
                            </a>
                        </Link>,
                    ]}
                >
                    <Card.Meta
                        avatar={userInfo.Image ?
                            <ProfileAvatar nickname={userInfo.nickname} imagePath={userInfo.Image.src} />
                            :
                            <ProfileAvatar nickname={userInfo.nickname} />
                        }
                        title={!userInfo || me.id === userInfo.id
                            ? <>{userInfo.nickname}</>
                            : me.Followings && me.Followings.find(v => v.id === userInfo.id)
                                ?
                                <>{userInfo.nickname}<br />
                                    <Button size='small' onClick={onUnfollow(userInfo.id)}>언팔로우</Button>
                                </>
                                :
                                <>{userInfo.nickname}<br />
                                    <Button size='small' onClick={onFollow(userInfo.id)}>팔로우</Button>
                                </>
                        }
                    />
                </Card>
                :
                <></>
            }
        </>
    );
};

export default UserProfile;