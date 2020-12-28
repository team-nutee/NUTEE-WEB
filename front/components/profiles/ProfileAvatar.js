import React, { useMemo } from 'react';
import {Avatar} from "antd";
import {TARGET_URL} from "../../static";

const ProfileAvatar = ({imagePath}) => {
    const avatarWrapper = useMemo(() => ({ border:'1px solid #d8d8d8' }), []);

    return(
        <>
            {imagePath?
                <Avatar style={ avatarWrapper } src={`${TARGET_URL}/${imagePath}`}/>
                :
                <Avatar style={ avatarWrapper } src={`${TARGET_URL}/settings/nutee_profile.png`}/>
            }
        </>
    )
};

export default ProfileAvatar;