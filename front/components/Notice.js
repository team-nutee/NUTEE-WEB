import React, { useMemo } from 'react';
import { List, Tabs, Divider } from 'antd';
import { useSelector } from 'react-redux';
import { NotificationOutlined } from '@ant-design/icons';
import styled from 'styled-components';

const NoticeTabs = styled(Tabs)`
  
  .ant-tabs-nav{
      background: white;
      width: 19.5vw;
      min-width: 205px;
      max-width: 280px;

    .ant-tabs-nav-wrap {
     
      .ant-tabs-nav-list {
          display: flex;
          justify-content: space-between;
          flex-direction: row;
          align-items: center;

          .ant-tabs-tab.ant-tabs-tab-active {
            background: white;
          }
          
          .ant-tabs-tab {
            width: 5vw;
            margin-right: 0vw;
            padding: 0px;
            text-align: center;
            border: 1px solid #E6E6E6;
            border-bottom-width: 0px;
            height: 30px;
            border-radius: 4px;
            background: #FAFAFA;

            .ant-tabs-tab-btn {
              display: inline-block;
              vertical-align: middle;
              margin-top: 5px;
              font-weight: bold;
              
            }
            
        }
      }
    }
  }
`;

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

  const listWrapper = useMemo(() => ({ background: 'white', borderRadius: '3', borderColor: '#e6e6e6' }), []);
  const listItemAWrapper = useMemo(() => ({ textDecoration: 'none', color: 'black', fontWeight: '10', marginLeft: '-40px' }), []);

  return (
    <>
      <Divider orientation="center">
        <NotificationOutlined />
        {' '}
        학교 공지사항
      </Divider>
      <NoticeTabs defaultActiveKey="0" type="card" size="small">
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
      </NoticeTabs>
    </>
  );
};
export default Notice;
