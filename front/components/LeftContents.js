import React from 'react';
import MyProfile from "../containers/MyProfile";
import {Col} from "antd";
import SchoolOrg from "./SchoolOrg";

const LeftContents = ({me, span}) => {
    return (
        <Col span={span}>
            {me
                ? <MyProfile target={me}/>
                : <></>
            }
            <SchoolOrg/>
            <SchoolOrg/>
            <SchoolOrg/>
            <SchoolOrg/>
            <SchoolOrg/>
            <SchoolOrg/>
            <SchoolOrg/>
        </Col>
    )
};
export default LeftContents;