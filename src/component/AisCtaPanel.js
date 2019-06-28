// node_modules
import React from 'react';
import { withTranslation } from 'react-i18next';
import { Button } from 'antd';
import { Radio } from 'antd';
import { Slider } from 'antd';
import { Row, Col} from 'antd';
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
            <Button>{t('View')}</Button>
          </Col>
        </Row>
        <Row type="flex" align="middle">
          <Col span={16}>
            {t('Middle Cerebral Artery')}(MCA):
          </Col>
          <Col span={8}>
            <Button>{t('View')}</Button>
          </Col>
        </Row>
        <Row type="flex" align="middle">
          <Col span={16}>
            {t('Posterior Cerebral Artery')}(PCA):
          </Col>
          <Col span={8}>
            <Button>{t('View')}</Button>
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
            <Button>{t('View')}</Button>
          </Col>
        </Row>
        <Row type="flex" align="middle">
          <Col span={16}>
            {t('Inverse Maximum Intensity Projection')}(IMIP):
          </Col>
          <Col span={8}>
            <Button>{t('View')}</Button>
          </Col>
        </Row>
        <Row type="flex" align="middle">
          <Col span={24}>
          </Col>
        </Row>
        <Row type="flex" align="middle">
          <Radio.Group>
            <Col span={2}>
              {t('ROI')}:
            </Col>
            <Col span={7}>
              <Radio  value={0}> {t('Left Brain')}</Radio>
            </Col>
            <Col span={7}>
              <Radio  value={1}> {t('Both Brain')}</Radio>
            </Col>
            <Col span={7}>
              <Radio  value={2}> {t('Right Brain')}</Radio>
            </Col>
          </Radio.Group>
        </Row>
        <Row type="flex" align="middle">
          <Col span={3}>
            <Button>|&lt;</Button>
          </Col>
          <Col span={15}>
            <Slider min={0} max={36}></Slider>
          </Col>
          <Col span={3}>
            <Button>&gt;|</Button>
          </Col>
          <Col span={3}>
            <Button>&gt;</Button>
          </Col>
        </Row>
      </div>
    );
  }
}
AisCta3DView.contextType = AppContext;

export default withTranslation()(AisCtaPanel);

