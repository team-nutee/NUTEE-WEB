import React, {useMemo, useCallback} from 'react';
import { Button, Card, List, Col, Row } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { END } from 'redux-saga';
import axios from 'axios';
import AppLayout from '../components/AppLayout';
import {
  LOAD_FOLLOWERS_REQUEST,
  REMOVE_FOLLOWER_REQUEST,
} from '../reducers/user';
import wrapper from '../store/configureStore';

const mobileFollowerList = () => {
  const dispatch = useDispatch();
  const {
    followerList,
    hasMoreFollower
  } = useSelector((state) => state.user);

  const onRemoveFollower = useCallback((userId) => () => {
    dispatch({
      type: REMOVE_FOLLOWER_REQUEST,
      data: userId,
    });
  }, []);

  const loadMoreFollowers = useCallback(() => {
    dispatch({
      type: LOAD_FOLLOWERS_REQUEST,
      offset: followerList.length,
    });
  }, [followerList.length]);


  const listWrapper = useMemo(() => ({ marginTop: '10px', background: '#fff' }), []);
  const listButtonWrapper = useMemo(() => ({ width: '100%' }), []);
  const listItemWrapper = useMemo(() => ({ marginTop: '50px' }), []);
  const nicknameWrapper = useMemo(() => ({ display: 'inline-block', fontSize: '15px', paddingTop: '3px' }), []);
  const mobilePageWrapper = useMemo(() => ({ outline: 'none', width: '100vw', minWidth: '100px', maxWidth: '700px', paddingTop: '55px' }), []);
  const listCardAvatarWrapper = useMemo(() => ({ margin: '0px 5px 0px 0px' }), []);

  return (
    <>
      <AppLayout>
        <Row style={mobilePageWrapper}>
          <Col span={24}>
            <List
                style={listWrapper}
                grid={{ gutter: 2 }}
                size="small"
                header={<div><span style={{fontSize: '20px', fontWeight: '600'}}>팔로워</span></div>}
                loadMore={hasMoreFollower
                            && (
                            <Button style={ listButtonWrapper } onClick={loadMoreFollowers}>
                            더 보기
                            </Button>
                            )}
                bordered
                dataSource={followerList}
                renderItem={(item) => (
                <List.Item style={ listItemWrapper }>
                    <Card actions={[<a onClick={onRemoveFollower(item.id)}>팔로워 차단</a>]}>
                    <Avatar size="large" style={listCardAvatarWrapper}>
                        {item.nickname[0]}
                    </Avatar>
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
  console.log('getServerSideProps start_mobileFollowerList');
  console.log(context.req.headers);
  const cookie = context.req ? context.req.headers.cookie : '';
  axios.defaults.headers.Cookie = '';
  if (context.req && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }
  context.store.dispatch({
    type: LOAD_FOLLOWERS_REQUEST,
  });
  context.store.dispatch({
    type: REMOVE_FOLLOWER_REQUEST,
  });
  context.store.dispatch(END);
  console.log('getServerSideProps end');
  await context.store.sagaTask.toPromise();
});

export default mobileFollowerList;