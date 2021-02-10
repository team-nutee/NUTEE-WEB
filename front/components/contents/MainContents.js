import React, { useMemo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Tabs } from "antd";
import {
  LOAD_POSTS_REQUEST,
  LOAD_FAVORITE_POSTS_REQUEST,
  LOAD_CATEGORY_POSTS_REQUEST,
} from "../../reducers/post";
import PostForm from "../post/PostForm";
import PostCard from "../post/PostCard";

const { TabPane } = Tabs;

const MainContents = ({ target, posts, hasMorePost, favoritPosts, categoryPosts }) => {
  const { me } = useSelector(state => state.user);

  const dispatch = useDispatch();

  useEffect(() => {
    function onScroll() {
      if (
        window.pageYOffset + document.documentElement.clientHeight >
        document.documentElement.scrollHeight - 300
      ) {
        if (hasMorePost) {
          const lastId = posts[posts.length - 1]?.id;
          dispatch({
            type: LOAD_POSTS_REQUEST,
            lastId,
          });
          dispatch({
            type: LOAD_FAVORITE_POSTS_REQUEST,
            lastId,
          });
          dispatch({
            type: LOAD_CATEGORY_POSTS_REQUEST,
            lastId,
          });
        }
      }
    }
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [hasMorePost, posts.length]);

  const tabsWrapper = useMemo(() => ({ color: '#005000', marginTop: '10px', fontWeight: 'bold', lineHeight: '15px', paddingBotton: '10px' }), []);
  const tabPaneWrapper = useMemo(() => ({ color: 'black', fontWeight: 'normal' }), []);

  return (
    <>
      <Tabs defaultActiveKey="1" type="card" style={tabsWrapper}>
        <TabPane tab="전체 게시글" key="1" style={tabPaneWrapper}>
          {!target || me.id === target.id ? <PostForm /> : <></>}
         전체게시글
       {/*  {posts.map(c => (
            <PostCard key={c.id} post={c} />
          ))}  */}
        </TabPane>
        <TabPane tab="전공" key="2" style={tabPaneWrapper}>
          {!target || me.id === target.id ? <PostForm /> : <></>}
        전공 게시글
            {categoryPosts.map(c => (
            <PostCard key={c.id} post={c} />
          ))}
        </TabPane>
        <TabPane tab="즐겨찾기" key="3" style={tabPaneWrapper}>
          {!target || me.id === target.id ? <PostForm /> : <></>}
          즐겨찾기 게시글
       {/*    {favoritPosts.map(c => (
            <PostCard key={c.id} post={c} />
          ))} */}
        </TabPane>
      </Tabs>
    </>
  );
};

export default MainContents;
