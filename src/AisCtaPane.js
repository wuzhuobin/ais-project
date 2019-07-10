// node_modules
import React from 'react';
import { Layout } from 'antd';
import { Menu } from 'antd';
import { Button } from 'antd';
import { withTranslation } from 'react-i18next';
//
import './AisCtaPane.css';
import AisCtaColumnViewer from './component/AisCtaColumnView';
import Ais3DViewer from './component/AisCta3DView';
import BothHemisphere from './asset/icon_3D_BothHemisphere.png';
import LeftHemisphere from './asset/icon_3D_LeftHemisphere.png';
import RightHemisphere from './asset/icon_3D_RightHemisphere.png';

class AisCtaPane extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      columnViewFlag: true,
      columnViewPrefix: '',
      columnViewOrientation: AisCtaColumnViewer.ORIENTATION.AXIAL,
      columnViewPosition: AisCtaColumnViewer.POSITION.ANTERIOR,
      _3DViewPrefix: '',
      _3DViewRoi: Ais3DViewer.ROI.BOTH,
      _3DInvFlag: true,
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
    var user = this.GetUrlParam('user');
    var path = this.GetUrlParam('path');

    console.log(user)
    console.log(path)

    const currentDir = 'http://file.brainnow.net/ais/' + user + '/' + path
    this.setState({ 
      columnViewPrefix: currentDir + '/2D_MIP',
      _3DViewPrefix: currentDir + '/CTA_Output'
     });
  }
  render() {
    const t = this.props.t;
    return (
      <Layout className="AisCtaPane">
        <Layout.Sider className="Sider">
          <Menu
            mode="inline"
            inlineIndent={0}
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
              <Menu.Item key="3D View">
                <Button.Group className="Hemisphere">
                  <Button onClick={this.onClickListenerButton.bind(this, Ais3DViewer.ROI.LEFT)}>
                    <img src={BothHemisphere} alt={BothHemisphere}></img>
                  </Button>
                  <Button onClick={this.onClickListenerButton.bind(this, Ais3DViewer.ROI.BOTH)}>
                    <img src={LeftHemisphere} alt={LeftHemisphere}></img>
                  </Button>
                  <Button onClick={this.onClickListenerButton.bind(this, Ais3DViewer.ROI.RIGHT)}>
                    <img src={RightHemisphere} alt={RightHemisphere}></img>
                  </Button>
                </Button.Group>
              </Menu.Item>
            </Menu.SubMenu>
          </Menu>
        </Layout.Sider>
        <Layout.Content>
          {
            this.state.columnViewFlag ?
              <AisCtaColumnViewer
                imagePrefix={this.state.columnViewPrefix}
                imageOrientation={this.state.columnViewOrientation}
                imagePosition={this.state.columnViewPosition}
              ></AisCtaColumnViewer> :
              <Ais3DViewer
                imagePrefix={this.state._3DViewPrefix}
                roi={this.state._3DViewRoi}
              ></Ais3DViewer>
          }
        </Layout.Content>
      </Layout>

    );
  }
  onClickListenerMenu(item) {
    if(item.key === '3D View') {
      return;
    }
    const imageOrientation = item.key.split(' ')[0];
    const imagePosition = item.key.split(' ')[1];
    this.setState({
      columnViewFlag: true,
      columnViewOrientation: imageOrientation,
      columnViewPosition: imagePosition
    });
    // console.log(item);
  }

  onClickListenerButton(roi) {
    this.setState({
      columnViewFlag: false,
      _3DViewRoi: roi,
    });
    // console.log(event);
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
}

export default withTranslation()(AisCtaPane);