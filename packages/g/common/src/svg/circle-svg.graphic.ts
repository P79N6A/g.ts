/*
 * @licence
 * Copyright (c) 2018 LinBo Len <linbolen@gradii.com>
 *
 * Use of this source code is governed by an MIT-style license.
 * See LICENSE file in the project root for full license information.
 *
 */

import { Attrs, Shape } from '@gradii/g/core';

@Attrs({
  x        : 0,
  y        : 0,
  r        : 0,
  lineWidth: 1
})
export class CircleSvgGraphic extends Shape {
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
