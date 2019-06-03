// node_modules
import React from 'react';
import { Layout } from 'antd';
import { Slider } from 'antd';
import { Row, Col } from 'antd';
// me
import AisColorSelectionCard from './AisColorSelectionCard';
import './AisHousefieldUnitMean.css';
import { ORIENTATION } from './AisColorSelectionCard';
import AppContext from '../AppContext';

export default class AisHousefieldUnitMean extends React.Component {
  render() {
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
          Score<br />{this.context.infoAis.ASPECT_Final_Score}<br/>
          Confident Level
            <Slider disabled={false} value={Number.parseInt(this.context.infoAis.ASPECT_Final_Score)} max={10} min={0}></Slider>
        </Layout.Footer>
      </Layout>
    );
  }
}

AisHousefieldUnitMean.contextType = AppContext;