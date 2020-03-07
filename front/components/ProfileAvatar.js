import React from 'react';
import {Avatar} from "antd";
import {TARGET_URL} from "../static";

const ProfileAvatar = ({imagePath}) => {
    return(
        <>
            {imagePath?
                <Avatar style={{border:'1px solid #d8d8d8'}} src={`${TARGET_URL}/${imagePath}`}/>
                :
                <Avatar style={{border:'1px solid #d8d8d8'}} src={`${TARGET_URL}/settings/nutee_profile.png`}/>
            }
        </>
    )
};

export default ProfileAvatar;