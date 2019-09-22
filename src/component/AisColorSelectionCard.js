// node_modules
import React from 'react';
import { Card } from 'antd';
import { Switch } from 'antd';
import { withTranslation } from 'react-i18next';
import { useTranslation } from 'react-i18next';
import { Row, Col } from 'antd';
//
import './AisColorSelectionCard.css';
import AisAspectScoreContext from '../AisAspectScoreContext';
import AppContext from '../AppContext';

const ORIENTATION = {
  LEFT: 0,
  RIGHT: 1
};

export { ORIENTATION };
const ColorSelectionItem = function(props) {
  const { t } = useTranslation();
  return (
    <div className={[
      'ColorSelectionItem',
      props.type + 'Affected'].join(' ')}>
      <Row type="flex" justify="space-around">
        <Col span={3}>{t(props.type)}</Col>
        <Col span={3}>
          <mark className={props.isAis}>
            {props.huMean}
          </mark>
        </Col>
        <Col span={6}>
          <Switch
            checked={props.checked}
            className="Switch"
            onChange={props.onChange}
          >
          </Switch>
        </Col>
      </Row>
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
      <AisAspectScoreContext.Consumer>
        {({ score, toggleScore }) => (
          <Card className={this.props.affected ? 'Affected' : 'UnAffected'} title={<div className='Title'>{this.props.orientation === ORIENTATION.LEFT ? t('LEFT') : t('RIGHT')}</div>}>
            <ColorSelectionItem
              type="C"
              checked={this.props.orientation === ORIENTATION.LEFT ? score[0]: score[10]}
              onChange={this.props.orientation === ORIENTATION.LEFT ? () => toggleScore(0) : () => toggleScore(10)}
              affected={this.props.affected}
              isAis={this.context.infoAis.ASPECT_Score[scores[0]] == 1 ? 'markIsAIS' : 'markIsNotAIS'}
              huMean={this.context.infoAis.HU_Mean[means[0]]}
            ></ColorSelectionItem>
            <ColorSelectionItem
              type="IC"
              checked={this.props.orientation === ORIENTATION.LEFT ? score[1]: score[11]}
              onChange={this.props.orientation === ORIENTATION.LEFT ? () => toggleScore(1) : () => toggleScore(11)}
              affected={this.props.affected}
              isAis={this.context.infoAis.ASPECT_Score[scores[1]] == 1 ? 'markIsAIS' : 'markIsNotAIS'}
              huMean={this.context.infoAis.HU_Mean[means[1]]}
            ></ColorSelectionItem>
            <ColorSelectionItem
              type="L"
              affected={this.props.affected}
              checked={this.props.orientation === ORIENTATION.LEFT ? score[2]: score[12]}
              onChange={this.props.orientation === ORIENTATION.LEFT ? () => toggleScore(2) : () => toggleScore(12)}
              isAis={this.context.infoAis.ASPECT_Score[scores[2]] == 1 ? 'markIsAIS' : 'markIsNotAIS'}
              huMean={this.context.infoAis.HU_Mean[means[2]]}
            ></ColorSelectionItem>
            <ColorSelectionItem
              type="I"
              affected={this.props.affected}
              checked={this.props.orientation === ORIENTATION.LEFT ? score[3]: score[13]}
              onChange={this.props.orientation === ORIENTATION.LEFT ? () => toggleScore(3) : () => toggleScore(13)}
              isAis={this.context.infoAis.ASPECT_Score[scores[3]] == 1 ? 'markIsAIS' : 'markIsNotAIS'}
              huMean={this.context.infoAis.HU_Mean[means[3]]}
            ></ColorSelectionItem>
            <ColorSelectionItem
              type="M1"
              checked={this.props.orientation === ORIENTATION.LEFT ? score[4]: score[14]}
              onChange={this.props.orientation === ORIENTATION.LEFT ? () => toggleScore(4) : () => toggleScore(14)}
              affected={this.props.affected}
              isAis={this.context.infoAis.ASPECT_Score[scores[4]] == 1 ? 'markIsAIS' : 'markIsNotAIS'}
              huMean={this.context.infoAis.HU_Mean[means[4]]}
            ></ColorSelectionItem>
            <ColorSelectionItem
              type="M2"
              affected={this.props.affected}
              checked={this.props.orientation === ORIENTATION.LEFT ? score[5]: score[15]}
              onChange={this.props.orientation === ORIENTATION.LEFT ? () => toggleScore(5) : () => toggleScore(15)}
              isAis={this.context.infoAis.ASPECT_Score[scores[5]] == 1 ? 'markIsAIS' : 'markIsNotAIS'}
              huMean={this.context.infoAis.HU_Mean[means[5]]}
            ></ColorSelectionItem>
            <ColorSelectionItem
              type="M3"
              affected={this.props.affected}
              checked={this.props.orientation === ORIENTATION.LEFT ? score[6]: score[16]}
              onChange={this.props.orientation === ORIENTATION.LEFT ? () => toggleScore(6) : () => toggleScore(16)}
              isAis={this.context.infoAis.ASPECT_Score[scores[6]] == 1 ? 'markIsAIS' : 'markIsNotAIS'}
              huMean={this.context.infoAis.HU_Mean[means[6]]}
            ></ColorSelectionItem>
            <ColorSelectionItem
              type="M4"
              affected={this.props.affected}
              checked={this.props.orientation === ORIENTATION.LEFT ? score[7]: score[17]}
              onChange={this.props.orientation === ORIENTATION.LEFT ? () => toggleScore(7) : () => toggleScore(17)}
              isAis={this.context.infoAis.ASPECT_Score[scores[7]] == 1 ? 'markIsAIS' : 'markIsNotAIS'}
              huMean={this.context.infoAis.HU_Mean[means[7]]}
            ></ColorSelectionItem>
            <ColorSelectionItem
              type="M5"
              affected={this.props.affected}
              checked={this.props.orientation === ORIENTATION.LEFT ? score[8]: score[18]}
              onChange={this.props.orientation === ORIENTATION.LEFT ? () => toggleScore(8) : () => toggleScore(18)}
              isAis={this.context.infoAis.ASPECT_Score[scores[8]] == 1 ? 'markIsAIS' : 'markIsNotAIS'}
              huMean={this.context.infoAis.HU_Mean[means[8]]}
            ></ColorSelectionItem>
            <ColorSelectionItem
              type="M6"
              affected={this.props.affected}
              checked={this.props.orientation === ORIENTATION.LEFT ? score[9]: score[19]}
              onChange={this.props.orientation === ORIENTATION.LEFT ? () => toggleScore(9) : () => toggleScore(19)}
              isAis={this.context.infoAis.ASPECT_Score[scores[9]] == 1 ? 'markIsAIS' : 'markIsNotAIS'}
              huMean={this.context.infoAis.HU_Mean[means[9]]}
            ></ColorSelectionItem>
          </Card>
        )}
      </AisAspectScoreContext.Consumer>
    );
  }
}

AisColorSelectionCard.contextType = AppContext;

AisColorSelectionCard.defaultProps = {
  orientation: ORIENTATION.LEFT,
  affected: true,
};

export default withTranslation()(AisColorSelectionCard);