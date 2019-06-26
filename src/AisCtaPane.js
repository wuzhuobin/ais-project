// node_modules
import React from 'react';
import { Tabs } from 'antd';
import { Row, Col } from 'antd';
import { withTranslation } from 'react-i18next';
//
import './AisCtaPane.css';
import AisCtaColumnViewer from './component/AisCtaColumnView';
import Ais3DViewer from './component/AisCta3DView';
import AisCtaPanel from './component/AisCtaPanel';

class AisCtaPane extends React.Component {
  // constructor(props) {
  //   super(props);
  // }
  render() {
    const t = this.props.t;
    return (
      <Row className="AisCtaPane"> 
        <Col span={16}>
          <Tabs
            defaultActiveKey="Column View"
            tabPosition="bottom"
          >
            <Tabs.TabPane
              className="TabPane"
              tab={<span className="Tab">{t('Column View')}</span>}
              key="Column View"
            >
              <AisCtaColumnViewer></AisCtaColumnViewer>
            </Tabs.TabPane>
            <Tabs.TabPane
              className="TabPane"
              tab={<span className="Tab">{t('3D View')}</span>}
              key="3D View"
            >
              <Ais3DViewer></Ais3DViewer>
            </Tabs.TabPane>
          </Tabs>
        </Col>
        <Col span={8}>
          <AisCtaPanel></AisCtaPanel>
        </Col>
      </Row>
    );
  }
}

export default withTranslation()(AisCtaPane);