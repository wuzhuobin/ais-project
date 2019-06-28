// node_modules
import React from 'react';
import { Layout } from 'antd';
import { Slider } from 'antd';
import { Row, Col } from 'antd';
import { withTranslation } from 'react-i18next';
// me
import AisColorSelectionCard from './AisColorSelectionCard';
import './AisHousefieldUnitMean.css';
import { ORIENTATION } from './AisColorSelectionCard';
import AppContext from '../AppContext';

class AisHousefieldUnitMean extends React.Component {
  render() {
    const t = this.props.t;
    return (
      <Layout>
        <Layout.Header className="LayoutHeader">{t('HOUNSFIELD UNIT MEAN')}</Layout.Header>
        <Layout>
          <Layout.Content>
            <Row>
              <Col span={12}>
                <AisColorSelectionCard
                  orientation={ORIENTATION.LEFT}
                  affected={this.context.infoAis.Affected_Side === 'Left' ? true : false}
                >
                </AisColorSelectionCard>
              </Col>
              <Col span={12}>
                <AisColorSelectionCard
                  orientation={ORIENTATION.RIGHT}
                  affected={this.context.infoAis.Affected_Side === 'Left' ? false : true}
                >
                </AisColorSelectionCard>
              </Col>
            </Row>
          </Layout.Content>
        </Layout>
        <Layout.Footer className="Footer">
         <br/>
         <br/>
         <br/>
         {/*<h2 className="ScoreLabel">{t('ASPECT Score')}<br />{this.context.infoAis.ASPECT_Final_Score}</h2>"*/}
         <br/>
        </Layout.Footer>
      </Layout>
    );
  }
}

AisHousefieldUnitMean.contextType = AppContext;

export default withTranslation()(AisHousefieldUnitMean)


/*
####Hide for later use 
          <h2 className="ConfiendentLevel">{t('Confident Level')}</h2>
            <Slider disabled={false} value={Number.parseInt(this.context.infoAis.ASPECT_Final_Score)} max={10} min={0}></Slider>
*/

/*
<span className='CAffected'>{t('C - Caudate')}</span>
{t(' ')}
<span className='ICAffected'>{t('IC - Internal Capsule')}</span>
{t(' ')}
<span className='LAffected'>{t('L - Lentiform nucleus')}</span>
{t(' ')}
<span className='IAffected'>{t('I - Insular ribbon')}</span>
{t(' ')}
<span className='M1Affected'>{t('M1 - Anterior MCA cortex')}</span>
{t(' ')}
<span className='M2Affected'>{t('M2 - MCA cortex lateral to the insular ribbon')}</span>
{t(' ')}
<span className='M3Affected'>{t('M3 - Posterior MCA cortex')}</span>
{t(' ')}
<span className='M4Affected'>{t('M4 - Aneterior MCA superior territory')}</span>
{t(' ')}
<span className='M5Affected'>{t('M5 - Lateral MCA superior territory')}</span>
{t(' ')}
<span className='M6Affected'>{t('M6 - Posterior MCA superior territory')}</span>
*/