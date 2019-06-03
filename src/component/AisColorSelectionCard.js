// node_modules
import React from 'react';
import { Card } from 'antd';
// me
import './AisColorSelectionCard.css';
import AppContext from '../AppContext';

const ORIENTATION = {
  LEFT: 0,
  RIGHT: 1
};

export { ORIENTATION };

export default class AisColorSelectionCard extends React.Component {
  // constructor(props) {
  //   super(props);
  // }
  render() {
    let means = ['Caudate', 'Insularribbon', 'InternalCapsule', 'LentiformNucleus', 'M1', 'M2', 'M3', 'M4', 'M5', 'M6'];
    means = means.map(value => this.props.orientation === ORIENTATION.LEFT ? 'L_' + value : 'R_' + value);
    return (
      <Card className={this.props.affected ? 'Affected' : 'UnAffected'} title={<div className='Title'>{this.props.orientation === ORIENTATION.LEFT ? 'LEFT': 'RIGHT'}</div>}>
        <div className={['Colors', 'C' + (this.props.affected ? 'Affected' : 'UnAffected')].join(' ')}>C&nbsp;&nbsp;&nbsp;{this.context.infoAis.HU_Mean[means[0]]}</div>
        <div className={['Colors', 'IC' + (this.props.affected ? 'Affected' : 'UnAffected')].join(' ')}>IC&nbsp;&nbsp;&nbsp;{this.context.infoAis.HU_Mean[means[1]]}</div>
        <div className={['Colors', 'L' + (this.props.affected ? 'Affected' : 'UnAffected')].join(' ')}>L&nbsp;&nbsp;&nbsp;{this.context.infoAis.HU_Mean[means[2]]}</div>
        <div className={['Colors', 'I' + (this.props.affected ? 'Affected' : 'UnAffected')].join(' ')}>I&nbsp;&nbsp;&nbsp;{this.context.infoAis.HU_Mean[means[3]]}</div>
        <div className={['Colors', 'M1' + (this.props.affected ? 'Affected' : 'UnAffected')].join(' ')}>M1&nbsp;&nbsp;&nbsp;{this.context.infoAis.HU_Mean[means[4]]}</div>
        <div className={['Colors', 'M2' + (this.props.affected ? 'Affected' : 'UnAffected')].join(' ')}>M2&nbsp;&nbsp;&nbsp;{this.context.infoAis.HU_Mean[means[5]]}</div>
        <div className={['Colors', 'M3' + (this.props.affected ? 'Affected' : 'UnAffected')].join(' ')}>M3&nbsp;&nbsp;&nbsp;{this.context.infoAis.HU_Mean[means[6]]}</div>
        <div className={['Colors', 'M4' + (this.props.affected ? 'Affected' : 'UnAffected')].join(' ')}>M4&nbsp;&nbsp;&nbsp;{this.context.infoAis.HU_Mean[means[7]]}</div>
        <div className={['Colors', 'M5' + (this.props.affected ? 'Affected' : 'UnAffected')].join(' ')}>M5&nbsp;&nbsp;&nbsp;{this.context.infoAis.HU_Mean[means[8]]}</div>
        <div className={['Colors', 'M6' + (this.props.affected ? 'Affected' : 'UnAffected')].join(' ')}>M6&nbsp;&nbsp;&nbsp;{this.context.infoAis.HU_Mean[means[9]]}</div>
      </Card>
    );
  }
}

AisColorSelectionCard.contextType = AppContext;

AisColorSelectionCard.defaultProps = {
  orientation: ORIENTATION.LEFT,
  affected: true
}