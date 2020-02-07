import React from 'react';
import MyProfile from "../containers/MyProfile";
import {Col} from "antd";

const LeftContents = ({me,span}) => {
    return(
        <Col span={span}>
            {me
                ? <MyProfile target={me}/>
                : <></>}
        </Col>
    )
};
export default LeftContents;