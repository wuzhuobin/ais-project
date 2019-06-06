import React from "react";
import { render } from "react-dom";
import * as cornerstone from "cornerstone-core";
import * as cornerstoneMath from "cornerstone-math";
import * as cornerstoneTools from "cornerstone-tools";
import Hammer from "hammerjs";
import * as cornerstoneWebImageLoader from "cornerstone-web-image-loader";
import * as cornerstoneNIFTIImageLoader from 'cornerstone-nifti-image-loader'

import ImageScrollbar from '../ImageScrollbar/ImageScrollbar.js';

const divStyle = {
  // width: "100%",//"512px",
  height: '75vh',//"512px",
  position: "relative",
  color: "white",
  flex: 1
};

const bottomLeftStyle = {
  bottom: "5px",
  left: "5px",
  position: "absolute",
  color: "white"
};

const bottomRightStyle = {
  bottom: "5px",
  right: "5px",
  position: "absolute",
  color: "white"
};

// function loadImages(layers, element) {
//     const promises = [];
//     const ImageId = cornerstoneNIFTIImageLoader.nifti.ImageId;
//     layers.forEach(function(layer) {
//       const imageIdObject = ImageId.fromURL(layer.imageId);
//       const loadPromise = cornerstone.loadAndCacheImage(imageIdObject.url);
//       promises.push(loadPromise);
//     });
//     return Promise.all(promises);
// }

export default class CornerstoneViewer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      layers: props.layers,
      viewport: cornerstone.getDefaultViewport(null, undefined),
      viewportHeight: '100%',
      currentImageIdIndex: 2,
      numberOfSlices: 100,
      renderScrollbar: props.renderScrollbar,
      isLeftClick: false,
    };
    // console.log(props.layers);
    this.onImageRendered = this.onImageRendered.bind(this);
    this.onNewImage = this.onNewImage.bind(this);
    this.onLayerAdded = this.onLayerAdded.bind(this);
    this.onWindowResize = this.onWindowResize.bind(this);
    this.onWheelScroll = this.onWheelScroll.bind(this);
    this.contextMenu = this.contextMenu.bind(this);
    this.imageSliderOnInputCallback = this.imageSliderOnInputCallback.bind(this);
    this.loadImages = this.loadImages.bind(this);
    this.scrollToSlice = this.scrollToSlice.bind(this);
    this.renderScrollbar = this.renderScrollbar.bind(this);
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
  }

  render() {
    return (
      <div onContextMenu={this.contextMenu}>
        <div
          className="viewportElement"
          style={divStyle}
          ref={input => {
            this.element = input;
          }}
        >
          <canvas className="cornerstone-canvas" />
          <div style={bottomLeftStyle}>Zoom: {this.state.viewport.scale}</div>
          <div style={bottomRightStyle}>
            WW/WC: {this.state.viewport.voi.windowWidth} /{" "}
            {this.state.viewport.voi.windowCenter}
          </div>
        </div>
        {this.renderScrollbar(this.state.renderScrollbar)}
      </div>
    );
  }

  renderScrollbar(bool){
    if (bool){
      return (<ImageScrollbar
          onInputCallback={this.imageSliderOnInputCallback}
          max= {this.state.numberOfSlices}
          value={this.state.currentImageIdIndex}
          height={this.state.viewportHeight}
        />);
    }
    else{
      return null;
    }

  }

  loadImages(layers, element) {
      const promises = [];
      const ImageId = cornerstoneNIFTIImageLoader.nifti.ImageId;
      layers.forEach(function(layer) {
        const imageIdObject = ImageId.fromURL(layer.imageId);
        const loadPromise = cornerstone.loadAndCacheImage(imageIdObject.url);
        promises.push(loadPromise);
      });
      return Promise.all(promises);
  }

  scrollToSlice(number){
    cornerstone.getEnabledElements().forEach(function(HTMLElement){
      const _element = HTMLElement.element
      const layers = cornerstone.getLayers(_element);
      layers.forEach(function(layer,index){
        var imageId = layer.image.imageId;
        var layerId = layer.layerId;
        console.log(index + ":" + imageId);
        var n = imageId.search("#z-");
        var m = imageId.search(",t-");
        var _i = parseInt(number);
        const updateImageId = imageId.substr(0, n+3) + _i + imageId.substr(m);
        cornerstone.loadImage(updateImageId).then(function(image) {        
          // cornerstone.displayImage(element, image);        
          cornerstone.setLayerImage(_element, image, layerId);
          cornerstone.updateImage(_element);
        });  
      });
    });
  }

  contextMenu(e){
    e.preventDefault();
  }

  onWindowResize() {
    this.setState({
      viewportHeight: '${this.element.clientHeight - 20}px'
    });
    cornerstone.resize(this.element);
  }

  onWheelScroll(e) {
    const element = this.element;
    console.log("Wheel Scroll: %O ", cornerstone.getEnabledElements());
    // const ImageId = cornerstoneNIFTIImageLoader.nifti.ImageId;
    var updatedIndex = 0;
    const maxSlices = parseInt(this.state.numberOfSlices);
    var _i = parseInt(this.state.currentImageIdIndex);

    if (e.wheelDelta < 0){
      _i = _i + 1;
    }
    else{
      _i = _i - 1;
    }
    if (_i < 0){
      _i = 0;
    }
    if (_i > maxSlices){
      _i = _i - 1;
    }
    updatedIndex = _i;

    this.setState({
      currentImageIdIndex: updatedIndex
    });
    this.scrollToSlice(updatedIndex);
  }

  imageSliderOnInputCallback(value){
    console.log("At imageSliderOnInputCallBack: " + value);
    this.setState({
      currentImageIdIndex: value,
    });
    this.scrollToSlice(value);
  }

  onImageRendered(e) {
    const viewport = cornerstone.getViewport(this.element);
    console.log("On image rendered: %O", cornerstone.getLayers(this.element));
    const layers = cornerstone.getLayers(this.element);
    const _imageId = layers[0].image.imageId;
    var n = _imageId.search("#z-");
    var m = _imageId.search(",t-");
    var _index = _imageId.substring(n+3,m);
    var _i = parseInt(_index);
    console.log("On image rendered: %O", this.state.currentImageIdIndex);
    this.setState({
      viewport: viewport,
      currentImageIdIndex: _i
    });
    // cornerstone.getEnabledElements().forEach(function(HTMLElement){
    //   const _element = HTMLElement.element;
    //   cornerstone.updateImage(_element);
    // });
    // console.log("onImageRendered LayerId: " + cornerstone.getActiveLayer(this.element).layerId);
    // console.log("onImageRendered LayerId: %O ",cornerstone.getActiveLayer(this.element));
  }

  onNewImage(image) {
    // const enabledElement = cornerstone.getEnabledElement(this.element);
    console.log("Enter New Image: %O", image);
    // this.setState({
    //   imageId: enabledElement.image.imageId
    // });
  }

  onLayerAdded(e){
    const _enableElement = cornerstone.getLayer(this.element,e.detail.layerId)
    const _numberOfSlices = cornerstone.metaData.get('multiFrameModule', _enableElement.image.imageId).numberOfFrames
    // console.log(_numberOfSlices + " Layer added: %O", _enableElement.image );
    var _updatedSlices = parseInt(_numberOfSlices) - 1
    this.setState({
      numberOfSlices: _updatedSlices
    });
  }

  onMouseDown(e){
    console.log("handleClick mouse down: %O", e);
  }

  onMouseMove(e){
    // console.log("handleClick mouse move: %O", e);
    cornerstone.getEnabledElements().forEach(function(HTMLElement){
      const _element = HTMLElement.element
      if (HTMLElement.element === e.detail.element){
        // console.log("handleClick mouse move: Same element");
      }
      else{
        // console.log("handleClick mouse move: Different element");
        cornerstone.updateImage(_element);
      }
    });
  }

  onMouseUp(e){
    console.log("handleClick mouse: %O", e);
  }

  componentWillMount() {
    cornerstoneTools.external.cornerstone = cornerstone;
    cornerstoneTools.external.cornerstoneMath = cornerstoneMath;
    cornerstoneWebImageLoader.external.cornerstone = cornerstone;
    cornerstoneTools.external.Hammer = Hammer;
    cornerstoneNIFTIImageLoader.external.cornerstone = cornerstone

  }

  componentDidMount() {
    const element = this.element;
    const ImageId = cornerstoneNIFTIImageLoader.nifti.ImageId;
    // const imageIdObject = ImageId.fromURL(this.state.imageId);
    // Enable the DOM Element for use with Cornerstone
    let loaded = false;
    cornerstone.enable(element);
    const _layers = this.state.layers;    
    this.loadImages(this.state.layers, element).then(function(images) {
      images.forEach(function(image, index) {
        const layer = _layers[index];
        const layerId = cornerstone.addLayer(element, image, layer.options);
        cornerstone.updateImage(element);
        
        /////////////////////
        const imageIdObject = ImageId.fromURL(layer.imageId)
        const _numberOfSlices = cornerstone.metaData.get('multiFrameModule', imageIdObject.url).numberOfFrames;
        const stack = {
          currentImageIdIndex: index,
          imageIds: Array.from(Array(_numberOfSlices), (_, i) => `nifti:${imageIdObject.filePath}#${imageIdObject.slice.dimension}-${i},t-0`)
        };
        // const viewport = cornerstone.getDefaultViewportForImage(element, image);
        
        if(loaded === false) {
          cornerstoneTools.addStackStateManager(element, ['stack', 'wwwc', 'pan', 'zoom']);
          cornerstoneTools.addToolState(element, 'stack', stack);         
          cornerstoneTools.mouseInput.enable(element);
          cornerstoneTools.mouseWheelInput.enable(element);
          cornerstoneTools.wwwc.activate(element, 1);
          cornerstoneTools.pan.activate(element, 2);
          cornerstoneTools.zoom.activate(element, 4);
          // cornerstoneTools.stackScrollWheel.activate(element);
          cornerstoneTools.orientationMarkers.enable(element);
          loaded = true;
        }
        /////////////////////
        
        console.log('Layer ' + index + ': ' + layerId);
      });
    });
    element.addEventListener(
        "cornerstoneimagerendered",
        this.onImageRendered
      );
    element.addEventListener("cornerstonelayeradded", this.onLayerAdded);
    window.addEventListener("resize", this.onWindowResize);
    element.addEventListener("mousewheel", this.onWheelScroll);
    // element.addEventListener("mousedown", this.onMouseDown);
    // element.addEventListener("mouseup", this.onMouseUp);
    element.addEventListener("cornerstonetoolsmousedrag",this.onMouseMove);
    this.setState({
      viewportHeight: '${this.element.clientHeight - 20}px',
    });
  }

  componentWillUnmount() {
    const element = this.element;
    element.removeEventListener(
      "cornerstoneimagerendered",
      this.onImageRendered
    );
    element.removeEventListener("cornerstonelayeradded", this.onLayerAdded);
    element.removeEventListener("cornerstonenewimage", this.onNewImage);
    window.removeEventListener("resize", this.onWindowResize);
    element.removeEventListener("mousewheel", this.onWheelScroll);

    cornerstone.disable(element);
  }

  componentDidUpdate(prevProps, prevState) {
    console.log("Enter update: %O",cornerstone.getEnabledElement(this.element));
    const layers = cornerstone.getEnabledElement(this.element).layers;
    if (layers[0] !== undefined)
    {
      const _imageId = layers[0].image.imageId;
      var n = _imageId.search("#z-");
      var m = _imageId.search(",t-");
      var _index = _imageId.substring(n+3,m);
      var _i = parseInt(_index);
      console.log("Enter update defined: %O", this.state.currentImageIdIndex);
    }
    // const stackData = cornerstoneTools.getToolState(this.element, "stack");
    // const stack = stackData.data[0];
    // stack.currentImageIdIndex = this.state.stack.currentImageIdIndex;
    // stack.imageIds = this.state.stack.imageIds;
    // cornerstoneTools.addToolState(this.element, "stack", stack);

    // const imageId = stack.imageIds[stack.currentImageIdIndex];
    // cornerstoneTools.scrollToIndex(this.element, stack.currentImageIdIndex);
  }
}


// const App = () => (
//   <div>
//     <h2>Cornerstone React Component Example</h2>
//     <CornerstoneElement stack={{ ...stack }} />
//   </div>
// );

// render(<App />, document.getElementById("root"));


/*
    // Load the first image in the stack
    cornerstone.loadAndCacheImage(imageIdObject.url).then(image => {
      // Display the first image
      cornerstone.displayImage(element, image);
      const numberOfSlices = cornerstone.metaData.get('multiFrameModule', imageIdObject.url).numberOfFrames;
      const _stack = {
          currentImageIdIndex: imageIdObject.slice.index,
          imageIds: Array.from(Array(numberOfSlices), (_, i) => `nifti:${imageIdObject.filePath}#${imageIdObject.slice.dimension}-${i}`)
      };
      // Add the stack tool state to the enabled element
      const stack = this.props.stack;
      // cornerstoneTools.init();
      cornerstoneTools.addStackStateManager(element, ['stack',
          'wwwc', 'pan', 'zoom']);
      cornerstoneTools.addToolState(element, "stack", _stack);

      // const PanTool = cornerstoneTools.PanTool;
      // cornerstoneTools.addTool(PanTool)
      // cornerstoneTools.setToolActive('Pan', { mouseButtonMask: [1, 4] })
      // const WwwcTool = cornerstoneTools.WwwcTool;
      // cornerstoneTools.addTool(WwwcTool)
      // cornerstoneTools.setToolActive('Wwwc', { mouseButtonMask: 1 })
      // cornerstoneTools.stackPrefetch.setConfiguration({
      //     maxImagesToPrefetch: Infinity,
      //     preserveExistingPool: false,
      //     maxSimultaneousRequests: 6
      //   });
      // const ZoomTool = cornerstoneTools.ZoomTool;
      // cornerstoneTools.addTool(ZoomTool)
      // cornerstoneTools.setToolActive('Zoom', { mouseButtonMask: [1, 2], isTouchActive: true })
      // const ZoomMouseWheelTool = cornerstoneTools.ZoomMouseWheelTool;
      // cornerstoneTools.addTool(ZoomMouseWheelTool)
      // cornerstoneTools.setToolActive('ZoomMouseWheel', { mouseButtonMask: 0, isTouchActive: true })
      // const StackScrollMouseWheelTool = cornerstoneTools.StackScrollMouseWheelTool;
      // cornerstoneTools.addTool(StackScrollMouseWheelTool);
      // cornerstoneTools.setToolActive('StackScrollMouseWheel', { mouseButtonMask: [0], isTouchActive: true })
      // csTools.setToolActive('StackScrollMultiTouch', {
      //     mouseButtonMask: 0,
      //     isTouchActive: true
      // });
      // cornerstoneTools.setToolActive('length',{ mouseButtonMask: 1})
      // cornerstoneTools.mouseInput.enable(element);
      // cornerstoneTools.mouseWheelInput.enable(element);
      // cornerstoneTools.wwwc.activate(element, 1); // ww/wc is the default tool for left mouse button
      // cornerstoneTools.pan.activate(element, 2); // pan is the default tool for middle mouse button
      // cornerstoneTools.zoom.activate(element, 4); // zoom is the default tool for right mouse button
      // cornerstoneTools.zoomWheel.activate(element); // zoom is the default tool for middle mouse wheel

      // cornerstoneTools.touchInput.enable(element);
      // cornerstoneTools.panTouchDrag.activate(element);
      // cornerstoneTools.zoomTouchPinch.activate(element);

      cornerstoneTools.mouseInput.enable(element);
      cornerstoneTools.mouseWheelInput.enable(element);
      cornerstoneTools.wwwc.activate(element, 1);
      cornerstoneTools.pan.activate(element, 2);
      cornerstoneTools.zoom.activate(element, 4);
      cornerstoneTools.stackScrollWheel.activate(this.element);
      cornerstoneTools.orientationMarkers.enable(this.element);
      cornerstone.updateImage(element);


*/

/*  onWheelScroll(e) {
    const element = this.element;
    console.log("Wheel Scroll: %O ", cornerstone.getEnabledElements());
    // const ImageId = cornerstoneNIFTIImageLoader.nifti.ImageId;
    var updatedIndex = 0;
    const maxSlices = parseInt(this.state.numberOfSlices) - 1;
    cornerstone.getEnabledElements().forEach(function(HTMLElement){
      const _element = HTMLElement.element
      const layers = cornerstone.getLayers(_element);
      layers.forEach(function(layer,index){
        var imageId = layer.image.imageId;
        var layerId = layer.layerId;
        console.log(index + ":" + imageId);
        var n = imageId.search("#z-");
        var m = imageId.search(",t-");
        var _index = imageId.substring(n+3,m);
        var _i = parseInt(_index);
        const numberOfSlices = cornerstone.metaData.get('multiFrameModule', imageId).numberOfFrames;
        var n_slices = parseInt(numberOfSlices);
        if (e.wheelDelta < 0){
          _i = _i + 1;
        }
        else{
          _i = _i - 1;
        }
        if (_i < 0){
          _i = 0;
        }
        if (_i === n_slices){
          _i = _i - 1;
        }
        const updateImageId = imageId.substr(0, n+3) + _i + imageId.substr(m);
        updatedIndex = _i;
        cornerstone.loadImage(updateImageId).then(function(image) {        
          // cornerstone.displayImage(element, image);        
          cornerstone.setLayerImage(_element, image, layerId);
          cornerstone.updateImage(_element);
        });  
      });
    });
    this.setState({
      currentImageIdIndex: updatedIndex
    });
  }*/