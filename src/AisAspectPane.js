// node_modules
import React from 'react';
import { Layout } from 'antd';
import { Row, Col } from 'antd';
import { Button } from 'antd';
// me
import './AisAspectPane.css';
import AisCornerstoneImageViewer from './component/ais-cornerstone';
import CornerstoneElement from'./component/ais-cornerstone-viewport'

const { Header, Footer, Sider, Content} = Layout;

const imageId = "https://rawgit.com/cornerstonejs/cornerstoneWebImageLoader/master/examples/Renal_Cell_Carcinoma.jpg";

const stack = {
  imageIds: [imageId],
  currentImageIdIndex: 0
};

const layer = [{
                  imageId: 'nifti://' + window.location.hostname + ':' +
                            window.location.port + '/NiftiData/image.nii.gz',
                  options: {
                             name: 'CT',
                             opacity: 1,
                             viewport:{ voi: {windowWidth:80, windowCenter:40}}
                           }
                },
                {
                  imageId: 'nifti://' + window.location.hostname + ':' +
                            window.location.port +'/NiftiData/bet.nii.gz',
                  options: {
                             name: 'Label',
                             opacity: 0.2,
                             viewport: {
                                  colormap: 'autumn',
                                  voi: {
                                      windowWidth: 0.1,
                                      windowCenter: 0.5
                                       }
                                      }
                            }
                }];


export default class AisAspectPane extends React.Component {
  render() {
    return (
      <div>
        <Row>
          <Col span={8}>

          </Col>
          <Col span={8}>
            <CornerstoneElement stack={{...stack}} layers = {layer} />  
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

//                     <AisCornerstoneImageViewer></AisCornerstoneImageViewer>   