import { Attrs, Shape } from '@gradii/g/core';

@Attrs({
  x        : 0,
  y        : 0,
  rx       : 1,
  ry       : 1,
  lineWidth: 1
})
export class Ellipse extends Shape {
  canFill   = true;
  canStroke = true;
  type      = 'ellipse';

  getDefaultAttrs() {
    return {
      lineWidth: 1
    };
  }

  constructor(cfg) {
    super(cfg);
  }
}
