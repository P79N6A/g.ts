/*
 * @licence
 * Copyright (c) 2018 LinBo Len <linbolen@gradii.com>
 *
 * Use of this source code is governed by an MIT-style license.
 * See LICENSE file in the project root for full license information.
 *
 */

import { Attrs, Shape } from '@gradii/g/core';
import { parsePath } from './format';
import { isFunction } from './isType';
import { PathSegment } from './path-segment';

@Attrs({
  path     : null,
  lineWidth: 1
})
export class Marker extends Shape {
  public type      = 'marker';
  public canFill   = true;
  public canStroke = true;

  static Symbols = {
    // 圆
    circle(x, y, r) {
      return [
        ['M', x, y],
        ['m', -r, 0],
        ['a', r, r, 0, 1, 0, r * 2, 0],
        ['a', r, r, 0, 1, 0, -r * 2, 0]
      ];
    },
    // 正方形
    square(x, y, r) {
      return [
        ['M', x - r, y - r],
        ['L', x + r, y - r],
        ['L', x + r, y + r],
        ['L', x - r, y + r],
        ['Z']
      ];
    },
    // 菱形
    diamond(x, y, r) {
      return [
        ['M', x - r, y],
        ['L', x, y - r],
        ['L', x + r, y],
        ['L', x, y + r],
        ['Z']
      ];
    },
    // 三角形
    triangle(x, y, r) {
      const diffY = r * Math.sin((1 / 3) * Math.PI);
      return [
        ['M', x - r, y + diffY],
        ['L', x, y - diffY],
        ['L', x + r, y + diffY],
        ['z']
      ];
    },
    // 倒三角形
    'triangle-down': function (x, y, r) {
      const diffY = r * Math.sin((1 / 3) * Math.PI);
      return [
        ['M', x - r, y - diffY],
        ['L', x + r, y - diffY],
        ['L', x, y + diffY],
        ['Z']
      ];
    }
  };

  constructor(cfg) {
    super(cfg);
  }

  getDefaultAttrs() {
    return {
      x        : 0,
      y        : 0,
      lineWidth: 1
    };
  }

  calculateBox() {
    const attrs     = this._attrs;
    const cx        = attrs.x;
    const cy        = attrs.y;
    const r         = attrs.radius;
    const lineWidth = this.getHitLineWidth();
    const halfWidth = lineWidth / 2 + r;
    return {
      minX: cx - halfWidth,
      minY: cy - halfWidth,
      maxX: cx + halfWidth,
      maxY: cy + halfWidth
    };
  }

  _getPath() {
    const attrs  = this._attrs;
    const x      = attrs.x;
    const y      = attrs.y;
    const r      = attrs.radius || attrs.r;
    const symbol = attrs.symbol || 'circle';
    let method;
    if (isFunction(symbol)) {
      method = symbol;
    } else {
      method = Marker.Symbols[symbol];
    }
    return method(x, y, r);
  }

  createPath(context) {
    let segments = this._cfg.segments;
    if (segments && !this._cfg.hasUpdate) {
      context.beginPath();
      for (let i = 0; i < segments.length; i++) {
        segments[i].draw(context);
      }
      return;
    }

    const path = parsePath(this._getPath());
    context.beginPath();
    let preSegment;
    segments = [];
    for (let i = 0; i < path.length; i++) {
      const item = path[i];
      preSegment = new PathSegment(item, preSegment, i === path.length - 1);
      segments.push(preSegment);
      preSegment.draw(context);
    }
    this._cfg.segments  = segments;
    this._cfg.hasUpdate = false;
  }
}
