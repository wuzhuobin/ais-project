// node_modules
import React from 'react';
import { withTranslation } from 'react-i18next';
//
import './AisCta3DView.css';
import AppContext from '../AppContext';
import CornerstoneViewport from 'react-cornerstone-viewport';
import './ais-cornerstone/initCornerstone';

class AisCta3DView extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {

    return (
      <div className="AisCta3DView">
        <CornerstoneViewport 
          viewportData={
            {
              stack: {
                currentImageIdIndex: 0,
                imageIds: [
                  "dicomweb://s3.amazonaws.com/lury/PTCTStudy/1.3.6.1.4.1.25403.52237031786.3872.20100510032220.11.dcm",
                  "dicomweb://s3.amazonaws.com/lury/PTCTStudy/1.3.6.1.4.1.25403.52237031786.3872.20100510032220.12.dcm"
                ],
              }
            }
          }>
        </CornerstoneViewport>
      </div>
    );
  }
}

AisCta3DView.contextType = AppContext;

export default withTranslation()(AisCta3DView);