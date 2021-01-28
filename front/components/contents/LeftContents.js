import React, { useEffect, useMemo } from "react";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { LOAD_NOTICE_REQUEST } from "../../reducers/notice";
import { Col, Row } from "antd";
import MyProfile from "../profiles/MyProfile";
import Notice from "../Notice";

const LeftContents = ({ me, span }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: LOAD_NOTICE_REQUEST,
    });
  }, []);

  const wrapper = useMemo(() => ({ marginTop: '15px' }), [])
  const imgWrapper = useMemo(() => ({ width: '100%' }), []);

  return (
    <Col span={span} gutter={10} style={wrapper}>
      <Row gutter={10}>{me ? <MyProfile target={me} /> : <></>}</Row>
      <Row gutter={10}><Notice /></Row>
      <br />
      <Row gutter={10}>
       <img style={imgWrapper} src={'/poster.png'} />
        <br />
        <Link href="https://github.com/team-nutee/NUTEE-WEB">
          <a target="_blank" rel="noreferrer">Made by S.OWL</a>
        </Link>
      </Row>
    </Col>
  );
};

export default LeftContents;
