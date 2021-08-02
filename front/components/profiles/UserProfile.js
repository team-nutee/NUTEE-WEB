import React, { useMemo } from 'react';
import { Card } from 'antd';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { SettingOutlined } from '@ant-design/icons';
import ProfileAvatar from './ProfileAvatar';

const { Meta } = Card;

const UserProfile = ({ target }) => {
  const cardWrapper = useMemo(() => ({ color: 'black' }), []);
  const linkWrapper = useMemo(() => ({ margin: '0' }), []);
  const setWrapper = useMemo(() => ({ float: 'right', color: 'black', fontSize: '13px', marginLeft: '5px' }), []);
  const prefixWrapper = useMemo(() => ({ color: 'rgba(0, 0, 0, 0.7)', marginRight: '3px' }), []);

  return (
    <>
      {target
        ? (
          <Card
            style={cardWrapper}
            actions={[
              <div>
                <b>게시글</b>
                <br />
                {target.postNum}
              </div>,
              <div>
                <b>댓글</b>
                <br />
                {target.commentNum}
              </div>,
              <div>
                <b>좋아요</b>
                <br />
                {target.likeNum}
              </div>,
            ]}
          >
            <Meta
              avatar={target.image ? <ProfileAvatar imagePath={target.image} /> : <ProfileAvatar />}
              title={target.nickname}
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
                </div>
              )}
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
