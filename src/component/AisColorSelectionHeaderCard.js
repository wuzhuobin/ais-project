// node_modules
import React from 'react';
import {Card} from 'antd';
import { withTranslation } from 'react-i18next';
//
import './AisColorSelectionHeaderCard.css';

class AisColorSelectionHeaderCard extends React.Component {
  render() {
    const t = this.props.t;
    return (
      <Card className="AisColorSelectionHeaderCard" title={<div className="Title">{t('ORIENTATION')}</div>}>
        <div className="TableItem C">{t('Caudate')}</div>
        <div className="TableItem I">{t('Insularribbon')}</div>
        <div className="TableItem IC">{t('Internal Capsule')}</div>
        <div className="TableItem L">{t('Lentiform Nucleus')}</div>
        <div ><br/></div>
        <div className="TableItem M1">{t('M1')}</div>
        <div className="TableItem M2">{t('M2')}</div>
        <div className="TableItem M3">{t('M3')}</div>
        <div ><br/></div>
        <div className="TableItem M4">{t('M4')}</div>
        <div className="TableItem M5">{t('M5')}</div>
        <div className="TableItem M6">{t('M6')}</div>
      </Card>
    );
  }
}

export default withTranslation()(AisColorSelectionHeaderCard);