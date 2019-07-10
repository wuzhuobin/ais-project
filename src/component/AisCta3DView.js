// node_modules
import React from 'react';
import { withTranslation } from 'react-i18next';
import { Row, Col } from 'antd';
import { Button } from 'antd';
import { Slider } from 'antd';
import { InputNumber } from 'antd';
//
import './AisCta3DView.css';
import PropTypes from 'prop-types';
import AppContext from '../AppContext';

class AisCta3DView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      range: [0, 35],
      index: 0,
      fps: 500,
    };
    this.interval = null;
  }

  render() {
    let imagePath = [
      this.props.imagePrefix, 
      this.props.roi, 
      this.props.imageName1
    ].join('/');
    imagePath = (this.props.invFlag ?
      [imagePath, 'inv', this.props.imageName2, this.state.index] :
      [imagePath, this.props.imageName2, this.state.index]).join('_');
    imagePath = imagePath + '.' + this.props.imageExtensionName;

    return (
      <div className="AisCta3DView">
        <img className="Img" src={imagePath} alt={imagePath}></img>
        <Row type="flex" align="middle">
          <Col span={1}>
            <Button onClick={this.onClickListenerButtonPrevious.bind(this)}>|&lt;</Button>
          </Col>
          <Col span={1}>
            <Button onClick={this.onClickListenerButtonPlay.bind(this)}>&gt;</Button>
          </Col>
          {/* <Col span={2}>
            fps: 
            <InputNumber
              onChange={this.onChangeListenerInputNumber.bind(this)}
            ></InputNumber>
          </Col> */}
          <Col span={1}>
            <Button onClick={this.onClickListenerButtonNext.bind(this)}>&gt;|</Button>
          </Col>
          <Col span={1}>
            {this.state.index} / {this.state.range[1]}
          </Col>
          <Col span={19}>
            <Slider
              min={this.state.range[0]}
              max={this.state.range[1]}
              value={this.state.index}
              onChange={this.onChangeListenerSlider.bind(this)}
            ></Slider>
          </Col>
          <Col span={1}></Col>
        </Row>
      </div>
    );
  }
  onChangeListenerSlider(value) {
    this.setState({
      index: value
    });
  }

  onChangeListenerInputNumber(value) {
    this.setState({
      fps: value,
    });
  }

  onClickListenerButtonNext() {
    this.setState({
      index: this.state.index >= this.state.range[1] ? this.state.range[1] : ++this.state.index
    });
  }

  onClickListenerButtonPrevious() {
    this.setState({
      index: this.state.index <= this.state.range[0] ? this.state.range[0] : --this.state.index
    });
  }

  onClickListenerButtonPlay() {
    if(this.interval == null) {
      this.interval = setInterval(() => {
        this.setState({
          index: this.state.index >= this.state.range[1] ? this.state.range[0] : ++this.state.index
        });
      }, this.state.fps);
    }
    else {
      clearInterval(this.interval);
      this.interval = null;
    }
  }
}
AisCta3DView.contextType = AppContext;
AisCta3DView.ROI = {
  LEFT: 'left',
  BOTH: 'both',
  RIGHT: 'right',
};
AisCta3DView.defaultProps = {
  imagePrefix: 'CTA_Output',
  roi: AisCta3DView.ROI.BOTH,
  imageName1: 'cta',
  invFlag: false,
  imageName2: 'mip',
  // index: 1,
  imageExtensionName: 'png'
};
AisCta3DView.propTypes = {
  imagePrefix: PropTypes.string,
  roi: PropTypes.string,
  imageName1: PropTypes.string,
  invFlag: PropTypes.bool,
  imageName2: PropTypes.string,
  // index: PropTypes.number,
  imageExtensionName: PropTypes.string
};
const AisCta3DViewT = withTranslation()(AisCta3DView);
AisCta3DViewT.ROI = AisCta3DView.ROI;
export default AisCta3DViewT;