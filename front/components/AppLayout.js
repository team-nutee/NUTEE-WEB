import React, { useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import NavigationBar from './NavigationBar';
import LoginForm from './LoginForm';
import Footer from './Footer';
import Empty from './Empty';
import { LOAD_MY_INFO_REQUEST } from '../reducers/user';

const AppLayout = ({ children }) => {
  const { me, isLoadMyInfoError } = useSelector((state) => state.user);
  const wrapper = useMemo(() => ({ display: 'flex', justifyContent: 'center', minHeight: '1000px' }), []);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: LOAD_MY_INFO_REQUEST,
    });
  }, []);

  const page = isLoadMyInfoError ? (
    <>
      <NavigationBar />
      <LoginForm />
    </>
  ) : <Empty />;

  return (
    <div style={wrapper}>
      {me ? (
        <>
          <NavigationBar me={me} />
          <Row>
            <Col style={wrapper}>{children}</Col>
            <Footer />
          </Row>
        </>
      )
        : page}
    </div>
  );
};

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppLayout;
