// node_modules
import React from 'react';
import { Card } from 'antd';
// me
import './AisColorSelectionCard.css';

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
    return (
      <Card className={this.props.affected ? 'Affected' : 'UnAffected'} title={<div className='Title'>{this.props.orientation === ORIENTATION.LEFT ? 'LEFT': 'RIGHT'}</div>}>
        <div className={['Colors', 'C' + (this.props.affected ? 'Affected' : 'UnAffected')].join(' ')}>C</div>
        <div className={['Colors', 'IC' + (this.props.affected ? 'Affected' : 'UnAffected')].join(' ')}>IC</div>
        <div className={['Colors', 'L' + (this.props.affected ? 'Affected' : 'UnAffected')].join(' ')}>L</div>
        <div className={['Colors', 'I' + (this.props.affected ? 'Affected' : 'UnAffected')].join(' ')}>I</div>
        <div className={['Colors', 'M1' + (this.props.affected ? 'Affected' : 'UnAffected')].join(' ')}>M1</div>
        <div className={['Colors', 'M2' + (this.props.affected ? 'Affected' : 'UnAffected')].join(' ')}>M2</div>
        <div className={['Colors', 'M3' + (this.props.affected ? 'Affected' : 'UnAffected')].join(' ')}>M3</div>
        <div className={['Colors', 'M4' + (this.props.affected ? 'Affected' : 'UnAffected')].join(' ')}>M4</div>
        <div className={['Colors', 'M5' + (this.props.affected ? 'Affected' : 'UnAffected')].join(' ')}>M5</div>
        <div className={['Colors', 'M6' + (this.props.affected ? 'Affected' : 'UnAffected')].join(' ')}>M6</div>
      </Card>
    );
  }
}

AisColorSelectionCard.defaultProps = {
  orientation: ORIENTATION.LEFT,
  affected: true
}