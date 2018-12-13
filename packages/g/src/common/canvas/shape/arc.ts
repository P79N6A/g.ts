/**
 * @licence
 * Copyright (c) 2018 LinBo Len <linbolen@gradii.com>
 *
 * Use of this source code is governed by an MIT-style license.
 * See LICENSE file in the project root for full license information.
 */

import { Attrs } from '../../annotations/annotations';
import { Shape } from '../../core/shape';
import { ArcMath } from '../../math/arc';
import { Inside } from '../../util/inside';

function _getArcX(x, radius, angle) {
  return x + (radius * Math.cos(angle));
}

function _getArcY(y, radius, angle) {
  return y + (radius * Math.sin(angle));
}

@Attrs({
  x         : 0,
  y         : 0,
  r         : 0,
  startAngle: 0,
  endAngle  : 0,
  clockwise : false,
  lineWidth : 1,
  startArrow: false,
  endArrow  : false,
})
export class Arc extends Shape {

  public canStroke = true;
  private type      = 'arc';

  constructor(cfg) {
    super(cfg);
  }

  public getDefaultAttrs() {
    return {
      x         : 0,
      y         : 0,
      r         : 0,
      startAngle: 0,
      endAngle  : 0,
      clockwise : false,
      lineWidth : 1,
      startArrow: false,
      endArrow  : false,
    };
  }

  public calculateBox() {
    const attrs                                      = this.__attrs;
    const {x, y, r, startAngle, endAngle, clockwise} = attrs;
    const lineWidth                                  = this.getHitLineWidth();
    const halfWidth                                  = lineWidth / 2;
    const box                                        = ArcMath.arcBox(x, y, r, startAngle, endAngle, clockwise);
    box.minX -= halfWidth;
    box.minY -= halfWidth;
    box.maxX += halfWidth;
    box.maxY += halfWidth;
    return box;
  }

  public isPointInPath(x, y) {
    const attrs                                = this.__attrs;
    const cx                                   = attrs.x;
    const cy                                   = attrs.y;
    const {r, startAngle, endAngle, clockwise} = attrs;
    const lineWidth                            = this.getHitLineWidth();
    if (this.hasStroke()) {
      return Inside.arcline(cx, cy, r, startAngle, endAngle, clockwise, lineWidth, x, y);
    }
    return false;
  }

  public createPath(context) {
    const attrs                                      = this.__attrs;
    const {x, y, r, startAngle, endAngle, clockwise} = attrs;
    context                                          = context || this.get('context');

    context.beginPath();
    context.arc(x, y, r, startAngle, endAngle, clockwise);
  }

  public afterPath(context) {
    const attrs                                      = this.__attrs;
    const {x, y, r, startAngle, endAngle, clockwise} = attrs;
    context                                          = context || this.get('context');
    let diff;
    let x1;
    let y1;
    let x2;
    let y2;

    if (attrs.startArrow) {
      diff = Math.PI / 180;
      if (clockwise) {
        diff *= -1;
      }
      x1 = _getArcX(x, r, startAngle + diff);
      y1 = _getArcY(y, r, startAngle + diff);
      x2 = _getArcX(x, r, startAngle);
      y2 = _getArcY(y, r, startAngle);
      Arrow.addStartArrow(context, attrs, x1, y1, x2, y2);
    }

    if (attrs.endArrow) {
      diff = Math.PI / 180;
      if (clockwise) {
        diff *= -1;
      }
      x1 = _getArcX(x, r, endAngle + diff);
      y1 = _getArcY(y, r, endAngle + diff);
      x2 = _getArcX(x, r, endAngle);
      y2 = _getArcY(y, r, endAngle);
      Arrow.addEndArrow(context, attrs, x2, y2, x1, y1);
    }
  }
}
