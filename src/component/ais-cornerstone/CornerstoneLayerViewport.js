import React, { Component } from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash.debounce';
import ReactResizeDetector from 'react-resize-detector';
import ImageScrollbar from '../react-cornerstone-viewport/src/ImageScrollbar/ImageScrollbar';
import ViewportOverlay from '../react-cornerstone-viewport/src/ViewportOverlay/ViewportOverlay';
import LoadingIndicator from '../react-cornerstone-viewport/src/LoadingIndicator/LoadingIndicator';
import ViewportOrientationMarkers from '../react-cornerstone-viewport/src/ViewportOrientationMarkers/ViewportOrientationMarkers';
import cornerstone from 'cornerstone-core';
import cornerstoneTools from 'cornerstone-tools';
import * as cornerstoneNIFTIImageLoader from 'cornerstone-nifti-image-loader';
import 'react-cornerstone-viewport'

import './CornerstoneLayerViewport.css';
import './initCornerstone';
import { prototype } from 'events';

const EVENT_RESIZE = 'resize';

const scrollToIndex = cornerstoneTools.import('util/scrollToIndex');

function setToolsPassive(cornerstoneTools, tools) {
  tools.forEach(tool => {
    cornerstoneTools.setToolPassive(tool);
  });
}

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

class CornerstoneLayerViewport extends Component {
  static defaultProps = {
    activeTool: 'Wwwc',
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
      { name: 'StackScrollMultiTouch' }
    ],
    viewportOverlayComponent: ViewportOverlay,
    overlayFlag: true,
    orientationMarkersFlag: true,
    scrollbarFlag: true
  };

  static propTypes = {
    activeTool: PropTypes.string.isRequired,
    viewportData: PropTypes.array.isRequired,
    cornerstoneOptions: PropTypes.object.isRequired,
    enableStackPrefetch: PropTypes.bool.isRequired,
    cineToolData: PropTypes.object.isRequired,
    availableTools: PropTypes.array.isRequired,
    onMeasurementsChanged: PropTypes.func,
    onElementEnabled: PropTypes.func,
    isActive: PropTypes.bool.isRequired,
    layout: PropTypes.object,
    children: PropTypes.node,
    onDoubleClick: PropTypes.func,
    onRightClick: PropTypes.func,
    onMouseClick: PropTypes.func,
    onTouchPress: PropTypes.func,
    onNewImage: PropTypes.func,
    onTouchStart: PropTypes.func,
    setViewportActive: PropTypes.func,
    viewportOverlayComponent: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.func
    ]),
    overlayFlag:PropTypes.bool,
    orientationMarkersFlag: PropTypes.bool,
    scrollbarFlag: PropTypes.bool
  };

  static loadIndicatorDelay = 45;

  constructor(props) {
    super(props);

    // TODO: Allow viewport as a prop
    // const viewportDataStack = props.viewportData.stack;
    // const stack = Object.assign({}, viewportDataStack);
    // const stack = {
    //   imageIds: [],
    //   currentImageIdIndex: 0
    // };
    const stacks = [];
    this.state = {
      viewportData: [],
      stack: null,
      stacks: stacks,
      imageId: null,
      // imageIds: [],
      viewportHeight: '100%',
      isLoading: false,
      error: null,
      viewport: cornerstone.getDefaultViewport(null, undefined)
    };

    const { loadHandlerManager } = cornerstoneTools;
    loadHandlerManager.setStartLoadHandler(this.startLoadingHandler);
    loadHandlerManager.setEndLoadHandler(this.doneLoadingHandler);

    this.debouncedResize = debounce(() => {
      try {
        cornerstone.getEnabledElement(this.element);
      } catch (error) {
        console.error(error);
        return;
      }

      cornerstone.resize(this.element, true);

      this.setState({
        viewportHeight: `${this.element.clientHeight - 20}px`
      });
    }, 300);

  }

  render() {
    const isLoading = this.state.isLoading;
    // TODO: Check this later

    const displayLoadingIndicator = isLoading || this.state.error;

    let className = 'CornerstoneViewport';
    if (this.props.isActive) {
      className += ' active';
    }

    const getOverlay = () => {
      if (this.props.overlayFlag === false || this.state.stack === null) {
        return null;
      }
      const Component = this.props.viewportOverlayComponent;

      return (
        <Component
          stack={this.state.stack}
          viewport={this.state.viewport}
          imageId={this.state.imageId}
        />
      );
    };

    const getScrollbar = () => {
      if (this.props.scrollbarFlag === false || this.state.stack === null) {
        return null;
      }
      return (
        <ImageScrollbar
          onInputCallback={this.imageSliderOnInputCallback}
          max={this.state.stack.imageIds.length - 1}
          value={this.state.stack.currentImageIdIndex}
          height={this.state.viewportHeight}
        />
      )
    }

    const getOrientationMarkers = () => {
      if(this.props.orientationMarkersFlag === false || this.state.stack === null) {
        return null;
      }
      return (
        <ViewportOrientationMarkers
          imageId={this.state.imageId}
          viewport={this.state.viewport}
        />
      );
    }

    return (
      <div className={className} >
        {ReactResizeDetector && (
          <ReactResizeDetector
            handleWidth
            handleHeight
            onResize={this.onWindowResize}
          />
        )}
        <div
          className="viewport-element"
          onContextMenu={this.onContextMenu}
          data-viewport-index={this.props.viewportIndex}
          ref={input => {
            this.element = input;
          }}
        >
          {displayLoadingIndicator && (
            <LoadingIndicator error={this.state.error} />
          )}
          <canvas className="cornerstone-canvas" />
          {getOverlay()}
          {getOrientationMarkers()}
        </div>
        {getScrollbar()}
        {this.props.children}
      </div>
    );
  }

  /**
   * Preventing the default behaviour for right-click is essential to
   * allow right-click tools to work.
   *
   * @param event
   */
  onContextMenu = event => {
    event.preventDefault();
  };

  onWindowResize = () => {
    this.debouncedResize();
  };

  onImageRendered = event => {
    this.setState({
      viewport: Object.assign({}, event.detail.viewport)
    });
  };

  onNewImage = event => {
    this.setState({
      imageId: event.detail.image.imageId
    });

    if (this.props.onNewImage) {
      this.props.onNewImage(event);
    }
  };

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
      if (this.props.enableStackPrefetch) {
        cornerstoneTools.stackPrefetch.disable(this.element);
      }

      cornerstoneTools.addStackStateManager(element, [
        'stack',
        'stackRenderer',
        'playClip',
        'referenceLines'
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

  onDoubleClick = event => {
    if (this.props.onDoubleClick) {
      this.props.onDoubleClick(event);
    }
  };

  componentWillUnmount() {
    this.eventHandlerData.forEach(data => {
      const { eventTarget, eventType, handler } = data;

      eventTarget.removeEventListener(eventType, handler);
    });

    const element = this.element;

    // Clear the stack prefetch data
    // TODO[cornerstoneTools]: Make this happen internally
    cornerstoneTools.clearToolState(element, 'stackPrefetch');

    // Disable the viewport element with Cornerstone
    // This also triggers the removal of the element from all available
    // synchronizers, such as the one used for reference lines.
    cornerstone.disable(element);

    // Try to stop any currently playing clips
    // Otherwise the interval will continuously throw errors
    // TODO[cornerstoneTools]: Make this happen internally
    try {
      const enabledElement = cornerstone.getEnabledElement(element);
      if (enabledElement) {
        cornerstoneTools.stopClip(element);
      }
    } catch (error) {
      //console.warn(error);
    }
  }

  componentDidUpdate(prevProps) {
    // TODO: Add a real object shallow comparison here?
    if(this.prevProps == null || this.prevProps.viewportData == null) {
      return;
    }
    if (this.prevProps.viewportData !== this.props.viewportData) {
      //////////////////////////////////////////////////
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
          cornerstone.getEnabledElement(this.element);
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
        const ImageIds = stacks.map(stack=>stack.ImageIds);
        console.log('stacks:', stacks);
        this.setState({ 
          stacks: stacks, 
          stack: stacks[0],
          // imageIds: ImageIds,
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

        cornerstoneTools.addStackStateManager(this.element, [
          'stack',
          'stackRenderer',
        ]);
        const stackRenderer = new cornerstoneTools.stackRenderers.FusionRenderer();
        stackRenderer.layerIds = layerIds;
        stackRenderer.findImageFn = (ids, currentId) => {
          const index = stacks[0].imageIds.indexOf(currentId);
          return ids[index];
        };
        cornerstoneTools.addToolState(this.element, 'stackRenderer', stackRenderer);
        stacks.forEach((stack) => {
          cornerstoneTools.addToolState(this.element, 'stack', stack);
        });
      });
      //////////////////////////////////////////////////
    }


  //   if (
  //     this.state.stack.currentImageIdIndex !==
  //       this.props.viewportData.stack.currentImageIdIndex &&
  //     prevProps.viewportData.stack.currentImageIdIndex !==
  //       this.props.viewportData.stack.currentImageIdIndex
  //   ) {
  //     const {
  //       displaySetInstanceUid,
  //       studyInstanceUid
  //     } = this.props.viewportData;

  //     const currentImageIdIndex = this.props.viewportData.stack
  //       .currentImageIdIndex;

  //     const viewportDataStack = this.props.viewportData.stack;
  //     const stack = Object.assign({}, viewportDataStack);
  //     const stackData = cornerstoneTools.getToolState(this.element, 'stack');
  //     let currentStack = stackData && stackData.data[0];

  //     if (!currentStack) {
  //       currentStack = {
  //         displaySetInstanceUid,
  //         studyInstanceUid,
  //         currentImageIdIndex,
  //         imageIds: stack.imageIds
  //       };

  //       cornerstoneTools.addStackStateManager(this.element, ['stack']);
  //       cornerstoneTools.addToolState(this.element, 'stack', currentStack);
  //     } else {
  //       scrollToIndex(this.element, currentImageIdIndex);

  //       // TODO: we should make something like setToolState by an ID
  //       currentStack.displaySetInstanceUid = displaySetInstanceUid;
  //       currentStack.studyInstanceUid = studyInstanceUid;
  //       currentStack.currentImageIdIndex = currentImageIdIndex;
  //       currentStack.imageIds = stack.imageIds;
  //     }

  //     const imageId = currentStack.imageIds[currentImageIdIndex];

  //     this.setState({
  //       displaySetInstanceUid,
  //       studyInstanceUid,
  //       stack,
  //       imageId
  //     });
  //   }

  //   if (this.props.activeTool !== prevProps.activeTool) {
  //     this.setActiveTool(this.props.activeTool);

  //     // TODO: Why do we need to do this in v3?
  //     cornerstoneTools.setToolActive('StackScrollMouseWheel', {
  //       mouseButtonMask: 0,
  //       isTouchActive: true
  //     });
  //   }

    if (this.props.layout !== prevProps.layout) {
      this.debouncedResize();
    }

    if (
      this.props.enableStackPrefetch !== prevProps.enableStackPrefetch &&
      this.props.enableStackPrefetch === true
    ) {
      cornerstoneTools.stackPrefetch.enable(this.element);
    } else if (
      this.props.enableStackPrefetch !== prevProps.enableStackPrefetch &&
      this.props.enableStackPrefetch === false
    ) {
      cornerstoneTools.stackPrefetch.disable(this.element);
    }

    if (
      this.props.cineToolData.isPlaying !== prevProps.cineToolData.isPlaying
    ) {
      if (this.props.cineToolData.isPlaying) {
        cornerstoneTools.playClip(this.element);
      } else {
        cornerstoneTools.stopClip(this.element);
      }
    }

    if (
      this.props.cineToolData.cineFrameRate !==
      prevProps.cineToolData.cineFrameRate
    ) {
      if (this.props.cineToolData.isPlaying) {
        cornerstoneTools.playClip(
          this.element,
          this.props.cineToolData.cineFrameRate
        );
      } else {
        cornerstoneTools.stopClip(
          this.element,
          this.props.cineToolData.cineFrameRate
        );
      }
    }
  }

  setActiveTool = activeTool => {
    // TODO: cache these, update it on componentDidUpdate
    const leftMouseToolNames = this.props.availableTools
      .filter(tool => {
        if (!tool.mouseButtonMasks) {
          return;
        }

        return tool.mouseButtonMasks.includes(1);
      })
      .map(tool => tool.name);

    const leftMouseToolsWithAnotherButtonMask = this.props.availableTools.filter(
      tool => {
        if (!tool.mouseButtonMasks) {
          return;
        }

        return (
          tool.mouseButtonMasks.includes(1) && tool.mouseButtonMasks.length > 1
        );
      }
    );

    try {
      setToolsPassive(cornerstoneTools, leftMouseToolNames);
    } catch (error) {
      // TODO: Looks like the Brush tool is calling updateImage, which is
      // failing because the image is not available yet in the enabledElement?
      // (Although I would have expected it to be there after displayImage is
      // called...)
      console.warn(error);
    }

    // This turns e.g. the Zoom and Pan tools back to active, if they
    // were bound to e.g. [1,2] or [1,4]
    leftMouseToolsWithAnotherButtonMask.forEach(tool => {
      const mouseButtonMask = tool.mouseButtonMasks.filter(mask => mask !== 1);
      cornerstoneTools.setToolActive(tool.name, {
        mouseButtonMask
      });
    });

    cornerstoneTools.setToolActive(activeTool, {
      mouseButtonMask: 1,
      isTouchActive: true
    });
  };

  onStackScroll = event => {
    this.setViewportActive();

    const element = event.currentTarget;
    const stackData = cornerstoneTools.getToolState(element, 'stack');
    const stack = stackData.data[0];

    this.setState({
      stack
    });
  };

  onImageLoaded = () => {
  };

  startLoadingHandler = () => {
    clearTimeout(this.loadHandlerTimeout);
    this.loadHandlerTimeout = setTimeout(() => {
      this.setState({
        isLoading: true
      });
    }, CornerstoneLayerViewport.loadIndicatorDelay);
  };

  doneLoadingHandler = () => {
    clearTimeout(this.loadHandlerTimeout);

    this.setState({
      isLoading: false
    });
  };

  onMeasurementAdded = event => {
    if (this.props.onMeasurementsChanged) {
      this.props.onMeasurementsChanged(event, 'added');
    }
  };

  onMeasurementRemoved = event => {
    if (this.props.onMeasurementsChanged) {
      this.props.onMeasurementsChanged(event, 'removed');
    }
  };

  onMeasurementModified = event => {
    if (this.props.onMeasurementsChanged) {
      this.props.onMeasurementsChanged(event, 'modified');
    }
  };

  setViewportActive = () => {
    if (!this.props.isActive && this.props.setViewportActive) {
      this.props.setViewportActive();
    }
  };

  onMouseClick = event => {
    this.setViewportActive();

    if (event.detail.event.which === 3) {
      if (this.props.onRightClick) {
        this.props.onRightClick(event);
      }
    } else {
      if (this.props.onMouseClick) {
        this.props.onMouseClick(event);
      }
    }
  };

  onTouchPress = event => {
    this.setViewportActive();

    if (this.props.onTouchPress) {
      this.props.onTouchPress(event);
    }
  };

  onTouchStart = (event) => {
    this.setViewportActive();

    if (this.props.onTouchStart) {
      this.props.onTouchStart(event);
    }
  };

  imageSliderOnInputCallback = value => {
    this.setViewportActive();

    scrollToIndex(this.element, value);
    const stacks = this.state.stacks.map((stack) => {
      const stack_ = stack;
      stack_.currentImageIdIndex = value;
      return  stack_;
    });
    this.setState({
      stack: stacks[0],
      stacks: stacks
    });

    // const stack = this.state.stack;
    // stack.currentImageIdIndex = value;

    // this.setState({
    //   stack
    // });
  };
}

export default CornerstoneLayerViewport;
