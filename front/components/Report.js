import React, { useCallback } from 'react';
import { Button, Input, Row, Col } from "antd";
import { MessageOutlined } from "@ant-design/icons";

const Report = ( setReportVisible ) => {
    const [report, setReport] = useState('');

    const onChangeReport = useCallback(e => {
        setReport(e.target.value);
      }, []);

      const onSubmitReport = useCallback(() => {
        dispatch({
          type: REPORT_REQUEST,
          data: {
            postId: post.id,
            content: report,
          },
        });
        setReportVisible(false);
      });

    const blockWrapper = useMemo(() => ({ width: '80%', margin: '0 auto' }), []);
    const prefixWrapper = useMemo(() => ({ color: 'rgba(0,0,0,.25)' }), []);
    return(
        <div style={blockWrapper}>
          <br />
          <Row gutter={8}>
            <Col span={18}>
              <Input
                prefix={<MessageOutlined style={prefixWrapper} />}
                placeholder="신고사유"
                value={report}
                required
                onChange={onChangeReport}
              />
            </Col>
            <Col span={6}>
              <Button onClick={onSubmitReport}>신고</Button>
            </Col>
          </Row>
        </div>
    );
};

export default Report;