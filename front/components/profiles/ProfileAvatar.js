import React, { useMemo } from 'react';
import { Avatar } from 'antd';
import PropTypes from 'prop-types';
import { AUTH_URL } from '../../static';

const ProfileAvatar = ({ imagePath }) => {
  const avatarWrapper = useMemo(() => ({ border: '1px solid #d8d8d8' }), []);

  return (
    <>
      {imagePath
        ? <Avatar size={50} style={avatarWrapper} src={`${AUTH_URL}/${imagePath}`} />
        : <Avatar size={50} style={avatarWrapper} src="/nutee_profile.png" />}
    </>
  );
};

ProfileAvatar.propTypes = {
  imagePath: PropTypes.string,
}.isRequired;

export default ProfileAvatar;
