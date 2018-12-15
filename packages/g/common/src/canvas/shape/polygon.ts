/**
 * @licence
 * Copyright (c) 2018 LinBo Len <linbolen@gradii.com>
 *
 * Use of this source code is governed by an MIT-style license.
 * See LICENSE file in the project root for full license information.
 */

import { Attrs, Shape } from '@gradii/g/core';
import { Inside } from '@gradii/g/util';

@Attrs({
  points   : null,
  lineWidth: 1,
})
export class Polygon extends Shape {

  protected canFill   = true;
  protected canStroke = true;
  protected type      = 'polygon';

  constructor(cfg) {
    super(cfg);
  }

  public getDefaultAttrs() {
    return {
      lineWidth: 1,
    };
  }

  public calculateBox() {

    const attrs     = this.__attrs;
    const points    = attrs.points;
    const lineWidth = this.getHitLineWidth();
    if (!points || points.length === 0) {
      return null;
    }
    let minX = Infinity;
    let minY = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;

    Util.each(points, function (point) {
      const x = point[0];
      const y = point[1];
      if (x < minX) {
        minX = x;
      }
      if (x > maxX) {
        maxX = x;
      }

      if (y < minY) {
        minY = y;
      }

      if (y > maxY) {
        maxY = y;
      }
    });

    const halfWidth = lineWidth / 2;
    return {
      minX: minX - halfWidth,
      minY: minY - halfWidth,
      maxX: maxX + halfWidth,
      maxY: maxY + halfWidth,
    };
  }

  public isPointInPath(x, y) {

    const fill   = this.hasFill();
    const stroke = this.hasStroke();

    if (fill && stroke) {
      return this.__isPointInFill(x, y) || this.__isPointInStroke(x, y);
    }

    if (fill) {
      return this.__isPointInFill(x, y);
    }

    if (stroke) {
      return this.__isPointInStroke(x, y);
    }

    return false;
  }

  public __isPointInFill(x, y) {

    const context = this.get('context');
    this.createPath();
    return context.isPointInPath(x, y);
  }

  public __isPointInStroke(x, y) {

    const attrs  = this.__attrs;
    const points = attrs.points;
    if (points.length < 2) {
      return false;
    }
    const lineWidth = this.getHitLineWidth();
    const outPoints = points.slice(0);
    if (points.length >= 3) {
      outPoints.push(points[0]);
    }

    return Inside.polyline(outPoints, lineWidth, x, y);
  }

  public createPath(context?) {

    const attrs  = this.__attrs;
    const points = attrs.points;
    if (points.length < 2) {
      return;
    }
    context = context || this.get('context');
    context.beginPath();
    points.forEach((point, index) => {
      if (index === 0) {
        context.moveTo(point[0], point[1]);
      } else {
        context.lineTo(point[0], point[1]);
      }
    });
    context.closePath();
  }
}
