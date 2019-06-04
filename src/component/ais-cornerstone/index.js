// node_modules
import React from 'react';
import ReactDOM from "react-dom";
// import CornerstoneViewport from 'react-cornerstone-viewport';
import * as Cornerstone from 'cornerstone-core';
import CornerstoneTools from 'cornerstone-tools';
import * as cornerstoneNIFTIImageLoader from 'cornerstone-nifti-image-loader'
// me
// import './initCornerstone';
import './AisCornerstoneImageViewer.css';


const layers = [{
        imageId: 'nifti://' + window.location.hostname + ':' + window.location.port +
                  '/NiftiData/noncontrast.nii.gz',
        options: {
            name: 'CT'
        }
    }, {
        imageId: 'nifti://' + window.location.hostname + ':' + window.location.port +
                  '/NiftiData/bet.nii.gz',
        options: {
            name: 'Label',
            opacity: 0,
            viewport: {
                colormap: 'hotIron',
                voi: {
                    windowWidth: 80,
                    windowCenter: 40
                }
            }
        }
    }
];

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

function getNiftiImageId(){
  const ImageId = cornerstoneNIFTIImageLoader.nifti.ImageId;
  //cornerstoneNIFTIImageLoader.nifti.register(Cornerstone)
  cornerstoneNIFTIImageLoader.external.cornerstone = Cornerstone
  const _imageId = 'nifti://' +
      window.location.hostname +
      ':' +
      window.location.port +
      '/NiftiData/noncontrast.nii.gz'
  console.log(_imageId)
  const imageIdObject = ImageId.fromURL(_imageId)
  Cornerstone.loadAndCacheImage(imageIdObject.url).then(function(image){
    console.log(image)
    const numberOfSlices = Cornerstone.metaData.get('multiFrameModule', imageIdObject.url).numberOfFrames;
  });
  let ret = Array.from(Array(426), (_, i) => `nifti:${imageIdObject.filePath}#${imageIdObject.slice.dimension}-${i}`)
  // console.log(ret)
  const stack = {
    currentImageIdIndex: imageIdObject.slice.index,
    imageIds: ret
  };  

  return stack
  // const numberOfSlices = Cornerstone.metaData.get('multiFrameModule', imageIdObject.url).numberOfFrames;
  // console.log("Object:" + imageIdObject.url);

}

function loadLayers(element) {
    loadImages().then(function(images) {
        images.forEach(function(image, index) {
            let loaded = false;
            console.log(index + ': ' + image)
            const layer = layers[index];
            const layerId = Cornerstone.addLayer(element, image, layer.options);
            console.log(layer.options)
            // /////
            const ImageId = cornerstoneNIFTIImageLoader.nifti.ImageId;
            const imageIdObject = ImageId.fromURL(layer.imageId)
            const numberOfSlices = Cornerstone.metaData.get('multiFrameModule', imageIdObject.url).numberOfFrames;
            console.log(numberOfSlices);
            const stack = {
              currentImageIdIndex: imageIdObject.slice.index,
              imageIds: Array.from(Array(numberOfSlices), (_, i) => `nifti:${imageIdObject.filePath}#${imageIdObject.slice.dimension}-${i}`)
            };

            const viewport = Cornerstone.getDefaultViewportForImage(element, image);
            Cornerstone.displayImage(element, image, viewport);
            if(loaded === false) {
              // CornerstoneTools.addStackStateManager(element, ['stack', 'wwwc', 'pan', 'zoom']);
              // CornerstoneTools.addToolState(element, 'stack', stack);
              // CornerstoneTools.mouseInput.enable(element);
              // CornerstoneTools.mouseWheelInput.enable(element);
              // CornerstoneTools.wwwc.activate(element, 1);
              // CornerstoneTools.pan.activate(element, 2);
              // CornerstoneTools.zoom.activate(element, 4);
              // CornerstoneTools.stackScrollWheel.activate(element);
              // CornerstoneTools.orientationMarkers.enable(element);
              const StackScrollMouseWheelTool = CornerstoneTools.StackScrollMouseWheelTool;
              CornerstoneTools.addTool(StackScrollMouseWheelTool);
              CornerstoneTools.setToolActive('StackScrollMouseWheel', { mouseButtonMask: 0,  isTouchActive: true })
              loaded = true;
            }
            ///////////////
            Cornerstone.updateImage(element);
            console.log('Layer ' + index + ': ' + layerId);
        });
    });
}

// This method loads the image of each layer and resolve the
// promise only after getting all of them loaded
function loadImages() {
    const promises = [];
    const ImageId = cornerstoneNIFTIImageLoader.nifti.ImageId;
    layers.forEach(function(layer) {
        const imageIdObject = ImageId.fromURL(layer.imageId)
        const loadPromise = Cornerstone.loadAndCacheImage(imageIdObject.url);
        promises.push(loadPromise);
    });

    return Promise.all(promises);
}


export default class AisCornerstoneViewer extends React.Component {
  constructor(props) {
    super(props);
    this.exapleData2 = {
      stack:{
        currentImageIdIndex: 0,
        imageIds: getImageIds()
      }
    };
    this.exampleData = {
      stack: getNiftiImageId()//{
      //   currentImageIdIndex: 0,
      //   imageIds: getNiftiImageId()
      // }
    };
  }
  componentDidMount(){
    const node = ReactDOM.findDOMNode(this)
    console.log(node)
    if (node instanceof HTMLElement) {
      const parent = node.querySelector('.CornerstoneViewport');
      const child = node.querySelector('.CornerstoneViewport').querySelector('.viewport-element');
      console.log("child" + child)
      loadLayers(child)
    }
  }
  render() {
    return (
      <div className='CornerstoneImageViewer'>

      </div>
    );
  }
}

/*
        <CornerstoneViewport
          viewportData={this.exampleData}
          cornerstone={Cornerstone}
          cornerstoneTools={CornerstoneTools}
        >
        </CornerstoneViewport>
*/