// node_modules
import React from 'react';
import { Row, Col } from 'antd';
// import { Button } from 'antd';
// me
import './AisAspectPane.css';
import AisCornerstoneImageViewer from './component/ais-cornerstone';
import AisHousefieldUnitMean from './component/AisHousefieldUnitMean';
import CornerstoneViewer from'./component/ais-cornerstone-viewer'

// const { Header, Footer, Sider, Content} = Layout;


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

const layer1 = [{
                  imageId: 'nifti://' + window.location.hostname + ':' +
                            window.location.port + '/NiftiData/image.nii.gz',
                  options: {
                             name: 'CT',
                             opacity: 1,
                             viewport:{ voi: {windowWidth:80, windowCenter:40}}
                           }
                }];

export default class AisAspectPane extends React.Component {
  render() {
    return (
      <div className="AisAspectPane">
        <Row>
          <Col span={8}>
            <CornerstoneViewer layers = {[layer[0]]} renderScrollbar = {false}/> 
          </Col>
          <Col span={8}>
            <CornerstoneViewer layers = {layer} renderScrollbar = {true}/>  
          </Col>
          <Col span={8}>
            <AisHousefieldUnitMean></AisHousefieldUnitMean>
          </Col>
        </Row>
        <Row>
          <Col span={4}></Col>
          <Col span={4}></Col>
          <Col span={4}>
            {/* <Button>WindowLevel</Button> */}
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