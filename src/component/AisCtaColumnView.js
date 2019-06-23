// node_modules
import React from 'react';
import { withTranslation } from 'react-i18next';
import { Row, Col } from 'antd';
//
import './AisCtaColumnView.css';
import ColorBar from '../asset/color-bar.png';

class AisCtaColumnView extends React.Component {
  render() {
    const t = this.props.t;
    return (
      <div className="AisCtaColumnView">
        <Row className="Row" type="flex" justify="space-around" align="middle">
          <Col span={6}>
            <img src="Data/i am jpg.jpg" alt="i am jpg"></img>
          </Col>
          <Col span={6}>
            <img src={ColorBar} alt="ColorBar"></img>
            <img src="Data/i am jpg.jpg" alt="i am jpg"></img>
          </Col>
        </Row>
        <Row className="Row" type="flex" justify="space-around" align="middle">
          <Col span={6}>
            <img src="Data/i am jpg.jpg" alt="i am jpg"></img>
          </Col>
          <Col span={6}>
            <img src={ColorBar} alt="ColorBar"></img>
            <img src="Data/i am jpg.jpg" alt="i am jpg"></img>
          </Col>
        </Row>
        <Row className="Row" type="flex" justify="space-around" align="middle">
          <Col span={6}>
            <img src="Data/i am jpg.jpg" alt="i am jpg"></img>
          </Col>
          <Col span={6}>
            <img src="Data/i am jpg.jpg" alt="i am jpg"></img>
          </Col>
        </Row>
      </div>
    );
  }
}

export default withTranslation()(AisCtaColumnView);