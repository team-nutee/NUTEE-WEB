import React from 'react';
import {Col} from "antd";
import {useSelector} from "react-redux";
import UserProfile from "../containers/UserProfile";

const LeftUser = ({span}) => {
    return(
        <Col span={span}>
            <UserProfile/>
        </Col>
    )
};

export default LeftUser;