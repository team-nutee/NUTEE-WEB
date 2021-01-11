import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Col } from 'antd';
import { LOAD_USER_POSTS_REQUEST } from '../reducers/post';
import { LOAD_USER_REQUEST } from '../reducers/user';
import PostCard from '../containers/PostCard';
import LeftContents from "../components/LeftContents";
import wrapper from '../../store/configureStore';
import axios from 'axios';
import { END } from 'redux-saga';

const User = () => {
    const { mainPosts } = useSelector(state => state.post);

    const mainpostWrapper = useMemo(() => ({ minWidth: '500px' }), []);

    return (
        <>
        <LeftContents span={7} />
        <Col span={17}>
            <div >
                {mainPosts.map(c => (
                    <PostCard key={+c.createdAt} post={c} />
                ))}
            </div>
        </Col>
        </>
    );
};

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
    const cookie = context.req ? context.req.headers.cookie : '';
    axios.defaults.headers.Cookie = '';
    if (context.req && cookie) {
      axios.defaults.headers.Cookie = cookie;
    }
    context.store.dispatch({
      type: LOAD_USER_POSTS_REQUEST,
      data: context.params.id,
    });
    context.store.dispatch({
      type: LOAD_USER_REQUEST,
      data: context.params.id,
    });
    context.store.dispatch(END);
    await context.store.sagaTask.toPromise();
  });

export default User;