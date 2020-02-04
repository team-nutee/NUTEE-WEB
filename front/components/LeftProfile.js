import React from 'react';
import UserProfile from "../containers/UserProfile";
import { Col } from "antd";
import {useSelector} from "react-redux";
import ProfileEditModal from "./ProfileEditModal";

const LeftProfile =({span})=>{
    const {me} = useSelector(state => state.user);
    return(
        <>
            <Col span={span}>
                {me
                    ?
                    <>
                        <UserProfile/>
                        <ProfileEditModal/>
                    </>
                    : <></>}
            </Col>
        </>
    )
};
export default LeftProfile;