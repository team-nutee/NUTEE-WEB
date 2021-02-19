import React, { useCallback, useMemo } from 'react';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Card } from 'antd';
import { ProfileOutlined, SettingOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import {
  FOLLOW_USER_REQUEST,
  UNFOLLOW_USER_REQUEST,
} from '../../reducers/user';
import ProfileAvatar from './ProfileAvatar';

const { Meta } = Card;

const MyProfile = ({ target }) => {
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);

  const onFollow = useCallback(
    (userId) => () => {
      dispatch({
        type: FOLLOW_USER_REQUEST,
        data: userId,
      });
    }, [],
  );

  const onUnfollow = useCallback(
    (userId) => () => {
      dispatch({
        type: UNFOLLOW_USER_REQUEST,
        data: userId,
      });
    }, [],
  );

  const follow = target.Followers
  && target.Followers.find((v) => v.id === me.id) ? (
    <Button size="small" onClick={onUnfollow(target.id)}>
      언팔로우
    </Button>
    ) : (
      <Button size="small" onClick={onFollow(target.id)}>
        팔로우
      </Button>
    );

  const cardWrapper = useMemo(() => ({ color: 'black' }), []);
  const linkWrapper = useMemo(() => ({ margin: '0' }), []);
  const setWrapper = useMemo(() => ({ float: 'right', color: 'black', fontSize: '13px', marginLeft: '5px' }), []);
  const prefixWrapper = useMemo(() => ({ color: 'rgba(0, 0, 0, 0.7)', marginRight: '3px' }), []);
  const profileWrapper = useMemo(() => ({ float: 'right', color: 'black', fontSize: '13px' }), []);

  return (
    <>
      {target ? (
        <div>
          <Card
            style={cardWrapper}
            actions={[
              <Link href="/profile" key="twit">
                <a>
                  <div>
                    <b>게시글</b>
                    <br />
                    {target.postNum}
                  </div>
                </a>
              </Link>,
              <Link href="/profile" key="following">
                <a>
                  <div>
                    <b>댓글</b>
                    <br />
                    {target.commentNum}
                  </div>
                </a>
              </Link>,
              <Link href="/profile" key="follower">
                <a>
                  <div>
                    <b>추천</b>
                    <br />
                    {target.likeNum}
                  </div>
                </a>
              </Link>,
            ]}
          >
            <Meta
              avatar={
                // 프로필 이미지
                target.Image ? (
                  <ProfileAvatar
                    imagePath={target.profileUrl}
                  />
                ) : (
                  <ProfileAvatar nickname={target.nickname} />
                )
              }
              title={target.nickname ? target.nickname : <></>}
              description={
                // 프로필 설정 or 팔로우 언팔로우
                !target || me.id === target.id ? (
                  <div style={linkWrapper}>
                    <Link href="/setting">
                      <a style={setWrapper}>
                        <b>
                          <SettingOutlined style={prefixWrapper} />
                          설정
                        </b>
                      </a>
                    </Link>
                    <Link href="/profile">
                      <a>
                        <b style={profileWrapper}>
                          <ProfileOutlined style={prefixWrapper} />
                          내 페이지
                        </b>
                      </a>
                    </Link>
                  </div>
                ) : follow
              }
            />
          </Card>
        </div>
      ) : <></>}
    </>
  );
};

MyProfile.propTypes = {
  target: PropTypes.shape({
    id: PropTypes.number,
    nickname: PropTypes.string,
    image: PropTypes.string,
  }),
  me: PropTypes.shape({
    id: PropTypes.number,
  }),
}.isRequired;

export default MyProfile;
