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
                <Avatar src={`${TARGET_URL}/${imagePath}`}/>
                :
                <Avatar>{nickname[0]}</Avatar>
            }
        </>
    )
};

export default ProfileAvatar;