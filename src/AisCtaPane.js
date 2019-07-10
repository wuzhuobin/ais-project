// node_modules
import React from 'react';
// import { Tabs } from 'antd';
// import { Row, Col } from 'antd';
import { Layout } from 'antd';
import { Menu } from 'antd';
import { Button } from 'antd';
import { withTranslation } from 'react-i18next';
//
import './AisCtaPane.css';
import AisCtaColumnViewer from './component/AisCtaColumnView';
import Ais3DViewer from './component/AisCta3DView';
// import AisCtaPanel from './component/AisCtaPanel';

class AisCtaPane extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      columnViewFlag: true,
      columnViewPrefix: '',
      columnViewOrientation: AisCtaColumnViewer.ORIENTATION.AXIAL,
      columnViewPosition: AisCtaColumnViewer.POSITION.ANTERIOR,
      position: AisCtaColumnViewer.POSITION.MIDDLE,
      roi: Ais3DViewer.ROI.LEFT,
      invFlag: true,
      range3d: [0, 5],
      index3d: 0,
    };
    this.interval = null;
  }
  GetUrlParam(paraName) {
    var url = document.location.toString();
    var arrObj = url.split("?");

    if (arrObj.length > 1) {
      var arrPara = arrObj[1].split("&");
      var arr;

      for (var i = 0; i < arrPara.length; i++) {
        arr = arrPara[i].split("=");

        if (arr != null && arr[0] == paraName) {
          return arr[1];
        }
      }
      return "";
    }
    else {
      return "";
    }
  }
  componentWillMount() {
    var user = this.GetUrlParam("user");
    var path = this.GetUrlParam("path");

    console.log(user)
    console.log(path)

    const currentDir = "http://file.brainnow.net/ais/" + user + "/" + path
    this.setState({ columnViewPrefix: currentDir + "/2D_MIP" });
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
      <Layout className="AisCtaPane">
        <Layout.Sider className="Sider">
          <Menu
            mode="inline"
            defaultSelectedKeys={[[AisCtaColumnViewer.ORIENTATION.AXIAL, AisCtaColumnViewer.POSITION.ANTERIOR].join(' ')]}
            defaultOpenKeys={[AisCtaColumnViewer.ORIENTATION.AXIAL]}
            onClick={this.onClickListenerMenu.bind(this)}
          >
            <Menu.SubMenu title={t('Axial')} key={AisCtaColumnViewer.ORIENTATION.AXIAL}>
              <Menu.Item key={[AisCtaColumnViewer.ORIENTATION.AXIAL, AisCtaColumnViewer.POSITION.ANTERIOR].join(' ')}>
                {t('ACA')}
              </Menu.Item>
              <Menu.Item key={[AisCtaColumnViewer.ORIENTATION.AXIAL, AisCtaColumnViewer.POSITION.MIDDLE].join(' ')}>
                {t('MCA')}
              </Menu.Item>
              <Menu.Item key={[AisCtaColumnViewer.ORIENTATION.AXIAL, AisCtaColumnViewer.POSITION.POSTERIOR].join(' ')}>
                {t('PCA')}
              </Menu.Item>
            </Menu.SubMenu>
            <Menu.SubMenu title={t('Coronal')} key={AisCtaColumnViewer.ORIENTATION.CORONAL}>
              <Menu.Item key={[AisCtaColumnViewer.ORIENTATION.CORONAL, AisCtaColumnViewer.POSITION.ANTERIOR].join(' ')}>
                {t('ACA')}
              </Menu.Item>
              <Menu.Item key={[AisCtaColumnViewer.ORIENTATION.CORONAL, AisCtaColumnViewer.POSITION.MIDDLE].join(' ')}>
                {t('MCA')}
              </Menu.Item>
              <Menu.Item key={[AisCtaColumnViewer.ORIENTATION.CORONAL, AisCtaColumnViewer.POSITION.POSTERIOR].join(' ')}>
                {t('PCA')}
              </Menu.Item>
            </Menu.SubMenu>
            <Menu.Item key={AisCtaColumnViewer.ORIENTATION.SAGITTAL}>
              {t('Sagittal')}
            </Menu.Item>
            <Menu.SubMenu title={t('3D View')}>
              <Menu.Item>
                <Button>
                  {/* {t('Left Brain')} */}
                </Button>
                <Button>
                  {/* {t('Both Brain')} */}
                </Button>
                <Button>
                  {/* {t('Right Brain')} */}
                </Button>
              </Menu.Item>
            </Menu.SubMenu>
          </Menu>
        </Layout.Sider>
        <Layout.Content>
          <AisCtaColumnViewer
            imagePrefix={this.state.columnViewPrefix}
            imageOrientation={this.state.columnViewOrientation}
            imagePosition={this.state.columnViewPosition}
          ></AisCtaColumnViewer>
        </Layout.Content>
      </Layout>
      // <Row className="AisCtaPane"> 
      //   <Col className="Viewer" span={16}>
      //     {
      //       this.state.columnViewFlag ?
      //         <AisCtaColumnViewer
      //           imagePosition={this.state.position}
      //         >
      //         </AisCtaColumnViewer> :
      //         <Ais3DViewer
      //           invFlag={this.state.invFlag}
      //           roi={this.state.roi}
      //           index={this.state.index3d}
      //         ></Ais3DViewer>
      //     }
      //   </Col>
      //   <Col span={8}>
      //     <AisCtaPanel
      //       onClickListeners={[
      //         this.onClickListenerColumnView.bind(this, AisCtaColumnViewer.POSITION.ANTERIOR),
      //         this.onClickListenerColumnView.bind(this, AisCtaColumnViewer.POSITION.MIDDLE),
      //         this.onClickListenerColumnView.bind(this, AisCtaColumnViewer.POSITION.POSTERIOR),
      //         this.onClickListener3DViewer.bind(this, false),
      //         this.onClickListener3DViewer.bind(this, true),
      //         this.onClickListenerPrevious.bind(this),
      //         this.onClickListenerNext.bind(this),
      //         this.onClickListenerPlay.bind(this)
      //       ]}
      //       onChangeListenerRoi={this.onChangeListenerRoi.bind(this)}
      //       onChangeListenerIndex3d={this.onChangeListenerIndex3d.bind(this)}
      //       roi={this.state.roi}
      //       range3d={this.state.range3d}
      //       index3d={this.state.index3d}
      //     ></AisCtaPanel>
      //   </Col>
      // </Row>
    );
  }
  onClickListenerMenu(item) {
    const imageOrientation = item.key.split(' ')[0];
    const imagePosition = item.key.split(' ')[1];
    this.setState({
      columnViewOrientation: imageOrientation,
      columnViewPosition: imagePosition
    });
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
      range3d: invFlag ? [0, 35] : [0, 5]
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
      }, 200);
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