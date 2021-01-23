import React, { useMemo, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Tabs } from "antd";
import { 
  LOAD_MAIN_POSTS_REQUEST,
  LOAD_FAVORITE_POSTS_REQUEST,
  LOAD_CATEGORY_POSTS_REQUEST,
 } from "../../reducers/post";
import PostForm from "../post/PostForm";
import PostCard from "../post/PostCard";

const { TabPane } = Tabs;

const MainContents = ({ me, mainPosts, hasMorePost }) => {
  const dispatch = useDispatch();
  
  useEffect(() => {
    function onScroll() {
      if (
        window.pageYOffset + document.documentElement.clientHeight >
        document.documentElement.scrollHeight - 300
      ) {
        if (hasMorePost) {
          const lastId = mainPosts[mainPosts.length - 1]?.id;
          dispatch({
            type: LOAD_MAIN_POSTS_REQUEST,
            lastId,
          });
        }
      }
    }
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [hasMorePost, mainPosts.length]);

  const tabsWrapper = useMemo(() => ({ color:  '#005000', marginTop: '10px', fontWeight: 'bold', lineHeight: '15px', paddingBotton: '10px' }), []);
  const tabPaneWrapper = useMemo(() => ({ color: 'black', fontWeight: 'normal'}), []);
  
  return (
    <>
      <Tabs defaultActiveKey="1" type="card" style={tabsWrapper}>
        <TabPane tab="전체 게시글" key="1" style={tabPaneWrapper}>
          {me && <PostForm />}전체게시글 
          {mainPosts.map(c => (
            <PostCard key={c.id} post={c} />
          ))}
        </TabPane>
        <TabPane tab="내 전공" key="2" style={tabPaneWrapper}>
        </TabPane>
        <TabPane tab="즐겨찾기" key="3" style={tabPaneWrapper}>
          {me && <PostForm />}
          즐겨찾기 게시글
        </TabPane>
      </Tabs>
    </>
  );
};

export default MainContents;
