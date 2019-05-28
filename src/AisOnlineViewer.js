// node_modules
import React from 'react';
import { Tabs } from 'antd';
// me
import AisReportPane from './AisReportPane';
import AisAspectPane from './AisAspectPane';
import './AisOnlineViewer.css';

const TabPlane = Tabs.TabPane;

export default class AisOnlineViewer extends React.Component {

  render() {
    return (
      <Tabs defaultActiveKey="ASPECT">
        <TabPlane tab="Report" key="Report">
          <AisReportPane></AisReportPane>
        </TabPlane>
        <TabPlane tab="ASPECT" key="ASPECT">
          <AisAspectPane></AisAspectPane>
        </TabPlane>
        <TabPlane tab="CTA" key="CTA"></TabPlane>
        <TabPlane tab="Mismatch" key="Mismatch"></TabPlane>
      </Tabs>
    );
  }
}