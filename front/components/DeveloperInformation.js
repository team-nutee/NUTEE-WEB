import React, { useMemo } from 'react';
import { List, Tag, Divider } from 'antd';

const DeveloperInfomation = () => {
  const wrapper = useMemo(() => ({ textAlign: 'center' }), []);
  const tagWrapper = useMemo(() => ({ marginLeft: '10px' }), []);
  const listWrapper = useMemo(() => ({ background: 'white', borderRadius: '3', borderColor: '#e6e6e6' }), []);

  const list = [
    {
      name: '이문혁',
      part: 'Back-end',
      color: 'magenta',
    },
    {
      name: '윤석노',
      part: 'Back-end',
      color: 'magenta',
    },
    {
      name: '이승헌',
      part: 'Back-end',
      color: 'magenta',
    },
    {
      name: '오준현',
      part: 'iOS',
      color: 'cyan',
    },
    {
      name: '김희재',
      part: 'iOS',
      color: 'cyan',
    },
    {
      name: '김은우',
      part: 'iOS',
      color: 'cyan',
    },
    {
      name: '김지원',
      part: 'Front-end',
      color: 'purple',
    },
    {
      name: '김산호',
      part: 'Front-end',
      color: 'purple',
    },
    {
      name: '김희선',
      part: 'AOS',
      color: 'lime',
    },
    {
      name: '박세연',
      part: 'QA',
      color: 'orange',
    },
  ];

  return (
    <div style={wrapper}>
      <Divider orientation="center"><h1>NUTEE</h1></Divider>

      <List
        style={listWrapper}
        bordered
        dataSource={list}
        renderItem={(item) => (
          <List.Item>
            {item.name}
            <Tag style={tagWrapper} color={item.color}>{item.part}</Tag>
          </List.Item>
        )}
      />

    </div>
  );
};

export default DeveloperInfomation;
