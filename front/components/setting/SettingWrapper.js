import { Tabs } from 'antd';
import styled from 'styled-components';

const SettingTabs = styled(Tabs)`
.ant-tabs-nav{
  margin-top: 7px;
  width: 64vw;
  min-width: 730px;
  max-width: 960px;
 .ant-tabs-nav-wrap {
  .ant-tabs-nav-list {
      display: flex;
      justify-content: space-between;
      flex-direction: row;
      align-items: center;
      
      .ant-tabs-tab {
        margin-left: 1vw;
        margin-right: 0vw;
        padding: 0px;
        text-align: center;
        border-bottom-width: 0px;
        height: 30px;
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

export default SettingTabs;
