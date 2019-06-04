// node_modules
import React from 'react';
import { Layout } from 'antd';
import { Slider } from 'antd';
import { Row, Col } from 'antd';
import { withTranslation } from 'react-i18next';
// me
import AisColorSelectionCard from './AisColorSelectionCard';
import './AisHousefieldUnitMean.css';
import { ORIENTATION } from './AisColorSelectionCard';
import AppContext from '../AppContext';

class AisHousefieldUnitMean extends React.Component {
  render() {
    const t = this.props.t;
    return (
      <Layout>
        <Layout.Header className="LayoutHeader">HOUSE FIELD UNIT MEAN</Layout.Header>
        <Layout>
          <Layout.Content>
            <Row>
              <Col span={12}>
                <AisColorSelectionCard
                  orientation={ORIENTATION.LEFT}
                  affected={this.context.infoAis.Affected_Side === 'L' ? true : false}
                >
                </AisColorSelectionCard>
              </Col>
              <Col span={12}>
                <AisColorSelectionCard
                  orientation={ORIENTATION.RIGHT}
                  affected={this.context.infoAis.Affected_Side === 'L' ? false : true}
                >
                </AisColorSelectionCard>
              </Col>
            </Row>
          </Layout.Content>
        </Layout>
        <Layout.Footer className="Footer">
          {t('Score')}<br />{this.context.infoAis.ASPECT_Final_Score}<br/>
          {t('Confident Level')}
            <Slider disabled={false} value={Number.parseInt(this.context.infoAis.ASPECT_Final_Score)} max={10} min={0}></Slider>
        </Layout.Footer>
      </Layout>
    );
  }
}

AisHousefieldUnitMean.contextType = AppContext;

export default withTranslation()(AisHousefieldUnitMean)