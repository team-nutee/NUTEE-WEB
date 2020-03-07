import React from 'react';
import MyProfile from "../containers/MyProfile";
import { Col } from "antd";
import {useSelector} from "react-redux";
import ProfileEditModal from "./ProfileEditModal";
import PwEditModal from "./PwEditModal";

const LeftProfile =({span})=>{
    const {me} = useSelector(state => state.user);
    return(
        <>
            <Col span={span}>
                {me
                    ?
                    <>
                        <MyProfile target={me}/>
                        <ProfileEditModal/>
                        <PwEditModal/>
                    </>
                    : <></>}
            </Col>
        </>
    )
};
export default LeftProfile;