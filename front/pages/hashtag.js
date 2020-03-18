import React, {useCallback, useEffect} from 'react';
import PropTypes from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';
import {LOAD_HASHTAG_POSTS_REQUEST} from '../reducers/post';
import PostCard from '../containers/PostCard';
import styled from "styled-components";
import LeftContents from "../components/LeftContents";
import RightContents from "../components/RightContents";
import {Col} from "antd";
import PostForm from "../containers/PostForm";

const Hashtag = ({tag}) => {
    const dispatch = useDispatch();

    const {mainPosts, hasMorePost} = useSelector(state => state.post);
    const {me} = useSelector(state => state.user);

    const onScroll = useCallback(() => {
        if (window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300) {
            if (hasMorePost) {
                dispatch({
                    type: LOAD_HASHTAG_POSTS_REQUEST,
                    lastId: mainPosts[mainPosts.length - 1].id,
                    data: tag,
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

    return (
        <>
            <LeftContents me={me} span={5} />
            <Col span={10} style={{minWidth:'550px'}}>
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

Hashtag.propTypes = {
    tag: PropTypes.string.isRequired,
};

Hashtag.getInitialProps = async (context) => {
    const tag = context.query.tag;
    console.log('hashtag getInitialProps', tag);
    context.store.dispatch({
        type: LOAD_HASHTAG_POSTS_REQUEST,
        data: tag,
    });
    return {tag};
};

export default Hashtag;