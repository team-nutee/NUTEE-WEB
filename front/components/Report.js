import React, { useCallback, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Button, Input, Row } from 'antd';
import { useDispatch } from 'react-redux';
import { REPORT_REQUEST } from '../reducers/post';

const { TextArea } = Input;

const Report = ({ postId, setReportVisible }) => {
  const [report, setReport] = useState('');
  const dispatch = useDispatch();

  const onChangeReport = useCallback((e) => {
    setReport(e.target.value);
  }, []);

  const onSubmitReport = useCallback(() => {
    dispatch({
      type: REPORT_REQUEST,
      data: {
        postId,
        content: report,
      },
    });
    setReportVisible(false);
    setReport('');
  });
  const blockWrapper = useMemo(() => ({ display: 'flex', justifyContent: 'center' }), []);
  const buttonWrapper = useMemo(() => ({ background: '#13c276', color: '#fff', width: '80px', marginLeft: '10px' }), []);
  const textWrapper = useMemo(() => ({ width: '300px' }), []);

  return (
    <Row gutter={8} style={blockWrapper}>
      <TextArea
        placeholder="신고 사유를 적어주세요."
        style={textWrapper}
        onChange={onChangeReport}
        value={report}
        autoSize={{ minRows: 1, maxRows: 3 }}
        required
      />
      <Button style={buttonWrapper} onClick={onSubmitReport}>신고</Button>
    </Row>
  );
};

Report.propTypes = {
  postId: PropTypes.number,
  setReportVisible: PropTypes.func,
}.isRequired;

export default Report;
