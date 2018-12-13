import * as Util from '../../util/index';
import * as Shape from '../core/shape';

Ellipse.ATTRS = {
  x        : 0,
  y        : 0,
  rx       : 1,
  ry       : 1,
  lineWidth: 1
};
Util.extend(Ellipse, Shape);

export class Ellipse {
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
