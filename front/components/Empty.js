import React, { useMemo } from 'react';
import { Row, Col, Skeleton } from 'antd';

const Empty = () => {
  const wrapper = useMemo(() => ({ display: 'flex', justifyContent: 'center', minHeight: '1000px' }), []);
  const pageWrapper = useMemo(() => ({ outline: 'none', width: '70vw', minWidth: '750px', maxWidth: '1000px', paddingTop: '65px' }), []);
  const navWrapper = useMemo(() => ({ background: '#fff', boxShadow: '0 5px 10px rgba(0,0,0,0.19), 0 1px 3px rgba(0,0,0,0.23)', height: '65px', paddingTop: '15px', position: 'fixed', top: '0', zIndex: '1050', width: '100%' }), []);

  /* left */
  const leftWrapper = useMemo(() => ({ padding: '20px', marginTop: '15px', background: 'rgba(0,0,0,0.03)', minWidth: '200px', width: '20wv', borderRadius: '2px' }), []);
  const noticeWrapper = useMemo(() => ({ height: '350px', padding: '20px', marginTop: '15px', background: 'rgba(0,0,0,0.03)', minWidth: '200px', width: '20wv', borderRadius: '2px' }), []);

  /* right */
  const formWrapper = useMemo(() => ({ marginTop: '50px', padding: '20px', height: '250px', overflow: 'hidden', background: 'rgba(0,0,0,0.03)', borderRadius: '5px', margin: '7px 0 15px 0', minWidth: '500px', maxWidth: '700px', width: '50wv' }), []);
  const postCardWrapper = useMemo(() => ({ padding: '20px', height: '400px', marginTop: '20px', background: 'rgba(0,0,0,0.03)', minWidth: '500px', width: '50wv', borderRadius: '2px', maxWidth: '700px', marginBottom: '10px' }), []);

  return (
    <div style={navWrapper}>
      <div style={wrapper}>
        <Row gutter={10} style={pageWrapper}>
          <Col span={7}>
            <div style={leftWrapper}>
              <Skeleton active avatar />
            </div>
            <div style={noticeWrapper}>
              <Skeleton active />
              <Skeleton active />
            </div>
            <div style={noticeWrapper}>
              <Skeleton active />
              <Skeleton active />
            </div>
          </Col>
          <Col span={17}>
            <div style={formWrapper}>
              <Skeleton active />
            </div>
            <div style={postCardWrapper}>
              <Skeleton active avatar />
              <Skeleton active />
            </div>
            <div style={postCardWrapper}>
              <Skeleton active avatar />
              <Skeleton active />
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Empty;
