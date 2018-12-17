import { Attrs, Shape } from '@gradii/g/core';

@Attrs({
  x1        : 0,
  y1        : 0,
  x2        : 0,
  y2        : 0,
  lineWidth : 1,
  startArrow: false,
  endArrow  : false
})
export class Line extends Shape {
  public canStroke = true;
  public type      = 'line';

  getDefaultAttrs() {
    return {
      lineWidth : 1,
      stroke    : '#000',
      startArrow: false,
      endArrow  : false
    };
  }

  _afterSetAttrStroke(value) {
    const start = this.get('marker-start');
    const end   = this.get('marker-end');
    if (start) {
      this.get('defs')
        .findById(start)
        .update(value);
    }
    if (end) {
      this.get('defs')
        .findById(end)
        .update(value);
    }
  }

  _afterSetAttrAll(objs) {
    if (objs.stroke) {
      this._afterSetAttrStroke(objs.stroke);
    }
  }

  createPath() {}

  getPoint(t) {
    const attrs = this.__attrs;
    return {
      x: (attrs.x2 - attrs.x1) * t + attrs.x1,
      y: (attrs.y2 - attrs.y1) * t + attrs.y1
    };
  }

  constructor(cfg) {
    super(cfg);
  }
}
