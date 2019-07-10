// node_modules
import React from 'react';
import { withTranslation } from 'react-i18next';
import { Row, Col } from 'antd';
//
import './AisCtaColumnView.css';
import ColorBarEn from '../asset/BloodVesselDensity.jpg';
import ColorBarZh from '../asset/XueMiDu.jpg';
import PropTypes from 'prop-types';

class AisCtaColumnView extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const t = this.props.t;

    const images = ['', ''];
    if(this.props.imageOrientation === AisCtaColumnView.ORIENTATION.SAGITTAL) {
      images[0] = [
        this.props.imagePrefix,
        AisCtaColumnView.POSITION.LEFT,
      ].join('_') + '.' + this.props.imageExtensionName;
      images[1] = [
        this.props.imagePrefix,
        AisCtaColumnView.POSITION.RIGHT,
      ].join('_') + '.' + this.props.imageExtensionName;
    }
    else {
      images[0] = [
        this.props.imagePrefix,
        this.props.imageOrientation,
      ].join('_') + '.' + this.props.imageExtensionName;
      images[1] = [
        this.props.imagePrefix,
        this.props.imageOrientation,
        this.props.imagePosition
      ].join('_') + '.' + this.props.imageExtensionName;
    }
    const ColorBars = {
      BloodVesselDensity: ColorBarEn,
      XueMiDu: ColorBarZh
    };
    return (
      <div className="AisCtaColumnView">
        <Row className="Row" type="flex" align="middle">
          <Col className="Col" span={11}>
            <img className="BrainImg" src={images[0]} alt={images[0]}></img>
          </Col>
          <Col className="Col" span={2}>
            <img className="ColorBar" src={ColorBars[t('BloodVesselDensity')]} alt="ColorBar"></img>
          </Col>
          <Col className="Col" span={11}>
            <img className="BrainImg" src={images[1]} alt={images[1]}></img>
          </Col>
        </Row>
      </div>
    );
  }
}
AisCtaColumnView.POSITION = {
  ANTERIOR: 'ACA',
  MIDDLE: 'MCA',
  POSTERIOR: 'PCA',
  LEFT: 'Left',
  RIGHT: 'Right',
}
AisCtaColumnView.ORIENTATION = {
  AXIAL: 'Axial',
  CORONAL: 'Coronal',
  SAGITTAL: 'Sagittal',
};
AisCtaColumnView.propTyps = {
  imagePrefix: PropTypes.string,
  imageOrientation: PropTypes.string,
  imagePosition: PropTypes.string,
  imageExtensionName: PropTypes.string,
};
AisCtaColumnView.defaultProps = {
  imagePrefix: '2D_MIP',
  imageOrientation: AisCtaColumnView.ORIENTATION.AXIAL,
  imagePosition: AisCtaColumnView.POSITION.ANTERIOR,
  imageExtensionName: 'png',
};
let AisCtaColumnViewT = withTranslation()(AisCtaColumnView);
AisCtaColumnViewT.POSITION = AisCtaColumnView.POSITION;
AisCtaColumnViewT.ORIENTATION = AisCtaColumnView.ORIENTATION;
export default AisCtaColumnViewT;