import React, { useMemo } from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { Card } from 'antd';
import { ProfileOutlined, SettingOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import ProfileAvatar from './ProfileAvatar';

const { Meta } = Card;

const MyProfile = ({ target }) => {
  const { me } = useSelector((state) => state.user);
  const prefixWrapper = useMemo(() => ({ color: 'rgba(0, 0, 0, 0.7)', marginRight: '3px' }), []);
  const profileWrapper = useMemo(() => ({ float: 'right', color: 'black', fontSize: '13px', fontWeight: 'bold' }), []);
  const cardWrapper = useMemo(() => ({ color: 'black' }), []);
  const linkWrapper = useMemo(() => ({ margin: '0' }), []);
  const setWrapper = useMemo(() => ({ float: 'right', color: 'black', fontSize: '13px', marginLeft: '5px' }), []);

  const link = document.location.href;
  const myPage = link !== 'http://localhost/' ? <></> : (
    <>
      <Link href="/profile">
        <a style={profileWrapper}>
          <ProfileOutlined style={prefixWrapper} />
          내 페이지
        </a>
      </Link>
    </>
  );

  return (
    <>
      {!target || me.id === target.id ? (
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
                    <b>좋아요</b>
                    <br />
                    {target.likeNum}
                  </div>
                </a>
              </Link>]}
          >
            <Meta
              avatar={
                target.Image ? <ProfileAvatar imagePath={target.profileUrl} />
                  : <ProfileAvatar nickname={target.nickname} />
              }
              title={target.nickname ? target.nickname : <></>}
              description={(
                <div style={linkWrapper}>
                  <Link href="/setting">
                    <a style={setWrapper}>
                      <b>
                        <SettingOutlined style={prefixWrapper} />
                        설정
                      </b>
                    </a>
                  </Link>
                  {myPage}
                </div>
              )}
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
