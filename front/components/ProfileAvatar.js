import React, {useEffect} from 'react';
import {Avatar} from "antd";
import {TARGET_URL} from "../static";

const ProfileAvatar = ({nickname,imagePath}) => {
    useEffect(()=>{
        console.log(imagePath);
    },[]);
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