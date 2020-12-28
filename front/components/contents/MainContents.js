import React from 'react';
import {Col} from "antd";

const MainContents = ({ children, span }) => {
    const colWrapper = useMemo(() => ({ minWidth : '600px' }), []);
    return(
        <Col style={colWrapper} span={span}>
            {children}
        </Col>
    )
};
export default MainContents;