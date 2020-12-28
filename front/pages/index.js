import React, { useEffect, useCallback, useMemo, useRef, } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PostForm from '../components/post/PostForm';
import PostCard from '../components/post/PostCard';
import { LOAD_MAIN_POSTS_REQUEST } from '../reducers/post';
import LeftContents from "../components/contents/LeftContents";
import { Col, Row } from "antd";

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
    
    const mainpostWrapper = useMemo(() => ({ minWidth: '550px' }), []);

    return (
        <Row gutter={8}>
            <Col>
                <LeftContents me={me} span={5} />
            </Col>
            <Col span={10} style={mainpostWrapper}>
                {me && <PostForm />}
                {mainPosts.map((c) => {
                    return (
                        <PostCard key={c.id} post={c} />
                    );
                })}
            </Col>
        </Row>
    );
};

Home.getInitialProps = async (context) => {
    console.log(Object.keys(context));
    context.store.dispatch({
        type: LOAD_MAIN_POSTS_REQUEST,
    });
};

export default Home;