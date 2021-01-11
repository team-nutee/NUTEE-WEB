import React from 'react';
import { Col } from 'antd';
import { useSelector } from 'react-redux';
import {
    LOAD_FOLLOWERS_REQUEST,
    LOAD_FOLLOWINGS_REQUEST,
} from '../reducers/user';
import { LOAD_USER_POSTS_REQUEST } from '../reducers/post';
import PostCard from '../components/post/PostCard';
import LeftProfile from "../components/profiles/LeftProfile";
import { LOAD_USER_REQUEST } from '../reducers/user';
import { END } from 'redux-saga';
import axios from 'axios';
import wrapper from '../store/configureStore';

const Profile = () => {
    const { mainPosts } = useSelector(state => state.post);

    return (
        <>
            <LeftProfile span={7}/>
            <Col span={10}>
                <div>
                    {mainPosts.map(c => (
                        <PostCard key={+c.createdAt} post={c}/>
                    ))}
                </div>
            </Col>
        </>
    );
};

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
    console.log('getServerSideProps start_profile');
    console.log(context.req.headers);
    const cookie = context.req ? context.req.headers.cookie : '';
    axios.defaults.headers.Cookie = '';
    if (context.req && cookie) {
      axios.defaults.headers.Cookie = cookie;
    }
    context.store.dispatch({
      type: LOAD_USER_REQUEST,
    });
    context.store.dispatch({
        type: LOAD_USER_POSTS_REQUEST,
        data: state.user.me && state.user.me.id,
    });
    context.store.dispatch(END);
    console.log('getServerSideProps end');
    await context.store.sagaTask.toPromise();
  });
  
export default Profile;