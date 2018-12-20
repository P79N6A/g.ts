/*
 * @licence
 * Copyright (c) 2018 LinBo Len <linbolen@gradii.com>
 *
 * Use of this source code is governed by an MIT-style license.
 * See LICENSE file in the project root for full license information.
 *
 */

import { Attrs, ShapeAttr } from '@gradii/g/core';

@Attrs({
  x        : 0,
  y        : 0,
  rx       : 1,
  ry       : 1,
  lineWidth: 1
})
export class EllipseSvgGraphic extends ShapeAttr {
  canFill   = true;
  canStroke = true;
  type      = 'ellipse';

  constructor(cfg) {
    super(cfg);
  }

  getDefaultAttrs() {
    return {
      lineWidth: 1
    };
  }
}
