// node_modules
import React from 'react';
import { PageHeader } from 'antd';
// me
import './AisPageHeader.css';
import AisLanguageButton from './AisLanguageButton';
import BrainnowIcon from '../asset/brainnow-icon.svg';

export default function AisPageHeader() {
  return (
    <PageHeader title={<img src={BrainnowIcon}
      alt="BrainnowIcon"
      className="BrainnowIcon"></img>}
      extra={<AisLanguageButton></AisLanguageButton>}
    >
    </PageHeader>
  );
}