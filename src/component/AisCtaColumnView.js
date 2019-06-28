// node_modules
import React from 'react';
import { withTranslation } from 'react-i18next';
import { Row, Col } from 'antd';
//
import './AisCtaColumnView.css';
import ColorBar from '../asset/color-bar.png';
import PropTypes from 'prop-types';

class AisCtaColumnView extends React.Component {
  // constructor(props) {
  //   super(props);
  // }
  render() {
    const t = this.props.t;
    const axial = [
      [
        this.props.imagePrefix,
        AisCtaColumnView.ORIENTATION.AXIAL
      ].join('_') + '.' + this.props.imageExtensionName,
      [
        this.props.imagePrefix,
        AisCtaColumnView.ORIENTATION.AXIAL,
        this.props.imagePosition,
      ].join('_') + '.' + this.props.imageExtensionName
    ];
    const coronal = [
      [
        this.props.imagePrefix,
        AisCtaColumnView.ORIENTATION.CORONAL,
      ].join('_') + '.' + this.props.imageExtensionName,
      [
        this.props.imagePrefix,
        AisCtaColumnView.ORIENTATION.CORONAL,
        this.props.imagePosition,
      ].join('_') + '.' + this.props.imageExtensionName
    ];
    const leftRight = [
      [
        this.props.imagePrefix,
        AisCtaColumnView.ORIENTATION.LEFT
      ].join('_') + '.' + this.props.imageExtensionName,
      [
        this.props.imagePrefix,
        AisCtaColumnView.ORIENTATION.RIGHT
      ].join('_') + '.' + this.props.imageExtensionName,
    ]
    return (
      <div className="AisCtaColumnView">
        <Row className="Row" type="flex" justify="space-around" align="middle">
          <Col span={6}>
            <img src={axial[0]} alt={axial[0]}></img>
          </Col>
          <Col span={6}>
            <img src={ColorBar} alt="ColorBar"></img>
            <img src={axial[1]} alt={axial[1]}></img>
          </Col>
        </Row>
        <Row className="Row" type="flex" justify="space-around" align="middle">
          <Col span={6}>
            <img src={coronal[0]} alt={coronal[0]}></img>
          </Col>
          <Col span={6}>
            <img src={ColorBar} alt="ColorBar"></img>
            <img src={coronal[1]} alt={coronal[1]}></img>
          </Col>
        </Row>
        <Row className="Row" type="flex" justify="space-around" align="middle">
          <Col span={6}>
            <img src={leftRight[0]} alt={leftRight[0]}></img>
          </Col>
          <Col span={6}>
            <img src={leftRight[1]} alt={leftRight[1]}></img>
          </Col>
        </Row>
      </div>
    );
  }
}
AisCtaColumnView.POSITION = {
  ANTERIOR: 'ACA',
  MIDDLE: 'MCA', 
  POSTERIOR: 'PCA'
}
AisCtaColumnView.ORIENTATION = {
  AXIAL: 'Axial',
  CORONAL: 'Coronal',
  LEFT: 'Left',
  RIGHT: 'Right'
};
AisCtaColumnView.propTyps = {
  imagePrefix: PropTypes.string,
  imagePosition: PropTypes.string,
  imageExtensionName: PropTypes.string,
};
AisCtaColumnView.defaultProps = {
  imagePrefix: '2D_MIP',
  imagePosition: AisCtaColumnView.POSITION.MIDDLE,
  imageExtensionName: 'png',
};
let AisCtaColumnViewT = withTranslation()(AisCtaColumnView);
AisCtaColumnViewT.POSITION = AisCtaColumnView.POSITION;
AisCtaColumnViewT.ORIENTATION = AisCtaColumnView.ORIENTATION;
export default AisCtaColumnViewT;