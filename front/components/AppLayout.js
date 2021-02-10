import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Row } from 'antd';
import { useSelector } from 'react-redux';
import NavigationBar from "./NavigationBar";
import LoginForm from './LoginForm';

const AppLayout = ({ children }) => {
    const { me } = useSelector(state => state.user);
    const wrapper = useMemo(() => ({ background: '#f0faf5', display: 'flex', justifyContent: 'center', }), []);

    return (
        <>
            <div style={wrapper}>
                {/*메뉴바*/}
                <NavigationBar me={me} />
                {/*본문 내용*/}
                {me ? <Row>{children}</Row> : <LoginForm />
                }
            </div>
        </>
    );
};

AppLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default AppLayout;