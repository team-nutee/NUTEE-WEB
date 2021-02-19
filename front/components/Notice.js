import React, { useMemo } from 'react';
import { List, Tabs, Divider } from 'antd';
import { useSelector } from 'react-redux';
import { NotificationOutlined } from '@ant-design/icons';

const { TabPane } = Tabs;

const list = [
  {
    tab: '학사',
    key: 0,
  },
  {
    tab: '수업',
    key: 1,
  },
  {
    tab: '학점',
    key: 2,
  },
  {
    tab: '장학',
    key: 3,
  },
  {
    tab: '일반',
    key: 4,
  },
  {
    tab: '행사',
    key: 5,
  },
];

const Notice = () => {
  const { noticeContents, noticeHrefs } = useSelector((state) => state.notice);

  const tabWrapper = useMemo(() => ({ background: '#d7f7e7' }), []);
  const listWrapper = useMemo(() => ({ background: 'white', borderRadius: '3', borderColor: '#e6e6e6' }), []);
  const listItemAWrapper = useMemo(() => ({ textDecoration: 'none', color: 'black', fontWeight: '10', marginLeft: '-40px' }), []);

  return (
    <>
      <Divider orientation="center">
        <NotificationOutlined />
        {' '}
        학교 공지사항
      </Divider>
      <Tabs defaultActiveKey="0" type="card" size="small" style={tabWrapper}>
        {list.map((v) => (
          <TabPane tab={v.tab} key={v.key} disabled={v === 5}>
            <List
              style={listWrapper}
              bordered
              dataSource={noticeContents[v.key]}
              renderItem={(item, i) => (
                <List.Item>
                  <a target="_blank" without rel="noreferrer" style={listItemAWrapper} href={noticeHrefs[v.key][i]}>
                    {' '}
                    {item}
                  </a>
                </List.Item>
              )}
            />
          </TabPane>
        ))}
      </Tabs>
    </>
  );
};
export default Notice;
