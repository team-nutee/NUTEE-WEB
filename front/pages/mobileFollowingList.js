import React, {useMemo, useCallback} from 'react';
import { Button, Card, List, Col, Row } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { END } from 'redux-saga';
import axios from 'axios';
import AppLayout from '../components/AppLayout';
import Link from 'next/link';
import ProfileAvatar from '../components/profiles/ProfileAvatar';
import {
  LOAD_FOLLOWINGS_REQUEST,
  UNFOLLOW_USER_REQUEST,
} from '../reducers/user';
import wrapper from '../store/configureStore';

const mobileFollowingList = () => {
  const dispatch = useDispatch();
  const {
    followingList,
    hasMoreFollowing
  } = useSelector((state) => state.user);

  const onUnfollow = useCallback((userId) => () => {
    dispatch({
      type: UNFOLLOW_USER_REQUEST,
      data: userId,
    });
  }, []);

  const loadMoreFollowings = useCallback(() => {
    dispatch({
      type: LOAD_FOLLOWINGS_REQUEST,
      offset: followingList.length,
    });
  }, [followingList.length]);


  const listWrapper = useMemo(() => ({ marginTop: '10px', background: '#fff' }), []);
  const listButtonWrapper = useMemo(() => ({ width: '100%' }), []);
  const listItemWrapper = useMemo(() => ({ marginTop: '50px' }), []);
  const listCardWrapper = useMemo(() => ({ margin: '0 auto' }), []);
  const nicknameWrapper = useMemo(() => ({ display: 'inline-block', fontSize: '15px', paddingTop: '3px' }), []);
  const mobilePageWrapper = useMemo(() => ({ outline: 'none', width: '100vw', minWidth: '100px', maxWidth: '700px', paddingTop: '55px' }), []);

  return (
    <>
      <AppLayout>
        <Row style={mobilePageWrapper}>
          <Col span={24}>
            <List
              style={listWrapper}
              grid={{ gutter: 2 }}
              size="small"
              header={<div><span style={{fontSize: '20px', fontWeight: '600'}}>팔로잉</span></div>}
              loadMore={hasMoreFollowing
                          && <Button style={listButtonWrapper} onClick={loadMoreFollowings}>더 보기</Button>}
              bordered
              dataSource={followingList}
              renderItem={(item) => (
                <List.Item style={listItemWrapper}>
                  <Card style={listCardWrapper} actions={[<a onClick={onUnfollow(item.id)}>팔로우 취소</a>]}>
                    <Link
                      href={{ pathname: '/user', query: { id: item.id } }}
                      as={`/user/${item.id}`}
                    >
                      <a>
                        {item.Image
                          ? <ProfileAvatar nickname={item.nickname} imagePath={item.Image.src} />
                          : <ProfileAvatar nickname={item.nickname} />}
                      </a>
                    </Link>
                    <h2 style={nicknameWrapper}>{item.nickname}</h2>
                  </Card>
                </List.Item>
              )}
            />
          </Col>
        </Row>
      </AppLayout>
    </>
  )
};

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
  console.log('getServerSideProps start_mobileFollowingList');
  console.log(context.req.headers);
  const cookie = context.req ? context.req.headers.cookie : '';
  axios.defaults.headers.Cookie = '';
  if (context.req && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }
  context.store.dispatch({
    type: LOAD_FOLLOWINGS_REQUEST,
  });
  context.store.dispatch({
    type: UNFOLLOW_USER_REQUEST,
  });
  context.store.dispatch(END);
  console.log('getServerSideProps end');
  await context.store.sagaTask.toPromise();
});

export default mobileFollowingList;