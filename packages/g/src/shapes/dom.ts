import * as Shape from '../core/shape';

export class Dom extends Shape {
  canFill   = true;
  canStroke = true;
  type      = 'dom';

  calculateBox() {
    const self      = this;
    const attrs     = self._attrs;
    const x         = attrs.x;
    const y         = attrs.y;
    const width     = attrs.width;
    const height    = attrs.height;
    const lineWidth = this.getHitLineWidth();
    const halfWidth = lineWidth / 2;
    return {
      minX: x - halfWidth,
      minY: y - halfWidth,
      maxX: x + width + halfWidth,
      maxY: y + height + halfWidth
    };
  }

  constructor(cfg) {
    super(cfg);
  }
}
