import React from 'react';
import UserProfile from "../containers/UserProfile";
import {Col} from "antd";

const LeftContents = ({me,span}) => {
    return(
        <Col span={span}>
            {me
                ? <UserProfile></UserProfile>
                : <></>}
        </Col>
    )
};
export default LeftContents;