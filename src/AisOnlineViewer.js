// node_modules
import React from 'react';
import { Tabs } from 'antd';
// me
import AisReportPane from './AisReportPane';
import AisAspectPane from './AisAspectPane';
import './AisOnlineViewer.css';

export default class AisOnlineViewer extends React.Component {

  render() {
    return (
      <div className="AisOnlineViewer" >
      <Tabs type='card' defaultActiveKey="ASPECT">
        <Tabs.TabPane tab="Report" key="Report">
          <AisReportPane></AisReportPane>
        </Tabs.TabPane>
        <Tabs.TabPane tab="ASPECT" key="ASPECT">
          <AisAspectPane></AisAspectPane>
        </Tabs.TabPane>
        <Tabs.TabPane tab="CTA" key="CTA"></Tabs.TabPane>
        <Tabs.TabPane tab="Mismatch" key="Mismatch"></Tabs.TabPane>
      </Tabs>
      </div>
    );
  }
}