// node_modules
import React from 'react';
import { Tabs } from 'antd';
import { withTranslation } from 'react-i18next';
//
import './AisCtaPane.css';
import AisCtaColumnViewer from './component/AisCtaColumnView';
import Ais3DViewer from './component/AisCta3DView';

class AisCtaPane extends React.Component {
  // constructor(props) {
  //   super(props);
  // }
  render() {
    const t = this.props.t;
    return (
      <div className="AisCtaPane">
        <Tabs
          defaultActiveKey="Column View"
          tabPosition="bottom"
        >
          <Tabs.TabPane
            className="TabPane"
            tab={t('Column View')}
            key="Column View"
          >
            <AisCtaColumnViewer></AisCtaColumnViewer>
          </Tabs.TabPane>
          <Tabs.TabPane
            className="TabPane"
            tab={t('3D View')}
            key="3D View"
          >
            <Ais3DViewer></Ais3DViewer>
          </Tabs.TabPane>
        </Tabs>
      </div>
    );
  }
}

export default withTranslation()(AisCtaPane);