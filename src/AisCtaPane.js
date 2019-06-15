// node_modules
import React from 'react';
import { Tabs } from 'antd';
import { withTranslation } from 'react-i18next';
//
import AisCtaColumnViewer from './component/AisCtaColumnView';

class AisCtaPane extends React.Component {
  // constructor(props) {
  //   super(props);
  // }
  render() {
    const t = this.props.t;
    return (
    <Tabs defaultActiveKey="Column View">
      <Tabs.TabPane
        tab={t('Column View')}
        key="Column View"
      >
        <AisCtaColumnViewer></AisCtaColumnViewer>
      </Tabs.TabPane>
      <Tabs.TabPane
        tab={t('3D View')}
        key="3D View"
      ></Tabs.TabPane>
    </Tabs>);
  }
}

export default withTranslation()(AisCtaPane);