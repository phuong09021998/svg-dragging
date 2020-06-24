import { makeDraggable } from './helpers';

export default class SVGHandler {
  constructor(document) {
    this.svgElements = null;
    this.document = document;
  }

  makeSVGsDraggable() {
    // console.log(this.document)
    this.svgElements = this.document.querySelectorAll('.draggable');
    this.svgElements.forEach((svgElement) => {
      console.log('OK');
      makeDraggable(svgElement);
    });
  }
}
