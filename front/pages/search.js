import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FileSearchOutlined } from '@ant-design/icons';
import { Col, Row } from 'antd';
import { END } from 'redux-saga';
import { useRouter } from 'next/router';
import { LOAD_SEARCH_POSTS_REQUEST, LOAD_CATEGORY_DATA_REQUEST } from '../reducers/post';
import { LOAD_MY_INFO_REQUEST } from '../reducers/user';
import PostCard from '../components/post/PostCard';
import LeftContents from '../components/contents/LeftContents';
import AppLayout from '../components/AppLayout';
import wrapper from '../store/configureStore';

const Search = () => {
  const dispatch = useDispatch();
  const { searchPosts, hasMorePost } = useSelector((state) => state.post);
  const { me } = useSelector((state) => state.user);
  const router = useRouter();
  const { text } = router.query;

  useEffect(() => {
    dispatch({
      type: LOAD_SEARCH_POSTS_REQUEST,
      data: text,
    });
    dispatch({
      type: LOAD_MY_INFO_REQUEST,
    });
    dispatch({
      type: LOAD_CATEGORY_DATA_REQUEST,
    });
  }, []);

  useEffect(() => {
    const onScroll = () => {
      if (window.pageYOffset + document.documentElement.clientHeight
        > document.documentElement.scrollHeight - 300) {
        if (hasMorePost) {
          dispatch({
            type: LOAD_SEARCH_POSTS_REQUEST,
            lastId: searchPosts[searchPosts.length - 1] && searchPosts[searchPosts.length - 1].id,
            data: text,
          });
        }
      }
    };
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [searchPosts.length, hasMorePost]);

  const pageWrapper = useMemo(() => ({ outline: 'none', width: '70vw', minWidth: '750px', maxWidth: '1000px', paddingTop: '65px' }), []);
  const colWrapper = useMemo(() => ({ marginTop: '30px' }), []);
  const divFontWrapper = useMemo(() => ({ margin: '30vh 10vh' }), []);
  const iconWrapper = useMemo(() => ({ margin: '10px 10vh', width: '250px', fontSize: '40px' }), []);

  return (
    <AppLayout>
      <Row gutter={10} style={pageWrapper}>
        <Col span={7}>
          <LeftContents me={me} />
        </Col>
        <Col span={17} style={colWrapper}>
          {searchPosts.length !== 0 ? searchPosts.map((c) => <PostCard key={c.id} post={c} />) : (
            <div style={divFontWrapper}>
              <h2>
                <FileSearchOutlined style={iconWrapper} />
                <br />
                &quot;
                {text}
                &quot;에 대한 검색 결과가 없습니다.
              </h2>
            </div>
          )}
        </Col>
      </Row>
    </AppLayout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
  const { text } = context.query;
  context.store.dispatch({
    type: LOAD_MY_INFO_REQUEST,
  });
  context.store.dispatch({
    type: LOAD_CATEGORY_DATA_REQUEST,
  });
  context.store.dispatch({
    type: LOAD_SEARCH_POSTS_REQUEST,
    data: text,
  });
  context.store.dispatch(END);
  await context.store.sagaTask.toPromise();
});

export default Search;
