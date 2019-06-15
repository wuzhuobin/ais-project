// node_modules
import React from 'react';
import { Tabs } from 'antd';
// me
import AisReportPane from './AisReportPane';
import AisAspectPane from './AisAspectPane';
import AisCtaPane from './AisCtaPane';
import './AisOnlineViewer.css';
import AppContext from './AppContext';

export default class AisOnlineViewer extends React.Component {
  render() {
    return (
      <div className="AisOnlineViewer" >
        <Tabs type='card' defaultActiveKey="ASPECT">
          {
            this.context.infoAis.Loaded_Module.Report === 'True' ?
              <Tabs.TabPane tab="Report" key="Report" >
                <AisReportPane></AisReportPane>
              </Tabs.TabPane>
              :
              null
          }
          {
            this.context.infoAis.Loaded_Module.ASPECT === 'True' ?
              <Tabs.TabPane tab="ASPECT" key="ASPECT">
                <AisAspectPane></AisAspectPane>
              </Tabs.TabPane>
              :
              null
          }
          {
            this.context.infoAis.Loaded_Module.CTA === 'True' ?
              <Tabs.TabPane tab="CTA" key="CTA">
                <AisCtaPane></AisCtaPane>
              </Tabs.TabPane>
              :
              null
          }
          {
            this.context.infoAis.Loaded_Module.Mismatch === 'True' ?
              <Tabs.TabPane tab="Mismatch" key="Mismatch"></Tabs.TabPane>
              :
              null
          }
        </Tabs>
      </div>
    );
  }
}

AisOnlineViewer.contextType = AppContext;