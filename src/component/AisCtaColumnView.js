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
    this.state = {
      imagePrefix: "",
    };
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

  componentWillMount() {
    var user = this.GetUrlParam("user");
    var path = this.GetUrlParam("path");

    console.log(user)
    console.log(path)

    const currentDir = "http://file.brainnow.net/ais/" + user + "/" + path
    this.setState({ imagePrefix: currentDir + "/2D_MIP" });
  }
  render() {
    const t = this.props.t;
    const axial = [
      [
        this.state.imagePrefix,
        AisCtaColumnView.ORIENTATION.AXIAL
      ].join('_') + '.' + this.props.imageExtensionName,
      [
        this.state.imagePrefix,
        AisCtaColumnView.ORIENTATION.AXIAL,
        this.props.imagePosition,
      ].join('_') + '.' + this.props.imageExtensionName
    ];
    const coronal = [
      [
        this.state.imagePrefix,
        AisCtaColumnView.ORIENTATION.CORONAL,
      ].join('_') + '.' + this.props.imageExtensionName,
      [
        this.state.imagePrefix,
        AisCtaColumnView.ORIENTATION.CORONAL,
        this.props.imagePosition,
      ].join('_') + '.' + this.props.imageExtensionName
    ];
    const leftRight = [
      [
        this.state.imagePrefix,
        AisCtaColumnView.ORIENTATION.LEFT
      ].join('_') + '.' + this.props.imageExtensionName,
      [
        this.state.imagePrefix,
        AisCtaColumnView.ORIENTATION.RIGHT
      ].join('_') + '.' + this.props.imageExtensionName,
    ];
    const ColorBars = {
      BloodVesselDensity: ColorBarEn,
      XueMiDu: ColorBarZh
    };
    return (
      <div className="AisCtaColumnView">
        <Row className="Row" type="flex" justify="space-around" align="middle">
          <Col span={6}>
            <img className="BrainImg" src={axial[0]} alt={axial[0]}></img>
          </Col>
          <Col span={6}>
            <Row>
              <Col span={6}>
                <img className="ColorBar" src={ColorBars[t('BloodVesselDensity')]} alt="ColorBar"></img>
              </Col>
              <Col span={18}>
                <img className="BrainImg" src={axial[1]} alt={axial[1]}></img>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row className="Row" type="flex" justify="space-around" align="middle">
          <Col span={6}>
            <img className="BrainImg" src={coronal[0]} alt={coronal[0]}></img>
          </Col>
          <Col span={6}>
            <Row>
              <Col span={6}>
                <img className="ColorBar" src={ColorBars[t('BloodVesselDensity')]} alt="ColorBar"></img>
              </Col>
              <Col span={18}>
                <img className="BrainImg" src={coronal[1]} alt={coronal[1]}></img>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row className="Row" type="flex" justify="space-around" align="middle">
          <Col span={6}>
            <img className="BrainImg" src={leftRight[0]} alt={leftRight[0]}></img>
          </Col>
          <Col span={6}>
            <img className="BrainImg" src={leftRight[1]} alt={leftRight[1]}></img>
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