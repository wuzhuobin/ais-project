// node_modules
import React from 'react';
import { withTranslation } from 'react-i18next';
import { Button } from 'antd';
import { Radio } from 'antd';
import { Slider } from 'antd';
import { Row, Col} from 'antd';
import PropTypes from 'prop-types';
//
import './AisCtaPanel.css';
import AppContext from '../AppContext';
import AisCta3DView from './AisCta3DView';

class AisCtaPanel extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const t = this.props.t;
    return (
      <div className="AisCtaPanel">
        <Row type="flex" align="middle">
          <Col className="SubTitle" span={24}>
            {t('2D')}
          </Col>
        </Row>
        <Row type="flex" align="middle">
          <Col span={16}>
            {t('Anterior Cerebral Antery')}(ACA):
          </Col>
          <Col span={8}>
            <Button onClick={this.props.onClickListeners[0]}>
              {t('View')}
            </Button>
          </Col>
        </Row>
        <Row type="flex" align="middle">
          <Col span={16}>
            {t('Middle Cerebral Artery')}(MCA):
          </Col>
          <Col span={8}>
            <Button onClick={this.props.onClickListeners[1]}>
              {t('View')}
            </Button>
          </Col>
        </Row>
        <Row type="flex" align="middle">
          <Col span={16}>
            {t('Posterior Cerebral Artery')}(PCA):
          </Col>
          <Col span={8}>
            <Button onClick={this.props.onClickListeners[2]}>
              {t('View')}
            </Button>
          </Col>
        </Row>
        <Row type="flex" align="middle">
          <Col className="SubTitle" span={24}>
            {t('3D')}
          </Col>
        </Row>
        <Row type="flex" align="middle">
          <Col span={16}>
            {t('Maximum Intensity Projection')}(MIP):
          </Col>
          <Col span={8}>
            <Button onClick={this.props.onClickListeners[3]}>{t('View')}</Button>
          </Col>
        </Row>
        <Row type="flex" align="middle">
          <Col span={16}>
            {t('Inverse Maximum Intensity Projection')}(IMIP):
          </Col>
          <Col span={8}>
            <Button onClick={this.props.onClickListeners[4]}>{t('View')}</Button>
          </Col>
        </Row>
        <Row type="flex" align="middle">
          <Col span={24}>
          </Col>
        </Row>
        <Row type="flex" align="middle">
          <Radio.Group
            value={this.props.roi}
            onChange={this.props.onChangeListenerRoi}
          >
            <Col span={2}>
              {t('ROI')}:
            </Col>
            <Col span={7}>
              <Radio value={AisCta3DView.ROI.LEFT}>{t('Left Brain')}</Radio>
            </Col>
            <Col span={7}>
              <Radio value={AisCta3DView.ROI.BOTH}>{t('Both Brain')}</Radio>
            </Col>
            <Col span={7}>
              <Radio value={AisCta3DView.ROI.RIGHT}>{t('Right Brain')}</Radio>
            </Col>
          </Radio.Group>
        </Row>
        <Row type="flex" align="middle">
          <Col span={3}>
            <Button onClick={this.props.onClickListeners[5]}>|&lt;</Button>
          </Col>
          <Col span={15}>
            <Slider 
              min={this.props.range3d[0]} 
              max={this.props.range3d[1]} 
              value={this.props.index3d}
              onChange={this.props.onChangeListenerIndex3d}
            ></Slider>
          </Col>
          <Col span={3}>
            <Button onClick={this.props.onClickListeners[6]}>&gt;|</Button>
          </Col>
          <Col span={3}>
            <Button onClick={this.props.onClickListeners[7]}>&gt;</Button>
          </Col>
        </Row>
      </div>
    );
  }
}
AisCtaPanel.contextType = AppContext;
AisCtaPanel.defaultProps = {
  onClickListeners: null,
  onChangeListenerRoi: null,
  onChangeListenerIndex3d: null,
  roi: AisCta3DView.ROI.LEFT,
  range3d: [0, 5],
  index3d: 0
}
AisCtaPanel.propTypes = {
  onClickListeners: PropTypes.array,
  onChangeListenerRoi: PropTypes.func,
  onChangeListenerIndex3d: PropTypes.func,
  roi: PropTypes.string,
  range3d: PropTypes.array,
  index3d: PropTypes.number
}

export default withTranslation()(AisCtaPanel);

