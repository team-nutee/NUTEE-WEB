import React from 'react';
import {Col} from "antd";
const MainContents = ({children,span}) => {
    return(
        <Col style={{minWidth:'600px'}} span={span}>
            {children}
        </Col>
    )
};
export default MainContents;