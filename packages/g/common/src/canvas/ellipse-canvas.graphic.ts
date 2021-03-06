/*
 * @licence
 * Copyright (c) 2018 LinBo Len <linbolen@gradii.com>
 *
 * Use of this source code is governed by an MIT-style license.
 * See LICENSE file in the project root for full license information.
 *
 */

import { Attrs, Shape } from '@gradii/g/core';
import { Inside } from '@gradii/g/util';
import { Matrix3, Vector2, Vector3 } from '@gradii/vector-math';

@Attrs({
  x        : 0,
  y        : 0,
  rx       : 1,
  ry       : 1,
  lineWidth: 1,
})
export class EllipseCanvasGraphic extends Shape {

  public canFill   = true;
  public canStroke = true;
  public type      = 'ellipse';

  constructor(cfg?) {
    super(cfg);
  }

  public getDefaultAttrs() {
    return {
      lineWidth: 1,
    };
  }

  public calculateBox() {
    const attrs      = this.__attrs;
    const cx         = attrs.x;
    const cy         = attrs.y;
    const rx         = attrs.rx;
    const ry         = attrs.ry;
    const lineWidth  = this.getHitLineWidth();
    const halfXWidth = rx + lineWidth / 2;
    const halfYWidth = ry + lineWidth / 2;

    return {
      minX: cx - halfXWidth,
      minY: cy - halfYWidth,
      maxX: cx + halfXWidth,
      maxY: cy + halfYWidth,
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
    const attrs = this.__attrs;
    const cx    = attrs.x;
    const cy    = attrs.y;
    const rx    = attrs.rx;
    const ry    = attrs.ry;

    const r      = (rx > ry) ? rx : ry;
    const scaleX = (rx > ry) ? 1 : rx / ry;
    const scaleY = (rx > ry) ? ry / rx : 1;

    const p = new Vector3(x, y, 1);
    const m = new Matrix3(1, 0, 0, 0, 1, 0, 0, 0, 1);
    m.scaleVector2(new Vector2(scaleX, scaleY));
    m.translate(new Vector2(cx, cy));
    m.inverse();
    m.transformVector3(p);

    return Inside.circle(0, 0, r, p[0], p[1]);
  }

  public __isPointInStroke(x, y) {
    const attrs     = this.__attrs;
    const cx        = attrs.x;
    const cy        = attrs.y;
    const rx        = attrs.rx;
    const ry        = attrs.ry;
    const lineWidth = this.getHitLineWidth();

    const r      = (rx > ry) ? rx : ry;
    const scaleX = (rx > ry) ? 1 : rx / ry;
    const scaleY = (rx > ry) ? ry / rx : 1;
    const p      = new Vector3(x, y, 1);
    const m      = new Matrix3(1, 0, 0, 0, 1, 0, 0, 0, 1);
    m.scaleVector2(new Vector2(scaleX, scaleY));
    m.translate(new Vector2(cx, cy));
    m.inverse();
    m.transformVector3(p);

    return Inside.arcline(0, 0, r, 0, Math.PI * 2, false, lineWidth, p[0], p[1]);
  }

  public createPath(context) {
    const attrs = this.__attrs;
    const cx    = attrs.x;
    const cy    = attrs.y;
    const rx    = attrs.rx;
    const ry    = attrs.ry;

    context      = context || self.get('context');
    const r      = (rx > ry) ? rx : ry;
    const scaleX = (rx > ry) ? 1 : rx / ry;
    const scaleY = (rx > ry) ? ry / rx : 1;

    const m = new Matrix3(
      1, 0, 0,
      0, 1, 0,
      0, 0, 1);
    m.scaleVector2(new Vector2(scaleX, scaleY));
    m.translate(new Vector2(cx, cy));
    context.beginPath();
    context.save();
    context.transform(m[0], m[1], m[3], m[4], m[6], m[7]);
    context.arc(0, 0, r, 0, Math.PI * 2);
    context.restore();
    context.closePath();
  }
}
