// node_modules
import React from 'react';
import { Row, Col } from 'antd';
import { Button } from 'antd';
// me
import './AisAspectPane.css';
import AisCornerstoneImageViewer from './component/ais-cornerstone';
import AisHousefieldUnitMean from './component/AisHousefieldUnitMean';

export default class AisAspectPane extends React.Component {
  render() {
    return (
      <div>
        <Row>
          <Col span={8}>
            <AisCornerstoneImageViewer></AisCornerstoneImageViewer>
          </Col>
          <Col span={8}>
            <AisCornerstoneImageViewer></AisCornerstoneImageViewer>
          </Col>
          <Col span={8}>
            <AisHousefieldUnitMean></AisHousefieldUnitMean>
          </Col>
        </Row>
        <Row>
          <Col span={4}></Col>
          <Col span={4}></Col>
          <Col span={4}>
            <Button>WindowLevel</Button>
          </Col>
          <Col span={4}></Col>
          <Col span={4}></Col>
          <Col span={4}></Col>
        </Row>
      </div>
    );
  }
}