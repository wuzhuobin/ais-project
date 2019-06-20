// node_modules
import React from 'react';
import { PageHeader } from 'antd';
import { Button } from 'antd';
import { withTranslation } from 'react-i18next';
// me
import './AisPageHeader.css';
import BrainnowIcon from '../asset/brainnow-icon.svg';

export default withTranslation()(class AisPageHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      en: true
    };
  }
  render() {
    const t = this.props.t;
    const AisLanguageButton =
      <Button onClick={() => this.onClickObserver()}>
        {t('中文')}
      </Button>
    return (
      <PageHeader title={<img src={BrainnowIcon}
        alt="BrainnowIcon"
        className="BrainnowIcon"></img>}
        extra={AisLanguageButton}
      >
      </PageHeader>
    );
  }
  onClickObserver() {
    this.setState({ en: !this.state.en });
    if (!this.state.en) {
      this.props.i18n.changeLanguage('en');
    }
    else {
      this.props.i18n.changeLanguage('zh');
    }
  }
})