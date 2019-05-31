// node_modules
import React from 'react';
import { Layout } from 'antd';
import { Slider } from 'antd';
import { Row, Col } from 'antd';
import { Button } from 'antd';
// me
import AisColorSelectionCard from './AisColorSelectionCard';
import { ORIENTATION } from './AisColorSelectionCard'; 

export default class AisHousefieldUnitMean extends React.Component {
  render() {
    return(
      <Layout>
        <Layout.Header><Button>HOUSE FIELD UNIT MEAN</Button></Layout.Header>
        <Layout>
          <Layout.Content>
            <Row>
              <Col span={12}>
                <AisColorSelectionCard orientation={ORIENTATION.LEFT} affected={false}></AisColorSelectionCard>
              </Col>
              <Col span={12}>
                <AisColorSelectionCard orientation={ORIENTATION.RIGHT} affected={true}></AisColorSelectionCard>
              </Col>
            </Row>
          </Layout.Content>
        </Layout>
          <Layout.Footer className="Footer">
            Score<br/>7
            <Slider></Slider>
          </Layout.Footer>
      </Layout>
    );
  }
}