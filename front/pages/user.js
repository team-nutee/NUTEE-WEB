import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import {Avatar, Card, Col} from 'antd';
import { LOAD_USER_POSTS_REQUEST } from '../reducers/post';
import { LOAD_USER_REQUEST } from '../reducers/user';
import PostCard from '../containers/PostCard';
import LeftContents from "../components/LeftContents";
import RightContents from "../components/RightContents";
import LeftUser from "../components/LeftUser";

const User = () => {
    const { mainPosts } = useSelector(state => state.post);

    return (
        <>
        <LeftUser span={5} />
        <Col span={10}>
            <div>
                {mainPosts.map(c => (
                    <PostCard key={+c.createdAt} post={c} />
                ))}
            </div>
        </Col>
        <RightContents />
        </>
    );
};

User.propTypes = {
    id: PropTypes.number.isRequired,
};

User.getInitialProps = async (context) => {
    const id = parseInt(context.query.id,10);
    console.log('user getInitialProps', id);
    context.store.dispatch({
        type: LOAD_USER_REQUEST,
        data: id,
    });
    context.store.dispatch({
        type: LOAD_USER_POSTS_REQUEST,
        data: id,
    });
    return { id };
};

export default User;