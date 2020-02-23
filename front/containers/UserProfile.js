import { Avatar, Button, Card } from 'antd';
import React, { useCallback } from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux';

const UserProfile = () => {
    const { me } = useSelector(state => state.user);

    return (
        <Card style={{marginLeft:'10px', minWidth:'220px', minHeight:'140px', float:'right'}}
            actions={[
                <Link href="/profile" key="twit">
                    <a>
                        <div>게시물<br />{me.Posts.length}</div>
                    </a>
                </Link>,
                <Link href="/profile" key="following">
                    <a>
                        <div>팔로잉<br />{me.Followings.length}</div>
                    </a>
                </Link>,
                <Link href="/profile" key="follower">
                    <a>
                        <div>팔로워<br />{me.Followers.length}</div>
                    </a>
                </Link>,
            ]}
        >
            <Card.Meta
                avatar={<Avatar>{me.nickname[0]}</Avatar>}
                title={me.nickname}
            />
        </Card>
    );
};

export default UserProfile;