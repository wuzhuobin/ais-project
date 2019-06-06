// node_modules
import React from 'react';
import { Card } from 'antd';
import { withTranslation } from 'react-i18next';
// me
import './AisColorSelectionCard.css';
import AppContext from '../AppContext';

const ORIENTATION = {
  LEFT: 0,
  RIGHT: 1
};

export { ORIENTATION };

class AisColorSelectionCard extends React.Component {
  // constructor(props) {
  //   super(props);
  // }
  render() {
    const t = this.props.t;
    let means = ['Caudate', 'Insularribbon', 'InternalCapsule', 'LentiformNucleus', 'M1', 'M2', 'M3', 'M4', 'M5', 'M6'];
    let scores = ['Caudate', 'Insularribbon', 'InternalCapsule', 'LentiformNucleus', 'M1', 'M2', 'M3', 'M4', 'M5', 'M6'];
    means  = means.map(value => this.props.orientation === ORIENTATION.LEFT ? 'L_' + value : 'R_' + value);
    scores = scores.map(value => this.props.orientation === ORIENTATION.LEFT ? 'L_' + value : 'R_' + value);
    return (
      <Card className={this.props.affected ? 'Affected' : 'UnAffected'} title={<div className='Title'>{this.props.orientation === ORIENTATION.LEFT ? t('LEFT'): t('RIGHT')}</div>}>
        <div className={['TableItem', 'C'  + (this.props.affected ? 'Affected' : 'UnAffected')].join(' ')}>C&emsp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;<mark className={this.context.infoAis.ASPECT_Score[scores[0]] == 1 ? 'markIsAIS' : 'markIsNotAIS'}>{this.context.infoAis.HU_Mean[means[0]]}</mark></div>
        <div className={['TableItem', 'IC' + (this.props.affected ? 'Affected' : 'UnAffected')].join(' ')}>IC&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;<mark className={this.context.infoAis.ASPECT_Score[scores[1]] == 1 ? 'markIsAIS' : 'markIsNotAIS'}>{this.context.infoAis.HU_Mean[means[1]]}</mark></div>
        <div className={['TableItem', 'L'  + (this.props.affected ? 'Affected' : 'UnAffected')].join(' ')}>L&emsp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;<mark className={this.context.infoAis.ASPECT_Score[scores[2]] == 1 ? 'markIsAIS' : 'markIsNotAIS'}>{this.context.infoAis.HU_Mean[means[2]]}</mark></div>
        <div className={['TableItem', 'I'  + (this.props.affected ? 'Affected' : 'UnAffected')].join(' ')}>I&emsp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;<mark className={this.context.infoAis.ASPECT_Score[scores[3]] == 1 ? 'markIsAIS' : 'markIsNotAIS'}>{this.context.infoAis.HU_Mean[means[3]]}</mark></div>
        <div><br/></div>
        <div className={['TableItem', 'M1' + (this.props.affected ? 'Affected' : 'UnAffected')].join(' ')}>M1&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;<mark className={this.context.infoAis.ASPECT_Score[scores[4]] == 1 ? 'markIsAIS' : 'markIsNotAIS'}>{this.context.infoAis.HU_Mean[means[4]]}</mark></div>
        <div className={['TableItem', 'M2' + (this.props.affected ? 'Affected' : 'UnAffected')].join(' ')}>M2&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;<mark className={this.context.infoAis.ASPECT_Score[scores[5]] == 1 ? 'markIsAIS' : 'markIsNotAIS'}>{this.context.infoAis.HU_Mean[means[5]]}</mark></div>
        <div className={['TableItem', 'M3' + (this.props.affected ? 'Affected' : 'UnAffected')].join(' ')}>M3&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;<mark className={this.context.infoAis.ASPECT_Score[scores[6]] == 1 ? 'markIsAIS' : 'markIsNotAIS'}>{this.context.infoAis.HU_Mean[means[6]]}</mark></div>
        <div><br/></div>
        <div className={['TableItem', 'M4' + (this.props.affected ? 'Affected' : 'UnAffected')].join(' ')}>M4&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;<mark className={this.context.infoAis.ASPECT_Score[scores[7]] == 1 ? 'markIsAIS' : 'markIsNotAIS'}>{this.context.infoAis.HU_Mean[means[7]]}</mark></div>
        <div className={['TableItem', 'M5' + (this.props.affected ? 'Affected' : 'UnAffected')].join(' ')}>M5&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;<mark className={this.context.infoAis.ASPECT_Score[scores[8]] == 1 ? 'markIsAIS' : 'markIsNotAIS'}>{this.context.infoAis.HU_Mean[means[8]]}</mark></div>
        <div className={['TableItem', 'M6' + (this.props.affected ? 'Affected' : 'UnAffected')].join(' ')}>M6&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;<mark className={this.context.infoAis.ASPECT_Score[scores[9]] == 1 ? 'markIsAIS' : 'markIsNotAIS'}>{this.context.infoAis.HU_Mean[means[9]]}</mark></div>
      </Card>
    );
  }
}

AisColorSelectionCard.contextType = AppContext;

AisColorSelectionCard.defaultProps = {
  orientation: ORIENTATION.LEFT,
  affected: true
};

export default withTranslation()(AisColorSelectionCard);