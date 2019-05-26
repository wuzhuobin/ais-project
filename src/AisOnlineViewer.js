// node_modules
import React from 'react';
import { PageHeader } from 'antd';
import { Button } from 'antd';
import { Tabs } from 'antd';
import 'antd/dist/antd.css';
import CornerstoneViewport from 'react-cornerstone-viewport';
import Cornerstone from 'cornerstone-core';
import CornerstoneTools from 'cornerstone-tools';
// me
import ReportPane from './ReportPane';
import BrainnowIcon from './asset/brainnow-icon.svg';
import './AisOnlineViewer.css';
import './initCornerstone';

const TabPlane = Tabs.TabPane;

class PatientInfo extends React.Component {
  render() {
    return (
      <table className="PatientInfo">
        <tbody>
          <tr>
            <td>Patient ID:</td>
            <td>A123456</td>
            <td>Gender:</td>
            <td>M</td>
            <td>Affected side:</td>
            <td>left</td>
          </tr>
          <tr>
            <td>Name:</td>
            <td>Chai Tai Man</td>
            <td>Scan time:</td>
            <td>May 14 2019 11:26</td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </table>
    );
  }
};

class LanguageButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: LanguageButton.enText
    };
    this.onClickListener = this.onClickListener.bind(this);
  }
  render() {
    return (
      <Button onClick={this.onClickListener}>{this.state.text}</Button>
    )
  }
  onClickListener() {
    if (this.state.text === LanguageButton.enText) {
      this.setState({ text: LanguageButton.zhText });
    }
    else {
      this.setState({ text: LanguageButton.enText });
    }
  }
};

LanguageButton.zhText = 'Chinese/中文';
LanguageButton.enText = "English/英文";

class TabViewers extends React.Component {

  render() {
    const exampleData = {
      stack: {
        currentImageIdIndex: 0,
        imageIds: [
          "dicomweb://s3.amazonaws.com/lury/PTCTStudy/1.3.6.1.4.1.25403.52237031786.3872.20100510032220.11.dcm",
          "dicomweb://s3.amazonaws.com/lury/PTCTStudy/1.3.6.1.4.1.25403.52237031786.3872.20100510032220.12.dcm"
        ],
      }
    };
    return (
      <Tabs defaultActiveKey="Report">
        <TabPlane tab="Report" key="Report">
          <ReportPane></ReportPane>
        </TabPlane>
        <TabPlane tab="ASPECT" key="ASPECT">
          <div style={{height: '80vh'}}>
          <CornerstoneViewport
            viewportData={exampleData}
            cornerstone={Cornerstone}
            cornerstoneTools={CornerstoneTools}
            >
          </CornerstoneViewport></div>
        </TabPlane>
        <TabPlane tab="CTA" key="CTA"></TabPlane>
        <TabPlane tab="Mismatch" key="Mismatch"></TabPlane>
      </Tabs>
    );
  }
}

export default class AisOnlineViewer extends React.Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    return (
      <div>
        <PageHeader title={<img src={BrainnowIcon} 
          alt="BrainnowIcon"
          className="BrainnowIcon"></img>}
          extra={<LanguageButton></LanguageButton>}
        >
        </PageHeader>
        <PatientInfo></PatientInfo>
        <TabViewers></TabViewers>
      </div>
    )
  }
}