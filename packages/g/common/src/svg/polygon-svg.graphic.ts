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
  points   : null,
  lineWidth: 1
})
export class PolygonSvgGraphic extends Shape {
  canFill   = true;
  canStroke = true;
  type      = 'polygon';

  constructor(cfg) {
    super(cfg);
  }

  getDefaultAttrs() {
    return {
      lineWidth: 1,
      fill     : 'none'
    };
  }

  _afterSetAttrPoints() {
    const value = this.__attrs.points;
    const el    = this.get('el');
    let points  = value;
    if (!value || value.length === 0) {
      points = '';
    } else if (isArray(value)) {
      points = points.map(point => point[0] + ',' + point[1]);
      points = points.join(' ');
    }
    el.setAttribute('points', points);
  }

  _afterSetAttrAll(obj) {
    if ('points' in obj) {
      this._afterSetAttrPoints();
    }
  }

  createPath() {}


}
