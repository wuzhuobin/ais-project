// node_modules
import React from 'react';
import { Tabs } from 'antd';
import { Row, Col } from 'antd';
import { withTranslation } from 'react-i18next';
//
import './AisCtaPane.css';
import AisCtaColumnViewer from './component/AisCtaColumnView';
import Ais3DViewer from './component/AisCta3DView';
import AisCtaPanel from './component/AisCtaPanel';

class AisCtaPane extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      columnViewFlag: true,
      position: AisCtaColumnViewer.POSITION.MIDDLE,
      roi: Ais3DViewer.ROI.LEFT,
      invFlag: true,
      range3d: [0, 5],
      index3d: 0,
    };
    this.interval = null;
  }
  render() {
    const t = this.props.t;
    // const roiIndex = () => {
    //   if(this.state.roi === Ais3DViewer.ROI.LEFT) {
    //     return 0;
    //   }
    //   else if (this.state.roi === Ais3DViewer.ROI.BOTH) {
    //     return 1;
    //   }
    //   else {
    //     return 2;
    //   }
    // };
    return (
      <Row className="AisCtaPane"> 
        <Col className="Viewer" span={16}>
          {
            this.state.columnViewFlag ?
              <AisCtaColumnViewer
                imagePosition={this.state.position}
              >
              </AisCtaColumnViewer> :
              <Ais3DViewer
                invFlag={this.state.invFlag}
                roi={this.state.roi}
                index={this.state.index3d}
              ></Ais3DViewer>
          }
        </Col>
        <Col span={8}>
          <AisCtaPanel
            onClickListeners={[
              this.onClickListenerColumnView.bind(this, AisCtaColumnViewer.POSITION.ANTERIOR),
              this.onClickListenerColumnView.bind(this, AisCtaColumnViewer.POSITION.MIDDLE),
              this.onClickListenerColumnView.bind(this, AisCtaColumnViewer.POSITION.POSTERIOR),
              this.onClickListener3DViewer.bind(this, false),
              this.onClickListener3DViewer.bind(this, true),
              this.onClickListenerPrevious.bind(this),
              this.onClickListenerNext.bind(this),
              this.onClickListenerPlay.bind(this)
            ]}
            onChangeListenerRoi={this.onChangeListenerRoi.bind(this)}
            onChangeListenerIndex3d={this.onChangeListenerIndex3d.bind(this)}
            roi={this.state.roi}
            range3d={this.state.range3d}
            index3d={this.state.index3d}
          ></AisCtaPanel>
        </Col>
      </Row>
    );
  }
  onClickListenerColumnView(position) {
    this.setState({
      columnViewFlag: true,
      position: position
    });
  }

  onClickListener3DViewer(invFlag) {
    this.setState({
      columnViewFlag: false,
      invFlag: invFlag,
      range3d: invFlag ? [0, 36] : [0, 5]
    });
  }

  onClickListenerPrevious() {
    let index = this.state.index3d - 1;
    if(index < this.state.range3d[0]) {
      index = this.state.range3d[0]; 
    } 
    this.setState({
      index3d: index
    });
  }

  onClickListenerNext() {
    let index = this.state.index3d + 1;
    if(index > this.state.range3d[1]) {
      index = this.state.range3d[1]; 
    } 
    this.setState({
      index3d: index
    });
  }

  onClickListenerPlay() {
    if(this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
    else{
      this.interval = setInterval(() => {
        let index = this.state.index3d + 1;
        if (index > this.state.range3d[1]) {
          index = this.state.range3d[0];
        }
        this.setState({
          index3d: index
        });
      }, 500);
    }
  }

  onChangeListenerIndex3d(value) {
    this.setState({
      index3d: value
    });
  }

  onChangeListenerRoi = e => {
    this.setState({
      roi:e.target.value
    });
  }
}

export default withTranslation()(AisCtaPane);