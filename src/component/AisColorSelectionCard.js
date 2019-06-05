// node_modules
import React from 'react';
import { Card } from 'antd';
import { withTranslation } from 'react-i18next';
//
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
    const keys = ['Caudate', 'Insularribbon', 'InternalCapsule', 'LentiformNucleus', 'M1', 'M2', 'M3', 'M4', 'M5', 'M6'];
    const means = keys.map(value => this.props.orientation === ORIENTATION.LEFT ? 'L_' + value : 'R_' + value);
    const scores = keys.map(value => this.props.orientation === ORIENTATION.LEFT ? 'L_' + value: 'R_' + value);
    return (
      <Card className={this.props.affected ? 'Affected' : 'UnAffected'} title={<div className='Title'>{this.props.orientation === ORIENTATION.LEFT ? t('LEFT'): t('RIGHT')}</div>}>
        <div className={['TableItem', 'C'  + (this.props.affected ? 'Affected' : 'UnAffected'), (this.context.infoAis.ASPECT_Score[scores[0]] === '1' ? 'ScoreIs1' : null)].join(' ')}>C&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;{this.context.infoAis.HU_Mean[means[0]]}</div>
        <div className={['TableItem', 'IC' + (this.props.affected ? 'Affected' : 'UnAffected'), (this.context.infoAis.ASPECT_Score[scores[1]] === '1' ? 'ScoreIs1' : null)].join(' ')}>IC&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;{this.context.infoAis.HU_Mean[means[1]]}</div>
        <div className={['TableItem', 'L'  + (this.props.affected ? 'Affected' : 'UnAffected'), (this.context.infoAis.ASPECT_Score[scores[2]] === '1' ? 'ScoreIs1' : null)].join(' ')}>L&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;{this.context.infoAis.HU_Mean[means[2]]}</div>
        <div className={['TableItem', 'I'  + (this.props.affected ? 'Affected' : 'UnAffected'), (this.context.infoAis.ASPECT_Score[scores[3]] === '1' ? 'ScoreIs1' : null)].join(' ')}>I&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;{this.context.infoAis.HU_Mean[means[3]]}</div>
        <div><br/></div>
        <div className={['TableItem', 'M1' + (this.props.affected ? 'Affected' : 'UnAffected'), (this.context.infoAis.ASPECT_Score[scores[4]] === '1' ? 'ScoreIs1' : null)].join(' ')}>M1&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;{this.context.infoAis.HU_Mean[means[4]]}</div>
        <div className={['TableItem', 'M2' + (this.props.affected ? 'Affected' : 'UnAffected'), (this.context.infoAis.ASPECT_Score[scores[5]] === '1' ? 'ScoreIs1' : null)].join(' ')}>M2&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;{this.context.infoAis.HU_Mean[means[5]]}</div>
        <div className={['TableItem', 'M3' + (this.props.affected ? 'Affected' : 'UnAffected'), (this.context.infoAis.ASPECT_Score[scores[6]] === '1' ? 'ScoreIs1' : null)].join(' ')}>M3&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;{this.context.infoAis.HU_Mean[means[6]]}</div>
        <div><br/></div>
        <div className={['TableItem', 'M4' + (this.props.affected ? 'Affected' : 'UnAffected'), (this.context.infoAis.ASPECT_Score[scores[7]] === '1' ? 'ScoreIs1' : null)].join(' ')}>M4&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;{this.context.infoAis.HU_Mean[means[7]]}</div>
        <div className={['TableItem', 'M5' + (this.props.affected ? 'Affected' : 'UnAffected'), (this.context.infoAis.ASPECT_Score[scores[8]] === '1' ? 'ScoreIs1' : null)].join(' ')}>M5&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;{this.context.infoAis.HU_Mean[means[8]]}</div>
        <div className={['TableItem', 'M6' + (this.props.affected ? 'Affected' : 'UnAffected'), (this.context.infoAis.ASPECT_Score[scores[9]] === '1' ? 'ScoreIs1' : null)].join(' ')}>M6&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;{this.context.infoAis.HU_Mean[means[9]]}</div>
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