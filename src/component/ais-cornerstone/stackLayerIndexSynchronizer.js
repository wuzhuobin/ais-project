// import clip from '../util/clip.js';
import cornerstone from 'cornerstone-core';
import cornerstoneTools from 'cornerstone-tools'

function clip(val, low, high) {
  return Math.min(Math.max(low, val), high);
}
/**
 * Synchronize the target stack to the index closest to the source stack's index
 * @export
 * @public
 * @method
 * @name stackLayerIndexSynchronizer
 *
 * @param {Object} synchronizer - The Synchronizer instance that attaches this
 * handler to an event
 * @param {HTMLElement} sourceElement - The source element for the index value
 * @param {HTMLElement} targetElement - The target element
 * @returns {void}
 */
export default function(synchronizer, sourceElement, targetElement) {
  // Ignore the case where the source and target are the same enabled element
  if (targetElement === sourceElement) {
    return;
  }

  const sourceStackToolDataSource = cornerstoneTools.getToolState(sourceElement, 'stack');
  const sourceStackData = sourceStackToolDataSource.data[0];
  const targetStackToolDataSource = cornerstoneTools.getToolState(targetElement, 'stack');
  const targetStackData = targetStackToolDataSource.data[0];
  let newImageIdIndex = sourceStackData.currentImageIdIndex;

  const startLoadingHandler = cornerstoneTools.loadHandlerManager.getStartLoadHandler();
  const endLoadingHandler = cornerstoneTools.loadHandlerManager.getEndLoadHandler();
  const errorLoadingHandler = cornerstoneTools.loadHandlerManager.getErrorLoadingHandler();
  // Clamp the index
  newImageIdIndex = clip(
    newImageIdIndex,
    0,
    targetStackData.imageIds.length - 1
  );

  // Do nothing if the index has not changed
  if (newImageIdIndex === targetStackData.currentImageIdIndex) {
    return;
  }

  if (startLoadingHandler) {
    startLoadingHandler(targetElement);
  }

  targetStackData.currentImageIdIndex = newImageIdIndex;

  let loader;

  if (targetStackData.preventCache === true) {
    loader = cornerstone.loadImage(targetStackData.imageIds[newImageIdIndex]);
  } else {
    loader = cornerstone.loadAndCacheImage(
      targetStackData.imageIds[newImageIdIndex]
    );
  }

  if(targetStackToolDataSource.data.length > 1) {
    const stackRendererData = cornerstoneTools.getToolState(targetElement, 'stackRenderer');
    const stackRenderer = stackRendererData.data[0];

    loader.then( (image) => {
      stackRenderer.currentImageIdIndex = newImageIdIndex
      stackRenderer.render(targetElement, targetStackData.data);
      if (endLoadingHandler) {
        endLoadingHandler(targetElement, image);
      }
    }, 
    (error) => {
      const imageId = targetStackData.imageIds[newImageIdIndex];
      if (errorLoadingHandler) {
        errorLoadingHandler(targetElement, imageId, error);
      }
    });
  }
  else {
    loader.then(
      function (image) {
        const viewport = cornerstone.getViewport(targetElement);

        synchronizer.displayImage(targetElement, image, viewport);
        if (endLoadingHandler) {
          endLoadingHandler(targetElement, image);
        }
      },
      function (error) {
        const imageId = targetStackData.imageIds[newImageIdIndex];

        if (errorLoadingHandler) {
          errorLoadingHandler(targetElement, imageId, error);
        }
      }
    );
  }
}
