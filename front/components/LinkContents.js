import React, { useMemo } from 'react';
import Link from 'next/link';
import { List } from 'antd';

const data = [
  {
    icon: 'BookOutlined',
    title: '성공회대학교',
    link: 'http://skhu.ac.kr/',
  },
  {
    title: 'LMS',
    link: 'http://lms.skhu.ac.kr/',
  },
  {
    title: '종합정보시스템',
    link: 'https://forest.skhu.ac.kr/',
  },
  {
    title: '학사행정시스템',
    link: 'http://sam.skhu.ac.kr/',
  },
  {
    title: '중앙도서관',
    link: 'https://library.skhu.ac.kr/',
  },
  {
    title: 'e커리어센터',
    link: 'https://ecareer.skhu.ac.kr/',
  },
  {
    title: '행복기숙사',
    link: 'https://skhu.happydorm.or.kr/',
  },
];

const LinkContents = () => {
  const wrapper = useMemo(() => ({ marginTop: '15px' }), []);
  const listwrapper = useMemo(() => ({ height: '20px' }), []);
  return (
    <List
      style={wrapper}
      bordered
      dataSource={data}
      renderItem={(item) => (
        <List.Item>
          <List.Item.Meta
            style={listwrapper}
            title={(
              <Link href={item.link}>
                <a target="_blank" rel="noreferrer">
                  {item.title}
                </a>
              </Link>
              )}
          />
        </List.Item>
      )}
    />
  );
};

export default LinkContents;
