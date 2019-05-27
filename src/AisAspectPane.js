// node_modules
import React from 'react';
import { Layout } from 'antd';
import { Row, Col } from 'antd';
import { Button } from 'antd';
// me
import './AisAspectPane.css';
import AisCornerstoneImageViewer from './component/ais-cornerstone';

const { Header, Footer, Sider, Content} = Layout;

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
            <Layout>
              <Header><Button>HOUSE FIELD UNIT MEAN</Button></Header>
              <Layout>
                <Content>
                  <Row>
                    <Col span={12}>Right</Col>
                    <Col span={12}>Left</Col>
                  </Row>
                </Content>
              </Layout>
              <Footer>Score: 7</Footer>
            </Layout>
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