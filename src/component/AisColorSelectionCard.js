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
    means = means.map(value => this.props.orientation === ORIENTATION.LEFT ? 'L_' + value : 'R_' + value);
    return (
      <Card className={this.props.affected ? 'Affected' : 'UnAffected'} title={<div className='Title'>{this.props.orientation === ORIENTATION.LEFT ? t('LEFT'): t('RIGHT')}</div>}>
        <div className={['Colors', 'C'  + (this.props.affected ? 'Affected' : 'UnAffected')].join(' ')}>C&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;{this.context.infoAis.HU_Mean[means[0]]}</div>
        <div className={['Colors', 'IC' + (this.props.affected ? 'Affected' : 'UnAffected')].join(' ')}>IC&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;{this.context.infoAis.HU_Mean[means[1]]}</div>
        <div className={['Colors', 'L'  + (this.props.affected ? 'Affected' : 'UnAffected')].join(' ')}>L&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;{this.context.infoAis.HU_Mean[means[2]]}</div>
        <div className={['Colors', 'I'  + (this.props.affected ? 'Affected' : 'UnAffected')].join(' ')}>I&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;{this.context.infoAis.HU_Mean[means[3]]}</div>
        <div><br/></div>
        <div className={['Colors', 'M1' + (this.props.affected ? 'Affected' : 'UnAffected')].join(' ')}>M1&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;{this.context.infoAis.HU_Mean[means[4]]}</div>
        <div className={['Colors', 'M2' + (this.props.affected ? 'Affected' : 'UnAffected')].join(' ')}>M2&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;{this.context.infoAis.HU_Mean[means[5]]}</div>
        <div className={['Colors', 'M3' + (this.props.affected ? 'Affected' : 'UnAffected')].join(' ')}>M3&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;{this.context.infoAis.HU_Mean[means[6]]}</div>
        <div><br/></div>
        <div className={['Colors', 'M4' + (this.props.affected ? 'Affected' : 'UnAffected')].join(' ')}>M4&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;{this.context.infoAis.HU_Mean[means[7]]}</div>
        <div className={['Colors', 'M5' + (this.props.affected ? 'Affected' : 'UnAffected')].join(' ')}>M5&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;{this.context.infoAis.HU_Mean[means[8]]}</div>
        <div className={['Colors', 'M6' + (this.props.affected ? 'Affected' : 'UnAffected')].join(' ')}>M6&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;{this.context.infoAis.HU_Mean[means[9]]}</div>
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