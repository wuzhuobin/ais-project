// node_modules
import React from 'react';
import { withTranslation } from 'react-i18next';
import { Button } from 'antd';
import { Radio } from 'antd';
import { Slider } from 'antd'
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
        <span>{t('2D')}</span>
        <div>
          {t('Anterior Cerebral Artery')}(ACA):
          <Button>{t('View')}</Button>
        </div>
        <div>
          {t('Middle Cerebral Artery')}(MCA):
          <Button>{t('View')}</Button>
        </div>
        <div>
          {t('Posterior Cerebral Artery')}(PCA):
          <Button>{t('View')}</Button>
        </div>
        <br/><br/><br/>
        <span>{t('3D')}</span>
        <div>
          {t('Maximum Intensity Projection')}(MIP):
          <Button>{t('View')}</Button>
        </div>
        <div>
          {t('Inverse Maximum Intensity Projection')}(IMIP):
          <Button>{t('View')}</Button>
        </div>
        <div>
          {t('ROI')}:
          <Radio.Group>
            <Radio>{t('Left Brain')}</Radio>
            <Radio>{t('Both Brain')}</Radio>
            <Radio>{t('Right Brain')}</Radio>
          </Radio.Group>
          <table><tbody><tr>
            <td>
              <Button>|&lt;</Button>
            </td>
            <td className="Slider">
              <Slider min={0} max={100}></Slider>
            </td>
            <td>
              <Button>&gt;|</Button>
            </td>
            <td>
              <Button>&gt;</Button>
            </td>
          </tr></tbody></table>
        </div>
      </div>
    );
  }
}
AisCta3DView.contextType = AppContext;

export default withTranslation()(AisCtaPanel);

