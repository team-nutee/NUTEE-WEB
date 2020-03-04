import React, { useEffect, useCallback, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PostForm from '../containers/PostForm';
import PostCard from '../containers/PostCard';
import { LOAD_MAIN_POSTS_REQUEST } from '../reducers/post';
import LeftContents from "../components/LeftContents";
import MainContents from "../components/MainContents";
import RightContents from "../components/RightContents";
import {Col, Row} from "antd";

const Home = () => {
    const { me } = useSelector(state => state.user);
    const { mainPosts, hasMorePost } = useSelector(state => state.post);
    const dispatch = useDispatch();
    const countRef = useRef([]);

    const onScroll = useCallback(() => {
        if (window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300) {
            if (hasMorePost) {
                const lastId = mainPosts[mainPosts.length - 1].id;
                if (!countRef.current.includes(lastId)) {
                    dispatch({
                        type: LOAD_MAIN_POSTS_REQUEST,
                        lastId,
                    });
                    countRef.current.push(lastId);
                }
            }
        }
    }, [hasMorePost, mainPosts.length]);

    useEffect(() => {
        window.addEventListener('scroll', onScroll);
        return () => {
            window.removeEventListener('scroll', onScroll);
        };
    }, [mainPosts.length]);

    return (
        <>
            <LeftContents me={me} span={4} />
            <Col span={10} style={{minWidth:'550px'}}>
                {me && <PostForm />}
                {mainPosts.map((c) => {
                    return (
                        <PostCard key={c.id} post={c} />
                    );
                })}
            </Col>
            <RightContents />
        </>
    );
};

Home.getInitialProps = async (context) => {
    console.log(Object.keys(context));
    context.store.dispatch({
        type: LOAD_MAIN_POSTS_REQUEST,
    });
};

export default Home;