import React, { useCallback, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Card } from 'antd';
import PropTypes from 'prop-types';
import {
  FOLLOW_USER_REQUEST,
  UNFOLLOW_USER_REQUEST,
} from '../../reducers/user';
import ProfileAvatar from './ProfileAvatar';

const { Meta } = Card;

const UserProfile = ({ target }) => {
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);

  const onFollow = useCallback((userId) => () => {
    dispatch({
      type: FOLLOW_USER_REQUEST,
      data: userId,
    });
  }, []);

  const onUnfollow = useCallback((userId) => () => {
    dispatch({
      type: UNFOLLOW_USER_REQUEST,
      data: userId,
    });
  }, []);

  const cardWrapper = useMemo(() => ({ color: 'black' }), []);
  const button1Wrapper = useMemo(() => ({ float: 'right', marginLeft: '5px', fontSize: '13px', width: '55px' }), []);
  const button2Wrapper = useMemo(() => ({ float: 'right', marginLeft: '5px', fontSize: '13px', width: '65px' }), []);

  const follow = target.followers && target.followers.find((v) => v.id === me.id)
    ? (
      <Button size="small" style={button2Wrapper} onClick={onUnfollow(target.id)}>
        언팔로우
      </Button>
    )
    : (
      <Button size="small" style={button1Wrapper} onClick={onFollow(target.id)}>
        팔로우
      </Button>
    );

  return (
    <>
      {target
        ? (
          <Card style={cardWrapper}>
            <Meta
              avatar={target.image ? <ProfileAvatar imagePath={target.image} /> : <ProfileAvatar />}
              title={target.nickname}
              description={follow}
            />
          </Card>
        )
        : <></>}
    </>
  );
};

UserProfile.propTypes = {
  target: PropTypes.shape({
    id: PropTypes.number,
    nickname: PropTypes.string,
    image: PropTypes.string,
  }),
  me: PropTypes.shape({
    id: PropTypes.number,
  }),
}.isRequired;

export default UserProfile;
