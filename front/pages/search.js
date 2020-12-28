import React, {useCallback, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';
import {LOAD_HASHTAG_POSTS_REQUEST, LOAD_SEARCH_POSTS_REQUEST} from '../reducers/post';
import PostCard from '../containers/PostCard';
import LeftContents from "../components/LeftContents";
import {Col} from "antd";

const Search = ({text}) => {
    const dispatch = useDispatch();
    const {mainPosts, hasMorePost} = useSelector(state => state.post);
    const {me} = useSelector(state => state.user);

    const onScroll = useCallback(async() => {
        if (window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300) {
            if (hasMorePost) {
                await dispatch({
                    type: LOAD_SEARCH_POSTS_REQUEST,
                    lastId: mainPosts[mainPosts.length - 1].id,
                    data: text,
                });
            }
        }
    }, [hasMorePost, mainPosts.length]);

    useEffect(() => {
        window.addEventListener('scroll', onScroll);
        return () => {
            window.removeEventListener('scroll', onScroll);
        };
    }, [mainPosts.length]);

    const colWrapper = useMemo(() => ({ minWidth:'550px' }), []);

    return (
        <>
            <LeftContents me={me} span={5} />
            <Col span={10} style={colWrapper}>
                {mainPosts.map((c) => {
                    return (
                        <PostCard key={c.id} post={c} />
                    );
                })}
            </Col>
        </>
    );
};

Search.propTypes = {
    text: PropTypes.string.isRequired,
};

Search.getInitialProps = async (context) => {
    const text = context.query.text;
    console.log('search getInitialProps', text);
    context.store.dispatch({
        type: LOAD_SEARCH_POSTS_REQUEST,
        data: text,
    });
    return {text};
};

export default Search;