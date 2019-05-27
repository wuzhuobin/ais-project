// node_modules
import React from 'react';
import { Button } from 'antd';

export default class AisLanguageButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: AisLanguageButton.enText
    };
    this.onClickListener = this.onClickListener.bind(this);
  }
  render() {
    return (
      <Button onClick={this.onClickListener}>{this.state.text}</Button>
    )
  }
  onClickListener() {
    if (this.state.text === AisLanguageButton.enText) {
      this.setState({ text: AisLanguageButton.zhText });
    }
    else {
      this.setState({ text: AisLanguageButton.enText });
    }
  }
};
AisLanguageButton.zhText = 'Chinese/中文';
AisLanguageButton.enText = "English/英文";