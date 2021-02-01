import React, { useMemo } from 'react';
import { useSelector } from "react-redux";
import { Col, Row } from "antd";
import UserProfile from "../profiles/UserProfile";
import UserFolloList from '../profiles/UserFolloList';

const UserLeftContents = ({ span }) => {
    const { me } = useSelector(state => state.user);

    const wrapper = useMemo(() => ({ marginTop: '15px' }), [])
    const imgWrapper = useMemo(() => ({ marginTop: '10px', width: '100%' }), []);

    return (
        <Col span={span} style={wrapper}>
            {me
                ?
                <>
                    <Row gutter={10}><UserProfile target={me} /></Row>
                    <Row gutter={10}>
                        <UserFolloList />
                    </Row>
                    <Row gutter={10}>
                        <img style={imgWrapper} src={'/poster.png'} />
                    </Row>
                </>
                :
                <></>
            }
        </Col>
    );
};
export default UserLeftContents;