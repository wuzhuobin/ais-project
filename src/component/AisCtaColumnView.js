// node_modules
import React from 'react';
import { withTranslation } from 'react-i18next';
import { Row, Col } from 'antd';
//
import './AisCtaColumnView.css';

class AisCtaColumnView extends React.Component {
  render() {
    const t = this.props.t;
    return (
      <div className="AisCtaColumnView">
        <Row>
          <Col span={12}>
            <img src="Data/i am jpg.jpg" alt="i am jpg"></img>
          </Col>
            <img src="Data/i am jpg.jpg" alt="i am jpg"></img>
        </Row>
        <Row>
          <Col span={12}>
            <img src="Data/i am jpg.jpg" alt="i am jpg"></img>
          </Col>
            <img src="Data/i am jpg.jpg" alt="i am jpg"></img>
        </Row>
        <Row>
          <Col span={12}>
            <img src="Data/i am jpg.jpg" alt="i am jpg"></img>
          </Col>
            <img src="Data/i am jpg.jpg" alt="i am jpg"></img>
        </Row>
      </div>
    );
  }
}

export default withTranslation()(AisCtaColumnView);