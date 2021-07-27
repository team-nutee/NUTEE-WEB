import React, { useMemo } from 'react';
import { Card } from 'antd';
import PropTypes from 'prop-types';
import ProfileAvatar from './ProfileAvatar';

const { Meta } = Card;

const UserProfile = ({ target }) => {
  const cardWrapper = useMemo(() => ({ color: 'black' }), []);

  return (
    <>
      {target
        ? (
          <Card style={cardWrapper}>
            <Meta
              avatar={target.image ? <ProfileAvatar imagePath={target.image} /> : <ProfileAvatar />}
              title={target.nickname}
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
