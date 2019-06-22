// node_modules
import React from 'react';
import CornerstoneViewport from 'react-cornerstone-viewport';
import cornerstone from 'cornerstone-core';
import cornerstoneTools from 'cornerstone-tools';
//
import './initCornerstone';
import './AisCornerstoneImageViewer.css';

class AisCornerstoneImageViewer extends React.Component {
  render () {
    const exampleData = {
      stack: {
        currentImageIdIndex: 0,
        // imageIds: [
        //   "dicomweb://s3.amazonaws.com/lury/PTCTStudy/1.3.6.1.4.1.25403.52237031786.3872.20100510032220.11.dcm",
        //   "dicomweb://s3.amazonaws.com/lury/PTCTStudy/1.3.6.1.4.1.25403.52237031786.3872.20100510032220.12.dcm"
        // ],
        imageIds: [
          "nifti://127.0.0.1:3000/NiftiData/image.nii.gz#z-0,t-0",
          "nifti://127.0.0.1:3000/NiftiData/image.nii.gz#z-1,t-0",
          "nifti://127.0.0.1:3000/NiftiData/image.nii.gz#z-2,t-0",
          "nifti://127.0.0.1:3000/NiftiData/image.nii.gz#z-3,t-0",
          "nifti://127.0.0.1:3000/NiftiData/image.nii.gz#z-4,t-0",
        ]
      }
    }
    return (
      // <div className="AisCornerstoneImageViewer">
        <CornerstoneViewport
          viewportData={exampleData}
          // cornerstone={cornerstone}
          // cornerstoneTools={cornerstoneTools}
        />
      // </div>
    )
  }
}

export default AisCornerstoneImageViewer;