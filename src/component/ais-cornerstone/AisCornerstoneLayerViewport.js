import CornerstoneLayerViewport from './CornerstoneLayerViewport';
import cornerstoneTools from 'cornerstone-tools';
import cornerstone from 'cornerstone-core';
import * as cornerstoneNIFTIImageLoader from 'cornerstone-nifti-image-loader';

import PickAisTool from './PickAisTool';
import ViewportOverlay from '../react-cornerstone-viewport/src/ViewportOverlay/ViewportOverlay';
// import AisAspectScoreContext from '../../AisAspectScoreContext';
import './initCornerstone';

cornerstoneTools.PickAisTool = PickAisTool;
const EVENT_RESIZE = 'resize';

const scrollToIndex = cornerstoneTools.import('util/scrollToIndex');
const { loadHandlerManager } = cornerstoneTools;

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function initializeTools(cornerstoneTools, tools, element) {
  Array.from(tools).forEach(tool => {
    const apiTool = cornerstoneTools[`${tool.name}Tool`] || tool.apiTool;
    if (apiTool) {
      cornerstoneTools.addToolForElement(element, apiTool, tool.props);
    } else {
      throw new Error(`Tool not found: ${tool.name}Tool`);
    }

    if (tool.mode) {
      cornerstoneTools[`setTool${capitalizeFirstLetter(tool.mode)}ForElement`](
        element,
        tool.name
      );
    }
  });
}

class AisCornerstoneLayerViewport extends CornerstoneLayerViewport {
  static defaultProps = {
    activeTool: 'PickAis',
    viewportData: [],
    isActive: false,
    cornerstoneOptions: {},
    enableStackPrefetch: true,
    cineToolData: {
      isPlaying: false,
      cineFrameRate: 24
    },
    availableTools: [
      { name: 'Pan', mouseButtonMasks: [1, 4] },
      {
        name: 'Zoom',
        props: {
          minScale: 0.3,
          maxScale: 25,
          preventZoomOutsideImage: true
        },
        mouseButtonMasks: [1, 2]
      },
      { name: 'Wwwc', mouseButtonMasks: [1, 2] },
      { name: 'PanMultiTouch' },
      { name: 'ZoomTouchPinch' },
      { name: 'StackScrollMouseWheel' },
      { name: 'StackScrollMultiTouch' },
      { name: 'PickAis', mouseButtonMasks: [1] },
    ],
    viewportOverlayComponent: ViewportOverlay,
    overlayFlag: true,
    orientationMarkersFlag: true,
    scrollbarFlag: true,
    toggleScore: null,
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const element = this.element;
    this.eventHandlerData = [
      {
        eventTarget: element,
        eventType: cornerstone.EVENTS.IMAGE_RENDERED,
        handler: this.onImageRendered
      },
      {
        eventTarget: element,
        eventType: cornerstone.EVENTS.NEW_IMAGE,
        handler: this.onNewImage
      },
      {
        eventTarget: element,
        eventType: cornerstoneTools.EVENTS.STACK_SCROLL,
        handler: this.onStackScroll
      },
      {
        eventTarget: element,
        eventType: cornerstoneTools.EVENTS.MEASUREMENT_ADDED,
        handler: this.onMeasurementAdded
      },
      {
        eventTarget: element,
        eventType: cornerstoneTools.EVENTS.MEASUREMENT_MODIFIED,
        handler: this.onMeasurementModified
      },
      {
        eventTarget: element,
        eventType: cornerstoneTools.EVENTS.MEASUREMENT_REMOVED,
        handler: this.onMeasurementRemoved
      },
      {
        eventTarget: element,
        eventType: cornerstoneTools.EVENTS.MEASUREMENT_MODIFIED,
        handler: this.onMeasurementModified
      },
      {
        eventTarget: element,
        eventType: cornerstoneTools.EVENTS.MOUSE_CLICK,
        handler: this.onMouseClick
      },
      {
        eventTarget: element,
        eventType: cornerstoneTools.EVENTS.MOUSE_DOWN,
        handler: this.onMouseClick
      },
      {
        eventTarget: element,
        eventType: cornerstoneTools.EVENTS.TOUCH_PRESS,
        handler: this.onTouchPress
      },
      {
        eventTarget: element,
        eventType: cornerstoneTools.EVENTS.TOUCH_START,
        handler: this.onTouchStart
      },
      {
        eventTarget: element,
        eventType: cornerstoneTools.EVENTS.DOUBLE_CLICK,
        handler: this.onDoubleClick
      },
      {
        eventTarget: element,
        eventType: cornerstoneTools.EVENTS.DOUBLE_TAP,
        handler: this.onDoubleClick
      },
      {
        eventTarget: window,
        eventType: EVENT_RESIZE,
        handler: this.onWindowResize
      },
      {
        eventTarget: cornerstone.events,
        eventType: cornerstone.EVENTS.IMAGE_LOADED,
        handler: this.onImageLoaded
      }
    ];

    this.eventHandlerData.forEach(data => {
      const { eventTarget, eventType, handler } = data;

      eventTarget.addEventListener(eventType, handler);
    });

    // Pass ELEMENT_ENABLED event to parent
    const onElementEnabledFn = evt => {
      const enabledElement = evt.detail.element;
      if (enabledElement === this.element) {
        if (this.props.onElementEnabled) {
          this.props.onElementEnabled(evt);
        }
        cornerstone.events.removeEventListener(
          cornerstone.EVENTS.ELEMENT_ENABLED,
          onElementEnabledFn
        );
      }
    };

    cornerstone.events.addEventListener(
      cornerstone.EVENTS.ELEMENT_ENABLED,
      onElementEnabledFn
    );
    cornerstone.enable(element, this.props.cornerstoneOptions);
    loadHandlerManager.setStartLoadHandler(
      this.startLoadingHandler,
      this.element
    );
    loadHandlerManager.setEndLoadHandler(this.doneLoadingHandler, this.element);

    // Handle the case where the imageId isn't loaded correctly and the
    // imagePromise returns undefined
    // To test, uncomment the next line
    //let imageId = 'AfileThatDoesntWork'; // For testing only!

    // const { imageId } = this.state;
    // let imagePromise;
    let imagePromises;
    try {
      imagePromises = this.props.viewportData.map((value) => {
        const imageIdObject = cornerstoneNIFTIImageLoader.nifti.ImageId.fromURL(value.imageId);
        return cornerstone.loadAndCacheImage(imageIdObject.url);
      });
      // imagePromise = cornerstone.loadAndCacheImage(imageId);
    } catch (error) {
      console.error(error);
      // if (!imagePromise) {
      //   this.setState({ error });
      //   return;
      // }
      if (!imagePromises) {
        this.setState({ error });
        return;
      }
    }

    Promise.all(imagePromises).then((images) => {
      try {
        cornerstone.getEnabledElement(element);
      } catch (error) {
        // Handle cases where the user ends the session before the image is displayed.
        console.error(error);
        return;
      }
      const stacks = images.map((image, index) => {
        const imageIdObject = cornerstoneNIFTIImageLoader.nifti.ImageId.fromURL(image.imageId);
        const numberOfSlices = cornerstone.metaData.get('multiFrameModule', imageIdObject.url).numberOfFrames;
        return {
          currentImageIdIndex: imageIdObject.slice.index,
          imageIds: Array.from(Array(numberOfSlices), (_, i) => `nifti:${imageIdObject.filePath}#${imageIdObject.slice.dimension}-${i},t-0`)
        }
      });
      // const imageIds = stacks.map(stack=>stack.imageIds);
      this.setState({
        stacks: stacks, 
        stack: stacks[0],
        // imageIds: imageIds,
        imageId: stacks[0].imageIds[stacks[0].currentImageIdIndex]
      });

      const layerIds = images.map((image, index) => {
        const layerId = cornerstone.addLayer(this.element, image, this.props.viewportData[index].options);
        if (index === 0) {
          cornerstone.setActiveLayer(this.element, layerId);
        }
        cornerstone.updateImage(this.element);
        return layerId;
      });
      // Clear any previous tool state
      cornerstoneTools.clearToolState(this.element, 'stack');
      cornerstoneTools.clearToolState(this.element, 'stackRenderer');
      cornerstoneTools.clearToolState(this.element, 'toggleScore');
      if (this.props.enableStackPrefetch) {
        cornerstoneTools.stackPrefetch.disable(this.element);
      }

      cornerstoneTools.addStackStateManager(element, [
        'stack',
        'stackRenderer',
        'playClip',
        'referenceLines',
        'toggleScore',
      ]);
      const stackRenderer = new cornerstoneTools.stackRenderers.FusionRenderer();
      stackRenderer.layerIds = layerIds;
      stackRenderer.findImageFn = (ids, currentId) => {
        const index = stacks[0].imageIds.indexOf(currentId);
        return ids[index];
      };
      cornerstoneTools.addToolState(element, 'stackRenderer', stackRenderer);
      stacks.forEach((stack) => {
        cornerstoneTools.addToolState(element, 'stack', stack);
      });
      cornerstoneTools.addToolState(element, 'toggleScore', this.props.toggleScore);

      if (this.props.enableStackPrefetch) {
        cornerstoneTools.stackPrefetch.enable(this.element);
      }

      initializeTools(cornerstoneTools, this.props.availableTools, element);

      this.setActiveTool(this.props.activeTool);

      /* For touch devices, by default we activate:
        - Pinch to zoom
        - Two-finger Pan
        - Three (or more) finger Stack Scroll
      */
      cornerstoneTools.setToolActive('PanMultiTouch', {
        mouseButtonMask: 0,
        isTouchActive: true
      });
      cornerstoneTools.setToolActive('ZoomTouchPinch', {
        mouseButtonMask: 0,
        isTouchActive: true
      });

      cornerstoneTools.setToolActive('StackScrollMultiTouch', {
        mouseButtonMask: 0,
        isTouchActive: true
      });

      // TODO: We should probably configure this somewhere else
      cornerstoneTools.stackPrefetch.setConfiguration({
        maxImagesToPrefetch: Infinity,
        preserveExistingPool: false,
        maxSimultaneousRequests: 6
      });

      /* For mouse devices, by default we turn on:
      - Stack scrolling by mouse wheel
      - Stack scrolling by keyboard up / down arrow keys
      - Pan with middle click
      - Zoom with right click
      */
      cornerstoneTools.setToolActive('StackScrollMouseWheel', {
        mouseButtonMask: 0,
        isTouchActive: true
      });

      this.setState({
        viewportHeight: `${this.element.clientHeight - 20}px`
      });
    },
    error => {
      console.error(error);

      this.setState({
        error
      })
    });

  }
};

export default AisCornerstoneLayerViewport;