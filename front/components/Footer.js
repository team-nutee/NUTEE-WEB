/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useMemo, useCallback, useState } from 'react';
import Link from 'next/link';
import { GithubOutlined } from '@ant-design/icons';
import { Modal } from 'antd';
import DevInfo from './DeveloperInformation';

const Footer = () => {
  const [visible, setVisible] = useState(false);

  const pageWrapper = useMemo(() => ({ display: 'flex', padding: '30px', width: '100vw', height: '100px', background: '#f0faf5', color: '#050', fontSize: '12px', marginTop: '50px' }), []);
  const logoImgWrapper = useMemo(() => ({ height: '40px', width: '40px', margin: '-1px 3px 0 5px' }), []);
  const boldWrapper = useMemo(() => ({ fontWeight: 'bold', fontSize: '15px', margin: '0' }), []);
  const gitWrapper = useMemo(() => ({ color: '#050', marginLeft: '10px', textDecoration: 'underline' }), []);
  const IconWrapper = useMemo(() => ({ marginRight: '5px' }), []);

  const showModal = useCallback(() => {
    setVisible(true);
  });
  const devInfoOk = useCallback(() => {
    setVisible(false);
  });
  const devInfoCancel = useCallback(() => {
    setVisible(false);
  });

  return (
    <>
      <div style={pageWrapper}>
        <img style={logoImgWrapper} src="/nutee_circle.png" alt="nutee" />
        <p>
          <p style={boldWrapper}>NUTEE : 성공회대학교 통합 커뮤니티 서비스</p>
          COPYRIGHT 2012 S.OWL ALL RIGHTS RESERVED.
          <Link href="https://github.com/team-nutee/NUTEE-WEB">
            <a style={gitWrapper} target="_blank" rel="noreferrer">
              <GithubOutlined style={IconWrapper} />
              Made by S.OWL (TEAM-NUTEE)
            </a>
          </Link>
          <a style={gitWrapper} onClick={showModal}>개발자 정보</a>
        </p>
      </div>
      <Modal
        visible={visible}
        onOk={devInfoOk}
        onCancel={devInfoCancel}
        footer={null}
        closable={false}
        title="개발자 정보"
      >
        <DevInfo setVisible={setVisible} />
      </Modal>
    </>
  );
};

export default Footer;
