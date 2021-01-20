import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Row } from 'antd';
import { useSelector } from 'react-redux';
import MenuBar from "./MenuBar";
import LoginForm from './LoginForm';

const AppLayout = ({ children }) => {
    const { me } = useSelector(state => state.user);

    const divWrapper = useMemo(() => ({ background: '#f0faf5', display: 'flex', justifyContent: 'center', }), []);

    return (
        <>
            <div className={'main'} style={divWrapper}>
                {/*메뉴바*/}
                <MenuBar me={me} />
                {/*본문 내용*/}
                {me ?
                    <Row gutter={8}>
                        {children}
                    </Row>
                    :
                    <LoginForm />
                }
            </div>
            <style jsx>
                {
                    `
                    div {
                        font-family:"Do Hyeon", sans-serif;
                        font-weight: 200;
                    }
                   `
                }
            </style>
        </>
    );
};

AppLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default AppLayout;