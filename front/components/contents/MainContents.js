import React, { useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Tabs } from 'antd';
import { LOAD_POSTS_REQUEST, LOAD_FAVORITE_POSTS_REQUEST, LOAD_MAJOR_POSTS_REQUEST } from '../../reducers/post';
import PostForm from '../post/PostForm';
import PostCard from '../post/PostCard';

const { TabPane } = Tabs;

const MainContents = ({ target, mainPosts, hasMorePost, favoritePosts, majorPosts }) => {
  const { me } = useSelector((state) => state.user);
  const { loadPostsLoading } = useSelector((state) => state.post);
  const dispatch = useDispatch();

  useEffect(() => {
    function onScroll() {
      if (window.pageYOffset + document.documentElement.clientHeight
        > document.documentElement.scrollHeight - 300) {
        if (hasMorePost && !loadPostsLoading) {
          const lastId = mainPosts[mainPosts.length - 1]?.id;
          dispatch({
            type: LOAD_POSTS_REQUEST,
            lastId,
          });
          dispatch({
            type: LOAD_FAVORITE_POSTS_REQUEST,
            lastId,
          });
          dispatch({
            type: LOAD_MAJOR_POSTS_REQUEST,
            lastId,
          });
        }
      }
    }
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [mainPosts.length, hasMorePost, !loadPostsLoading]);

  const tabsWrapper = useMemo(() => ({ color: '#005000', marginTop: '10px', fontWeight: 'bold', lineHeight: '15px', paddingBotton: '10px' }), []);
  const tabPaneWrapper = useMemo(() => ({ color: 'black', fontWeight: 'normal' }), []);

  return (
    <>
      <Tabs defaultActiveKey="2" style={tabsWrapper}>
        <TabPane tab="즐겨찾기" key="1" style={tabPaneWrapper}>
          {!target || me.id === target.id ? <PostForm me={me} /> : <></>}
          {favoritePosts.map((f) => (
            <PostCard key={f.id} post={f} />
          ))}
        </TabPane>
        <TabPane tab="전체 게시글" key="2" style={tabPaneWrapper}>
          {!target || me.id === target.id ? <PostForm me={me} /> : <></>}
          {mainPosts.map((p) => (
            <PostCard key={p.id} post={p} />
          ))}
        </TabPane>
        <TabPane tab="전공" key="3" style={tabPaneWrapper}>
          {!target || me.id === target.id ? <PostForm me={me} /> : <></>}
          {majorPosts.map((c) => (
            <PostCard key={c.id} post={c} />
          ))}
        </TabPane>
      </Tabs>
    </>
  );
};

MainContents.propTypes = {
  target: PropTypes.shape({
    id: PropTypes.number,
  }),
  mainPosts: PropTypes.array,
  hasMorePost: PropTypes.bool,
  favoritPosts: PropTypes.array,
  categoryPosts: PropTypes.array,
}.isRequired;

export default MainContents;
