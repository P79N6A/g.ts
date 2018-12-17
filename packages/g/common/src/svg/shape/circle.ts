import { Attrs, Shape } from '@gradii/g/core';

@Attrs({
  x        : 0,
  y        : 0,
  r        : 0,
  lineWidth: 1
})
export class Circle extends Shape {
  canFill   = true;
  canStroke = true;
  type      = 'circle';

  getDefaultAttrs() {
    return {
      lineWidth: 1,
      fill     : 'none'
    };
  }

  constructor(cfg) {
    super(cfg);
  }
}
