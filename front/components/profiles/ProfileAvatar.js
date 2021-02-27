import React from 'react';
import { Avatar } from 'antd';
import PropTypes from 'prop-types';

const ProfileAvatar = ({ imagePath }) => (
  <>
    {imagePath ? <Avatar size={50} src={imagePath.src} /> : <Avatar size={50} src="/nutee_profile.png" />}
  </>
);

ProfileAvatar.propTypes = {
  imagePath: PropTypes.shape({
    src: PropTypes.string,
  }),
}.isRequired;

export default ProfileAvatar;
