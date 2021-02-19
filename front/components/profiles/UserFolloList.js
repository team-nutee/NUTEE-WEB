/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useMemo, useCallback } from 'react';
import { Avatar, Button, Card, List } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import Link from 'next/link';
import ProfileAvatar from './ProfileAvatar';
import {
  LOAD_FOLLOWERS_REQUEST,
  LOAD_FOLLOWINGS_REQUEST,
  REMOVE_FOLLOWER_REQUEST,
  UNFOLLOW_USER_REQUEST,
} from '../../reducers/user';

const UserFolloList = () => {
  const dispatch = useDispatch();
  const {
    followingList,
    followerList,
    hasMoreFollower,
    hasMoreFollowing,
  } = useSelector((state) => state.user);

  const onUnfollow = useCallback((userId) => () => {
    dispatch({
      type: UNFOLLOW_USER_REQUEST,
      data: userId,
    });
  }, []);

  const onRemoveFollower = useCallback((userId) => () => {
    dispatch({
      type: REMOVE_FOLLOWER_REQUEST,
      data: userId,
    });
  }, []);

  const loadMoreFollowings = useCallback(() => {
    dispatch({
      type: LOAD_FOLLOWINGS_REQUEST,
      offset: followingList.length,
    });
  }, [followingList.length]);

  const loadMoreFollowers = useCallback(() => {
    dispatch({
      type: LOAD_FOLLOWERS_REQUEST,
      offset: followerList.length,
    });
  }, [followerList.length]);

  const listWrapper = useMemo(() => ({ marginTop: '10px', background: '#fff' }), []);
  const listButtonWrapper = useMemo(() => ({ width: '100%' }), []);
  const listItemWrapper = useMemo(() => ({ marginTop: '50px' }), []);
  const listCardWrapper = useMemo(() => ({ margin: '0 auto' }), []);
  const nicknameWrapper = useMemo(() => ({ display: 'inline-block', fontSize: '15px', paddingTop: '3px' }), []);
  const listCardAvatarWrapper = useMemo(() => ({ margin: '0px 5px 0px 0px' }), []);

  return (
    <>
      <List
        style={listWrapper}
        grid={{ gutter: 2 }}
        size="small"
        header={<div>팔로잉 목록</div>}
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
      <List
        style={listWrapper}
        grid={{ gutter: 2 }}
        size="small"
        header={<div>팔로워 목록</div>}
        loadMore={hasMoreFollower
                    && (
                    <Button style={{ listButtonWrapper }} onClick={loadMoreFollowers}>
                      더 보기
                    </Button>
                    )}
        bordered
        dataSource={followerList}
        renderItem={(item) => (
          <List.Item style={{ listItemWrapper }}>
            <Card actions={[<a onClick={onRemoveFollower(item.id)}>팔로워 차단</a>]}>
              <Avatar size="large" style={listCardAvatarWrapper}>
                {item.nickname[0]}
              </Avatar>
              <h2 style={nicknameWrapper}>{item.nickname}</h2>
            </Card>
          </List.Item>
        )}
      />
    </>
  );
};

export default UserFolloList;
