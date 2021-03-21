import React, { useMemo, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Tabs, Badge } from 'antd';
import PropTypes from 'prop-types';
import { LOAD_POSTS_REQUEST } from '../../reducers/post';
import PostForm from '../post/PostForm';
import PostCard from '../post/PostCard';

const { TabPane } = Tabs;

const UserContents = ({ me, myPosts, hasMorePost }) => {
  const dispatch = useDispatch();
  console.log(me);
  console.log(myPosts);
  useEffect(() => {
    function onScroll() {
      if (
        window.pageYOffset + document.documentElement.clientHeight
        > document.documentElement.scrollHeight - 300
      ) {
        if (hasMorePost) {
          const lastId = myPosts[myPosts - 1]?.id;
          dispatch({
            type: LOAD_POSTS_REQUEST,
            lastId,
          });
        }
      }
    }
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [hasMorePost, myPosts]);

  const tabsWrapper = useMemo(() => ({ color: '#005000', marginTop: '10px', fontWeight: 'bold', lineHeight: '15px', paddingBotton: '10px' }), []);
  const tabPaneWrapper = useMemo(() => ({ color: 'black', fontWeight: 'normal' }), []);
  const badge1Wrapper = useMemo(() => ({ background: '#87d068', size: 'small', zIndex: '0', marginLeft: '5px' }), []);
  const badge2Wrapper = useMemo(() => ({ background: 'purple', size: 'small', zIndex: '0', marginLeft: '5px' }), []);
  const badge3Wrapper = useMemo(() => ({ background: '#005000', size: 'small', zIndex: '0', marginLeft: '5px' }), []);

  return (
    <>
      <Tabs defaultActiveKey="1" type="card" style={tabsWrapper}>
        <TabPane
          tab={(
            <span>
              나의 글
              <Badge count={250} style={badge1Wrapper} />
            </span>
          )}
          key="1"
          style={tabPaneWrapper}
        >
          {me && <PostForm me={me} />}
          {myPosts.map((post) => (<PostCard key={post.id} post={post} />))}
        </TabPane>
        <TabPane
          tab={(
            <span>
              나의 댓글
              <Badge count={50} style={badge2Wrapper} />
            </span>
          )}
          key="2"
          style={tabPaneWrapper}
        >
          {me && <PostForm me={me} />}
          {myPosts.map((post) => (<PostCard key={post.id} post={post} />))}
        </TabPane>
        <TabPane
          tab={(
            <span>
              내가 추천한 글
              <Badge count={30} style={badge3Wrapper} />
            </span>
          )}
          key="3"
          style={tabPaneWrapper}
        >
          {me && <PostForm me={me} />}
          {myPosts.map((post) => (<PostCard key={post.id} post={post} />))}
        </TabPane>
      </Tabs>
    </>
  );
};

UserContents.propTypes = {
  me: PropTypes.object,
  mainPosts: PropTypes.array,
  hasMorePost: PropTypes.bool,
}.isRequired;

export default UserContents;
