// node_modules
import React from 'react';
import { Card } from 'antd';
import { withTranslation } from 'react-i18next';
import { useTranslation } from 'react-i18next';
//
import './AisColorSelectionCard.css';
import AppContext from '../AppContext';

const ORIENTATION = {
  LEFT: 0,
  RIGHT: 1
};

export { ORIENTATION };
const ColorSelectionItem = function(props) {
  const {t} = useTranslation();
  return (
    <div className={[
      'ColorSelectionItem',
      props.type + (props.affected ? 'Affected' : 'UnAffected')].join(' ')}>
      <table><tbody><tr>
        <td>
          {t(props.type)}
        </td>
        <td>
          <mark className={props.isAis}>
            {props.huMean}
          </mark>
        </td>
      </tr></tbody></table>
    </div>
  );
};

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
        <ColorSelectionItem 
          type="C"
          affected={this.props.affected}
          isAis={this.context.infoAis.ASPECT_Score[scores[0]] == 1 ? 'markIsAIS' : 'markIsNotAIS'}
          huMean={this.context.infoAis.HU_Mean[means[0]]}
        ></ColorSelectionItem>
        <ColorSelectionItem 
          type="IC"
          affected={this.props.affected}
          isAis={this.context.infoAis.ASPECT_Score[scores[1]] == 1 ? 'markIsAIS' : 'markIsNotAIS'}
          huMean={this.context.infoAis.HU_Mean[means[1]]}
        ></ColorSelectionItem>
        <ColorSelectionItem 
          type="L"
          affected={this.props.affected}
          isAis={this.context.infoAis.ASPECT_Score[scores[2]] == 1 ? 'markIsAIS' : 'markIsNotAIS'}
          huMean={this.context.infoAis.HU_Mean[means[2]]}
        ></ColorSelectionItem>
        <ColorSelectionItem 
          type="I"
          affected={this.props.affected}
          isAis={this.context.infoAis.ASPECT_Score[scores[3]] == 1 ? 'markIsAIS' : 'markIsNotAIS'}
          huMean={this.context.infoAis.HU_Mean[means[3]]}
        ></ColorSelectionItem>
        <ColorSelectionItem 
          type="M1"
          affected={this.props.affected}
          isAis={this.context.infoAis.ASPECT_Score[scores[4]] == 1 ? 'markIsAIS' : 'markIsNotAIS'}
          huMean={this.context.infoAis.HU_Mean[means[4]]}
        ></ColorSelectionItem>
        <ColorSelectionItem 
          type="M2"
          affected={this.props.affected}
          isAis={this.context.infoAis.ASPECT_Score[scores[5]] == 1 ? 'markIsAIS' : 'markIsNotAIS'}
          huMean={this.context.infoAis.HU_Mean[means[5]]}
        ></ColorSelectionItem>
        <ColorSelectionItem 
          type="M3"
          affected={this.props.affected}
          isAis={this.context.infoAis.ASPECT_Score[scores[6]] == 1 ? 'markIsAIS' : 'markIsNotAIS'}
          huMean={this.context.infoAis.HU_Mean[means[6]]}
        ></ColorSelectionItem>
        <ColorSelectionItem 
          type="M4"
          affected={this.props.affected}
          isAis={this.context.infoAis.ASPECT_Score[scores[7]] == 1 ? 'markIsAIS' : 'markIsNotAIS'}
          huMean={this.context.infoAis.HU_Mean[means[7]]}
        ></ColorSelectionItem>
        <ColorSelectionItem 
          type="M5"
          affected={this.props.affected}
          isAis={this.context.infoAis.ASPECT_Score[scores[8]] == 1 ? 'markIsAIS' : 'markIsNotAIS'}
          huMean={this.context.infoAis.HU_Mean[means[8]]}
        ></ColorSelectionItem>
        <ColorSelectionItem 
          type="M6"
          affected={this.props.affected}
          isAis={this.context.infoAis.ASPECT_Score[scores[9]] == 1 ? 'markIsAIS' : 'markIsNotAIS'}
          huMean={this.context.infoAis.HU_Mean[means[9]]}
        ></ColorSelectionItem>
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