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
      <Card className="AisColorSelectionCard" title={<div className='Title'>{this.props.orientation === ORIENTATION.LEFT ? 'LEFT': 'RIGHT'}</div>}>
        <div className='Colors C'>C</div>
        <div className='Colors IC'>IC</div>
        <div className='Colors L'>L</div>
        <div className='Colors I'>I</div>
        <div className='Colors M1'>M1</div>
        <div className='Colors M2'>M2</div>
        <div className='Colors M3'>M3</div>
        <div className='Colors M4'>M4</div>
        <div className='Colors M5'>M5</div>
        <div className='Colors M6'>M6</div>
      </Card>
    );
  }
}

AisColorSelectionCard.defaultProps = {
  orientation: ORIENTATION.LEFT
}
