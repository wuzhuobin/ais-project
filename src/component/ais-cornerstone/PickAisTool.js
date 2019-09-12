import cornerstoneTools from 'cornerstone-tools';
import cornerstone from 'cornerstone-core';

const BaseTool = cornerstoneTools.import('base/BaseTool');

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
      supportedInteractionTypes: ['Mouse', 'Touch'],
    };

    super(props, defaultProps);

    this.mouseClickCallback = this._movingEventCallback.bind(this);
  }

  _movingEventCallback(evt) {
    const eventData = evt.detail;
    const { element, currentPoints } = eventData;

    const x = Math.round(currentPoints.image.x);
    const y = Math.round(currentPoints.image.y);

    const pickAisData = cornerstoneTools.getToolState(element, 'stack').data;
    const currentImageIdIndex = pickAisData[0].currentImageIdIndex;
    const imageId = pickAisData[2].imageIds[currentImageIdIndex];

    cornerstone.loadAndCacheImage(imageId).then((image) => {
      const width = image.width;
      const height = image.height;
      if(x < 0 || x > width || y < 0 || y > height) {
        return;
      }

      const index = y * width + x;
      const pixelData = image.getPixelData()[index];

      console.log(pixelData);
      const toggleScore = cornerstoneTools.getToolState(element, 'toggleScore').data[0];
      // console.log(toggleScore)
      if (pixelData === 0) {
        return;
      }
      toggleScore(pixelData - 1)
    });
  }
}