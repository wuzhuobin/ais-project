// node_modules
import React from 'react';
import CornerstoneViewport from 'react-cornerstone-viewport';
import Cornerstone from 'cornerstone-core';
import CornerstoneTools from 'cornerstone-tools';
// me
import './initCornerstone';
import './AisCornerstoneImageViewer.css';

function getImageIds() {
  const ret = [];
  for (let i = 1; i <= 30; ++i) {
    const index0 = (--i) < 10 ? '0' + i.toString() : i.toString();
    const index1 = (++i) < 10 ? '0' + i.toString() : i.toString();
    ret.push('wadouri://' +
      window.location.hostname +
      ':' +
      window.location.port +
      '/Data/000001_0000' +
      index0 +
      '_000201_0000' +
      index1 +
      '.dcm'
    );
  }
  return ret;
}
export default class AisCornerstoneViewer extends React.Component {
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