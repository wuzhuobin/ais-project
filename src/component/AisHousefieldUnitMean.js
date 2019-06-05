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
         <h2 className="ScoreLabel">{t('ASPECT Score')}<br />{this.context.infoAis.ASPECT_Final_Score}</h2>
         <br/>
         <br/>
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