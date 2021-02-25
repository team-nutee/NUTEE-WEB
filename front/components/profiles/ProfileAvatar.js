import React, { useMemo, useState, useEffect } from 'react';
import { Avatar } from 'antd';
import PropTypes from 'prop-types';
import { AUTH_URL } from '../../static';

const ProfileAvatar = ({ imagePath }) => {
  const avatarWrapper = useMemo(() => ({ border: '1px solid #d8d8d8' }), []);
  const [mobileScreen, setMobileScreen] = useState(false);

  useEffect(
    function onMobileWidth() {
      if ((window.innerWidth || document.body.clientWidth) > 750) {
        setMobileScreen(false);
      } else {
        setMobileScreen(true);
      }
      window.addEventListener('resize', onMobileWidth);
      return () => {
        window.removeEventListener('resize', onMobileWidth);
      };
    },
  );

  return (
    <>
      {imagePath
        ? 
        <>
         {mobileScreen ?
          <Avatar size={100} style={avatarWrapper} src={`${AUTH_URL}/${imagePath}`} />
          :
          <Avatar size={50} style={avatarWrapper} src={`${AUTH_URL}/${imagePath}`} />
         }
        </>
        : 
        <>
          {mobileScreen ? 
            <Avatar size={100} style={avatarWrapper} src="/nutee_profile.png" />
            :
            <Avatar size={50} style={avatarWrapper} src="/nutee_profile.png" />
          }
        </>
      }
    </>
  );
};

ProfileAvatar.propTypes = {
  imagePath: PropTypes.string,
}.isRequired;

export default ProfileAvatar;
