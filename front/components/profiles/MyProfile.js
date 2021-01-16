import React, { useCallback, useMemo } from 'react';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { FOLLOW_USER_REQUEST, UNFOLLOW_USER_REQUEST } from "../../reducers/user";
import { Button, Card } from 'antd';
import ProfileAvatar from "./ProfileAvatar";

const MyProfile = ({ target }) => {
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

    const cardWrapper = useMemo(() => ({  width: '255px',}), []);

    return (
        <>
            {target ?
                <div>
                    <Card
                        style={cardWrapper}
                        actions={[
                            <Link href="/profile" key="twit">
                                <a>
                                    <div>게시물
                                    <br />
                                        {target.Posts.length}
                                    </div>
                                </a>
                            </Link>,
                            <Link href="/profile" key="following">
                                <a>
                                    <div>팔로잉
                                    <br />
                                        {target.Followings.length}
                                    </div>
                                </a>
                            </Link>,
                            <Link href="/profile" key="follower">
                                <a>
                                    <div>팔로워
                                    <br />
                                        {target.Followers.length}
                                    </div>
                                </a>
                            </Link>,
                        ]}
                    >
                        <Card.Meta
                            avatar={target.Image ?
                                <ProfileAvatar nickname={target.nickname} imagePath={target.Image.src} />
                                :
                                <ProfileAvatar nickname={target.nickname} />
                            }
                            title={!target || me.id === target.id
                                ? <>{target.nickname}</>
                                : target.Followers && target.Followers.find(v => v.id === me.id)
                                    ?
                                    <>{target.nickname}<br />
                                        <Button size='small' onClick={onUnfollow(target.id)}>언팔로우</Button>
                                    </>
                                    :
                                    <>{target.nickname}<br />
                                        <Button size='small' onClick={onFollow(target.id)}>팔로우</Button>
                                    </>
                            }
                        />
                    </Card>
                </div>
                :
                <></>
            }
        </>
    );
};

export default MyProfile;