import Immutable from 'immutable';

export const makeDraggable = (svgElement) => {
  if (!svgElement) return console.error('makeDraggable() needs an element');
  const svg = svgElement.parentNode;
  // while (svg && svg.tagName !== 'svg') svg = svg.parentNode;
  if (!svg) return console.error(svgElement, 'must be inside an SVG wrapper');
  const doc = svg.ownerDocument;
  const root = doc.rootElement || doc.body || svg;
  let xlate; let txStartX; let txStartY; let
    mouseStart;
  const xforms = svgElement.transform.baseVal;

  svgElement.addEventListener('mousedown', startMove, false);

  function startMove(evt) {
    // console.log(evt)
    // We listen for mousemove/up on the root-most
    // element in case the mouse is not over el.
    root.addEventListener('mousemove', handleMove, false);
    root.addEventListener('mouseup', finishMove, false);
    root.addEventListener('mouseleave', finishMove, false);

    // Ensure that the first transform is a translate()
    xlate = xforms.numberOfItems > 0 && xforms.getItem(0);
    // console.log(xlate)
    // if (!xlate || xlate.type !== SVGTransform.SVG_TRANSFORM_TRANSLATE) {
    //   const translate = svg.createSVGTransform();
    //   translate.setTranslate(0, 0);
    //   xforms.insertItemBefore(translate, 0);
    // }

    txStartX = xlate.matrix.e;
    txStartY = xlate.matrix.f;
    // txStartX = 0;
    // txStartY = 0;
    mouseStart = getCoord(evt);
  }

  function handleMove(evt) {
    // console.log(evt)
    const point = getCoord(evt);
    const diffX = point.x - mouseStart.x;
    const diffY = point.y - mouseStart.y;

    xlate.setTranslate(
      txStartX + diffX,
      txStartY + diffY,
    );
  }

  function finishMove() {
    root.removeEventListener('mousemove', handleMove, false);
    root.removeEventListener('mouseup', finishMove, false);
  }
};

// Pen Tool

export const relativeCoordinatesForEvent = (mouseEvent, drawArea) => {
  // Get relative view point
  const boundingRect = drawArea.getBoundingClientRect();
  // console.log(boundingRect);
  return new Immutable.Map({
    x: mouseEvent.clientX - boundingRect.left,
    y: mouseEvent.clientY - boundingRect.top,
  });
};

// LineTool


// Helpers
function getCoord(e) {
  return {
    x: e.clientX,
    y: e.clientY,
  };
  // return pt.matrixTransform(svgElement.parentNode.getScreenCTM().inverse());
}
