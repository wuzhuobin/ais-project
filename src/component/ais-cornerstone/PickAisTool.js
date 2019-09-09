import cornerstoneTools from 'cornerstone-tools';
import cornerstone from 'cornerstone-core';

const BaseTool = cornerstoneTools.import('base/BaseTool');
const getRGBPixels = cornerstoneTools.import('util/getRGBPixels');
const calculateSUV = cornerstoneTools.import('util/calculateSUV');
const getNewContext = cornerstoneTools.import('drawing/getNewContext');
const draw = cornerstoneTools.import('drawing/draw');
const setShadow = cornerstoneTools.import('drawing/setShadow');
// const drawCircle = cornerstoneTools.import('drawing/drawCircle');
const drawTextBox = cornerstoneTools.import('drawing/drawTextBox');
const textBoxWidth = cornerstoneTools.import('drawing/drawTextBox');
const { probeCursor } = cornerstoneTools.import('tools/cursors');
const textStyle = cornerstoneTools.textStyle;
const toolColors = cornerstoneTools.toolColors;

/**
 * @public
 * @class PickAisTool
 * @memberof Tools
 *
 * @classdesc Tool which provides a probe of the image data at the
 * input position on drag.
 * @extends Tools.Base.BaseTool
 */
export default class PickAisTool extends BaseTool {
  constructor(props = {}) {
    const defaultProps = {
      name: 'PickAis',
      strategies: {
        default: defaultStrategy,
        // minimal: minimalStrategy,
      },
      defaultStrategy: 'default',
      supportedInteractionTypes: ['Mouse', 'Touch'],
      svgCursor: probeCursor,
      aisImaeg: null,
    };

    super(props, defaultProps);

    // this.touchDragCallback = this._movingEventCallback.bind(this);
    // this.touchEndCallback = this._endMovingEventCallback.bind(this);

    // this.mouseDragCallback = this._movingEventCallback.bind(this);
    // this.mouseUpCallback = this._endMovingEventCallback.bind(this);
    this.mouseClickCallback = this._movingEventCallback.bind(this);

    this.dragEventData = {};
  }

  _movingEventCallback(evt) {
    const eventData = evt.detail;
    const { element } = eventData;

    this.dragEventData = eventData;
    cornerstone.updateImage(element);
  }

  // _endMovingEventCallback(evt) {
  //   const eventData = evt.detail;
  //   const { element } = eventData;

  //   this.dragEventData = {};
  //   cornerstone.updateImage(element);
  // }

  renderToolData(evt) {
    if (!this.dragEventData.currentPoints) {
      return;
    }

    if (
      evt &&
      evt.detail &&
      Boolean(Object.keys(this.dragEventData.currentPoints).length)
    ) {
      evt.detail.currentPoints = this.dragEventData.currentPoints;
      this.applyActiveStrategy(evt);
    }
  }
}

/**
 * Default strategy will pick the exactly point of mouse/touch interact and display the probe data.
 *
 * @param  {Object} evt Image rendered event
 * @param  {Object} config Tool configuration
 * @returns {void}
 */
const defaultStrategy = (evt, config) => {
  const eventData = evt.detail;
  const { element, image, currentPoints, canvasContext } = eventData;

  const context = getNewContext(canvasContext.canvas);

  const color = toolColors.getActiveColor();
  const fontHeight = textStyle.getFontSize();

  const x = Math.round(currentPoints.image.x);
  const y = Math.round(currentPoints.image.y);

  if (x < 0 || y < 0 || x >= image.columns || y >= image.rows) {
    return;
  }

  draw(context, context => {
    setShadow(context, config);

    const text = `${x}, ${y}`;
    let storedPixels;
    let str;

    if (image.color) {
      storedPixels = getRGBPixels(element, x, y, 1, 1);
      str = `R: ${storedPixels[0]} G: ${storedPixels[1]} B: ${
        storedPixels[2]
      } A: ${storedPixels[3]}`;
    } else {
      storedPixels = cornerstone.getStoredPixels(element, x, y, 1, 1);
      const sp = storedPixels[0];
      const mo = sp * image.slope + image.intercept;
      const suv = calculateSUV(image, sp);

      // Draw text
      str = `SP: ${sp} MO: ${parseFloat(mo.toFixed(3))}`;
      if (suv) {
        str += ` SUV: ${parseFloat(suv.toFixed(3))}`;
      }
    }

    // Draw text 5px away from cursor
    const textCoords = {
      x: currentPoints.canvas.x + 5,
      y: currentPoints.canvas.y - 5,
    };

    drawTextBox(
      context,
      str,
      textCoords.x,
      textCoords.y + fontHeight + 5,
      color
    );
    drawTextBox(context, text, textCoords.x, textCoords.y, color);
  });
};
