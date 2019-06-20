// node_modules
import React from 'react';
import { Row, Col } from 'antd';
// import { Button } from 'antd';
// me
import './AisAspectPane.css';
import AisCornerstoneImageViewer from './component/ais-cornerstone';
import AisHousefieldUnitMean from './component/AisHousefieldUnitMean';
import CornerstoneViewer from'./component/ais-cornerstone-viewer';
import AppContext from './AppContext';
// const { Header, Footer, Sider, Content} = Layout;

export default class AisAspectPane extends React.Component {
  GetUrlParam(paraName) {
  var url = document.location.toString();
  var arrObj = url.split("?");

  if (arrObj.length > 1) {
  　　var arrPara = arrObj[1].split("&");
  　　var arr;

  　　for (var i = 0; i < arrPara.length; i++) {
    arr = arrPara[i].split("=");

    if (arr != null && arr[0] == paraName) {
    　　return arr[1];
    }
  　　}
  　　return "";
  }
  else {
  　　return "";
  }
}


  render() {
      const layer = [{
                  imageId: 'nifti://' + "file.brainnow.net/ais/" + this.GetUrlParam("user") + "/" + this.GetUrlParam("path") +'/image.nii.gz',

                    options: {
                               name: 'CT',
                               opacity: 1,
                               viewport:{ voi: {windowWidth:80, windowCenter:40}}
                             }
                  },
                  {
                    imageId: 'nifti://' + "file.brainnow.net/ais/" + this.GetUrlParam("user") + "/" + this.GetUrlParam("path") +'/image-atlas-contour.nii.gz',
                    options: {
                               name: 'Label',
                               opacity: 1,
                               viewport: {
                                    colormap: 'myCustomColorMap1',
                                    voi: {
                                        windowWidth: 255,
                                        windowCenter: 127.5
                                         }
                                        }
                              }
                  },
                  {
                    imageId: 'nifti://' + "file.brainnow.net/ais/" + this.GetUrlParam("user") + "/" + this.GetUrlParam("path") +'/image-ais.nii.gz',
                    options: {
                               name: 'Label2',
                               opacity: 0.4,
                               viewport: {
                                    colormap: 'myCustomColorMap2',
                                    voi: {
                                        windowWidth: 255,
                                        windowCenter: 127.5
                                         }
                                        }
                              }
                  }];

  const layer1 = [{
                    imageId: 'nifti://' + window.location.hostname + ':' + window.location.port + 
                              this.context.workingDir + '/image.nii.gz',
                    options: {
                               name: 'CT',
                               opacity: 1,
                               viewport:{ voi: {windowWidth:80, windowCenter:40}}
                             }
                  }];

    console.log("ertyuifghjkfghjk")
    console.log(this.context)

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

AisAspectPane.contextType = AppContext;