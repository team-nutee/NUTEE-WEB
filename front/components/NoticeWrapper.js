import { Tabs } from 'antd';
import styled from 'styled-components';

const NoticeTabs = styled(Tabs)`
.ant-tabs-nav{
    background: white;
    width: 18vw;
    min-width: 187px;
    max-width: 260px;
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
}
`;

export default NoticeTabs;
