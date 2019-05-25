// node_modules
import React from 'react';
import { PageHeader } from 'antd';
import { Button } from 'antd';
import { Tabs } from 'antd';
import 'antd/dist/antd.css';
// me
import ReportPane from './ReportPane';
import BrainnowIcon from './asset/brainnow-icon.svg';
import './AisOnlineViewer.css';

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
    return (
    <Tabs defaultActiveKey="ASPECT">
      <TabPlane tab="Report" key="Report">
        <ReportPane></ReportPane>
      </TabPlane>
      <TabPlane tab="ASPECT" key="ASPECT"></TabPlane>
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
    console.log(BrainnowIcon)
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