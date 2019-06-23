// node_modules
import React from 'react';
import { Row, Col } from 'antd';
import cornerstone from 'cornerstone-core';
import cornerstoneTools from 'cornerstone-tools';
// me
import './AisAspectPane.css';
import AisHousefieldUnitMean from './component/AisHousefieldUnitMean';
import CornerstoneLayerViewport from './component/ais-cornerstone/CornerstoneLayerViewport';
import stackLayerIndexSynchronizer from './component/ais-cornerstone/stackLayerIndexSynchronizer';
import AppContext from './AppContext';

export default class AisAspectPane extends React.Component {
  constructor(props) {
    super(props);
    this.viewerRef1 = React.createRef();
    this.viewerRef2 = React.createRef();
    let colormap = cornerstone.colors.getColormap('myCustomColorMap1');
    colormap.setNumberOfColors(256);
    colormap.insertColor(0, [0, 0, 0, 0]);
    colormap.insertColor(1, [255, 238, 88, 255]);
    colormap.insertColor(2, [156, 204, 101, 255]);
    colormap.insertColor(3, [41, 182, 246, 255]);
    colormap.insertColor(4, [92, 107, 192, 255]);
    colormap.insertColor(5, [120, 144, 156, 255]);
    colormap.insertColor(6, [255, 167, 38, 255]);
    colormap.insertColor(7, [38, 166, 154, 255]);
    colormap.insertColor(8, [102, 187, 106, 255]);
    colormap.insertColor(9, [141, 110, 99, 255]);
    colormap.insertColor(10, [171, 71, 188, 255]);
    colormap.insertColor(11, [255, 238, 88, 255]);
    colormap.insertColor(12, [156, 204, 101, 255]);
    colormap.insertColor(13, [41, 182, 246, 255]);
    colormap.insertColor(14, [92, 107, 192, 255]);
    colormap.insertColor(15, [120, 144, 156, 255]);
    colormap.insertColor(16, [255, 167, 38, 255]);
    colormap.insertColor(17, [38, 166, 154, 255]);
    colormap.insertColor(18, [102, 187, 106, 255]);
    colormap.insertColor(19, [141, 110, 99, 255]);
    colormap.insertColor(20, [171, 71, 188, 255]);

    colormap = cornerstone.colors.getColormap('myCustomColorMap2');
    colormap.setNumberOfColors(256);
    colormap.insertColor(0, [0, 0, 0, 0]);
    colormap.insertColor(1, [255, 0, 0, 256]);
  }
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
      imageId: 'nifti://file.brainnow.net/ais/brainnow1/BN-DG-S100053-037f32e9-acf7-4898-a295-04de06264299/image.nii.gz',
      options: {
        name: 'CT',
        opacity: 1,
        viewport: { voi: { windowWidth: 80, windowCenter: 40 } }
      }
    },
    {
      imageId: 'nifti://file.brainnow.net/ais/brainnow1/BN-DG-S100053-037f32e9-acf7-4898-a295-04de06264299/image-atlas-contour.nii.gz',
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
      // imageId: 'nifti://' + "file.brainnow.net/ais/" + this.GetUrlParam("user") + "/" + this.GetUrlParam("path") + '/image-ais.nii.gz',
      imageId: 'nifti://file.brainnow.net/ais/brainnow1/BN-DG-S100053-037f32e9-acf7-4898-a295-04de06264299/image-ais.nii.gz',
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

    return (
      <div className="AisAspectPane">
        <Row>
          <Col span={8}>
            <div className="CornerstoneLayerViewport">
              <CornerstoneLayerViewport 
                viewportData={[layer[0]]}
                scrollbarFlag={false}
                ref={this.viewerRef1}
              ></CornerstoneLayerViewport>
            </div>
          </Col>
          <Col span={8}>
            <div className="CornerstoneLayerViewport">
              <CornerstoneLayerViewport 
                viewportData={layer}
                ref={this.viewerRef2 }
              ></CornerstoneLayerViewport>
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
  
  componentDidMount() {
    const synchronizer = new cornerstoneTools.Synchronizer(cornerstoneTools.EVENTS.STACK_SCROLL, stackLayerIndexSynchronizer);
    synchronizer.add(this.viewerRef1.current.element);
    synchronizer.add(this.viewerRef2.current.element);
    synchronizer.enabled = true;
  }
}


AisAspectPane.contextType = AppContext;