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
  width    : 0,
  height   : 0,
  radius   : 0,
  lineWidth: 1,
  fill     : 'none'
})
export class RectSvgGraphic extends Shape {
  canFill   = true;
  canStroke = true;
  type      = 'rect';

  constructor(cfg) {
    super(cfg);
  }

  getDefaultAttrs() {
    return {
      lineWidth: 1,
      fill     : 'none'
    };
  }

  _afterSetRadius() {
    const el = this.get('el');
    el.setAttribute('rx', this.__attrs.radius);
    el.setAttribute('ry', this.__attrs.radius);
  }

  _afterSetAttrAll(objs) {
    if ('radius' in objs) {
      this._afterSetRadius();
    }
  }
}
