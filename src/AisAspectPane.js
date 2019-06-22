// node_modules
import React from 'react';
import { Row, Col } from 'antd';
import cornerstone from 'cornerstone-core';
// import { Button } from 'antd';
// me
import './AisAspectPane.css';
import AisHousefieldUnitMean from './component/AisHousefieldUnitMean';
import CornerstoneLayerViewport from './component/ais-cornerstone/CornerstoneLayerViewport';
// import CornerstoneViewport from './component/react-cornerstone-viewport/src/index';
import AppContext from './AppContext';
// import AisLayerImageViewer from './component/ais-cornerstone/AisLayerImageViewer';
// const { Header, Footer, Sider, Content} = Layout;

export default class AisAspectPane extends React.Component {
<<<<<<< HEAD
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


=======
  constructor(props) {
    super(props);

    let colormap;
    colormap = cornerstone.colors.getColormap('myCustomColorMap1');
    colormap.setNumberOfColors(256);
    colormap.insertColor(0, [0,0,0,0]);
    colormap.insertColor(1, [255, 238, 88,  255]);
    colormap.insertColor(2, [156, 204, 101, 255]);
    colormap.insertColor(3, [41,  182, 246, 255]);
    colormap.insertColor(4, [92,  107, 192, 255]);
    colormap.insertColor(5, [120, 144, 156, 255]);
    colormap.insertColor(6, [255, 167, 38,  255]);
    colormap.insertColor(7, [38,  166, 154, 255]);
    colormap.insertColor(8, [102, 187, 106, 255]);
    colormap.insertColor(9, [141, 110, 99,  255]);
    colormap.insertColor(10,[171, 71,  188, 255]); 
    colormap.insertColor(11, [255, 238, 88,  255]);
    colormap.insertColor(12, [156, 204, 101, 255]);
    colormap.insertColor(13, [41,  182, 246, 255]);
    colormap.insertColor(14, [92,  107, 192, 255]);
    colormap.insertColor(15, [120, 144, 156, 255]);
    colormap.insertColor(16, [255, 167, 38,  255]);
    colormap.insertColor(17, [38,  166, 154, 255]);
    colormap.insertColor(18, [102, 187, 106, 255]);
    colormap.insertColor(19, [141, 110, 99,  255]);
    colormap.insertColor(20,[171, 71,  188, 255]);    

    colormap = cornerstone.colors.getColormap('myCustomColorMap2');
    colormap.setNumberOfColors(256);
  
    colormap.insertColor(0, [0,0,0,0]);
    colormap.insertColor(1, [255, 0, 0, 255]);  
  }
>>>>>>> CornerstoneLayerViewport created
  render() {
      const layer = [{
                  imageId: 'nifti://' + "file.brainnow.net/ais/" + this.GetUrlParam("user") + "/" + this.GetUrlParam("path") +'/image.nii.gz',

<<<<<<< HEAD
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

    // const layer1 = [{
    //   imageId: 'nifti://' + window.location.hostname + ':' + window.location.port +
    //     this.context.workingDir + '/image.nii.gz',
    //   options: {
    //     name: 'CT',
    //     opacity: 1,
    //     viewport: { voi: { windowWidth: 80, windowCenter: 40 } }
    //   }
    // }];

    console.log("ertyuifghjkfghjk")
    console.log(this.context)
=======
      options: {
        name: 'CT',
        opacity: 1,
        viewport: { voi: { windowWidth: 80, windowCenter: 40 } }
      }
    },
    {
      imageId: 'nifti://' + window.location.hostname + ':' + window.location.port + '/NiftiData/image-atlas-contour.nii.gz',
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
      imageId: 'nifti://' + window.location.hostname + ':' + window.location.port + '/NiftiData/image-ais.nii.gz',
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
>>>>>>> CornerstoneLayerViewport created

    return (
      <div className="AisAspectPane">
        <Row>
          <Col span={8}>
            <div className="CornerstoneLayerViewport">
              <CornerstoneLayerViewport viewportData={[layer[0]]}></CornerstoneLayerViewport>
            </div>
          </Col>
          <Col span={8}>
            <div className="CornerstoneLayerViewport">
              <CornerstoneLayerViewport viewportData={layer}></CornerstoneLayerViewport>
            </div>
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