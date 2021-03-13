import React, { useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import NavigationBar from './NavigationBar';
import LoginForm from './LoginForm';
import Footer from './Footer';
import { LOAD_CATEGORY_DATA_REQUEST } from '../reducers/post';

const AppLayout = ({ children }) => {
  const { me } = useSelector((state) => state.user);
  const wrapper = useMemo(() => ({ display: 'flex', justifyContent: 'center', minHeight: '1000px' }), []);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: LOAD_CATEGORY_DATA_REQUEST,
    });
  }, []);

  return (
    <>
      <div style={wrapper}>
        {/* 메뉴바 */}
        <NavigationBar me={me} />
        {/* 본문 내용 */}
        {me ? (
          <Row>
            <Col style={wrapper}>{children}</Col>
            <Footer />
          </Row>
        ) : <LoginForm />}
      </div>
    </>
  );
};

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppLayout;
