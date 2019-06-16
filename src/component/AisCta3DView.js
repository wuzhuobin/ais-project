// node_modules
import React from 'react';
import { withTranslation } from 'react-i18next';
//
import './AisCta3DView.css';
import AppContext from '../AppContext';
import CornerstoneViewer from './ais-cornerstone-viewer';

class AisCta3DView extends React.Component {
  // constructor(props) {

  // }
  render() {
     const layer = [{
      imageId: 'nifti://' + window.location.hostname + ':' + window.location.port + '/NiftiData/image.nii.gz',

      options: {
        name: 'CT',
        opacity: 1,
        viewport: { voi: { windowWidth: 80, windowCenter: 40 } }
      }
    },
    {
      imageId: 'nifti://' + window.location.hostname + ':' + window.location.port + '/NiftiData/image-atlas-contour.nii.gz',
      options: {
        name: 'Label',
        opacity: 1,
        viewport: {
          colormap: 'myCustomColorMap1',
          voi: {
            windowWidth: 255,
            windowCenter: 127.5
          }
        }
      }
    },
    {
      imageId: 'nifti://' + window.location.hostname + ':' + window.location.port + '/NiftiData/image-ais.nii.gz',
      options: {
        name: 'Label2',
        opacity: 0.4,
        viewport: {
          colormap: 'myCustomColorMap2',
          voi: {
            windowWidth: 255,
            windowCenter: 127.5
          }
        }
      }
    }];
    const t = this.props.t;
    return (
      <div className="AisCta3DView">
        <div>
        <CornerstoneViewer layers={layer} renderScrollbar={true} />
        </div>
      </div>
    );
  }
}

AisCta3DView.contextType = AppContext;

export default withTranslation()(AisCta3DView);