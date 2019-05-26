// node_modules
import React from 'react';
import CornerstoneViewport from 'react-cornerstone-viewport';
import Cornerstone from 'cornerstone-core';
import CornerstoneTools from 'cornerstone-tools';
// me
import './initCornerstone';
import './CornerstoneImageViewer.css';

function getImageIds() {
  const ret = [];
  for (let i = 1; i <=10; ++i) {
    if (i < 10) {
      ret.push('dicomweb://' +
        window.location.hostname + 
        ':' +
        window.location.port +
        '/Data/IMG-0003-0000' +
        i.toString() + 
        '.dcm'
      );
    }
    else {
      ret.push('wadouri://' +
        window.location.hostname + 
        ':' +
        window.location.port +
        '/Data/IMG-0003-000' +
        i.toString() + 
        '.dcm'
      );
    }
  }
  return ret;
}
export default class CornerstoneViewer extends React.Component {
  constructor(props) {
    super(props);
    this.exampleData = {
      stack: {
        currentImageIdIndex: 0,
        imageIds: getImageIds()
      }
    };
  }
  render() {
    return (
      <div className='CornerstoneImageViewer'>
        <CornerstoneViewport
          viewportData={this.exampleData}
          cornerstone={Cornerstone}
          cornerstoneTools={CornerstoneTools}
        >
        </CornerstoneViewport>
      </div>
    );
  }
}