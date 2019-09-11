import CornerstoneLayerViewport from './CornerstoneLayerViewport';
import cornerstoneTools from 'cornerstone-tools';
import PropTypes from 'prop-types';

import ViewportOverlay from '../react-cornerstone-viewport/src/ViewportOverlay/ViewportOverlay';
import PickAisTool from './PickAisTool';
import './initCornerstone';

cornerstoneTools.PickAisTool = PickAisTool;

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
    scrollbarFlag: true
  };

  constructor(props) {
    super(props);
  }
};

export default AisCornerstoneLayerViewport;