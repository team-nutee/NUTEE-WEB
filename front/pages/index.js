import React, { useEffect, useCallback, useMemo, useRef, } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Col, Row } from "antd";
import { END } from 'redux-saga';
import axios from 'axios';
import wrapper from '../store/configureStore';

import { LOAD_MAIN_POSTS_REQUEST } from '../reducers/post';
import { LOAD_USER_REQUEST } from "../reducers/user";
import AppLayout from '../components/AppLayout';
import PostForm from '../components/post/PostForm';
import PostCard from '../components/post/PostCard';
import LeftContents from "../components/contents/LeftContents";

const Home = () => {
    const dispatch = useDispatch();
    const { me } = useSelector(state => state.user);
    const { mainPosts, hasMorePost } = useSelector(state => state.post);
    //const countRef = useRef([]);

    useEffect(() => {
        function onScroll() {
            if (window.pageYOffset + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300) {
                if (hasMorePost) {
                    const lastId = mainPosts[mainPosts.length - 1]?.id;
                    dispatch({
                        type: LOAD_MAIN_POSTS_REQUEST,
                        lastId,
                    });
                }
            }
        }
        window.addEventListener('scroll', onScroll);
        return () => {
            window.removeEventListener('scroll', onScroll);
        };
    }, [hasMorePost, mainPosts.length]);

    const mainpostWrapper = useMemo(() => ({ minWidth: '550px' }), []);
    const contentsWrapper = useMemo(() => ({ margin: '0 auto' }), []);

    return (
        <AppLayout>
            <Row gutter={10} >
                <div style={contentsWrapper}>
                    <Col>
                        <LeftContents me={me} span={4} />
                    </Col>
                    <Col span={10} style={mainpostWrapper}>
                        <div style={mainpostWrapper}>
                            {me && <PostForm />}
                            {mainPosts.map((c) => <PostCard key={c.id} post={c} />)}
                        </div>
                    </Col>
                </div>
            </Row>
        </AppLayout>
    );
};

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
    const cookie = context.req ? context.req.headers.cookie : '';
    axios.defaults.headers.Cookie = '';
    if (context.req && cookie) {
        axios.defaults.headers.Cookie = cookie;
    }
    context.store.dispatch({
        type: LOAD_USER_REQUEST,
    });
    context.store.dispatch({
        type: LOAD_MAIN_POSTS_REQUEST,
    });
    context.store.dispatch(END);
    await context.store.sagaTask.toPromise();
});

export default Home;