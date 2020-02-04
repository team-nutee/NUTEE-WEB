import React from 'react';
import { Col } from 'antd';
import { useSelector} from 'react-redux';
import {
    LOAD_FOLLOWERS_REQUEST,
    LOAD_FOLLOWINGS_REQUEST,
} from '../reducers/user';
import {LOAD_USER_POSTS_REQUEST} from '../reducers/post';
import PostCard from '../containers/PostCard';
import LeftProfile from "../components/LeftProfile";
import RightProfile from "../components/RightProfile";

const Profile = () => {
    const {mainPosts} = useSelector(state => state.post);

    return (
        <>
            <LeftProfile span={4}/>
            <Col span={10}>
                <div>
                    {mainPosts.map(c => (
                        <PostCard key={+c.createdAt} post={c}/>
                    ))}
                </div>
            </Col>
            <RightProfile/>
        </>
    );
};

Profile.getInitialProps = async (context) => {
    const state = context.store.getState();
    // 이 직전에 LOAD_USERS_REQUEST
    context.store.dispatch({
        type: LOAD_FOLLOWERS_REQUEST,
        data: state.user.me && state.user.me.id,
    });
    context.store.dispatch({
        type: LOAD_FOLLOWINGS_REQUEST,
        data: state.user.me && state.user.me.id,
    });
    context.store.dispatch({
        type: LOAD_USER_POSTS_REQUEST,
        data: state.user.me && state.user.me.id,
    });

    // 이 쯤에서 LOAD_USERS_SUCCESS 돼서 me가 생김.
};

export default Profile;