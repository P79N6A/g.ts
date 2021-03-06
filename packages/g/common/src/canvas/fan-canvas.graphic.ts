/*
 * @licence
 * Copyright (c) 2018 LinBo Len <linbolen@gradii.com>
 *
 * Use of this source code is governed by an MIT-style license.
 * See LICENSE file in the project root for full license information.
 *
 */

import { Attrs, Shape } from '@gradii/g/core';
import { Inside, isNumberEqual } from '@gradii/g/util';
import { Vector2 } from '@gradii/vector-math';
import { ArcMath } from '@gradii/geometry-math';

@Attrs({
  x         : 0,
  y         : 0,
  rs        : 0,
  re        : 0,
  startAngle: 0,
  endAngle  : 0,
  clockwise : false,
  lineWidth : 1,
})
export class FanCanvasGraphic extends Shape {
  public canFill   = true;
  public canStroke = true;
  public type      = 'fan';

  constructor(cfg?) {
    super(cfg);
  }

  public getDefaultAttrs() {
    return {
      clockwise: false,
      lineWidth: 1,
      rs       : 0,
      re       : 0,
    };
  }

  public calculateBox() {
    const self       = this;
    const attrs      = self.__attrs;
    const cx         = attrs.x;
    const cy         = attrs.y;
    const rs         = attrs.rs;
    const re         = attrs.re;
    const startAngle = attrs.startAngle;
    const endAngle   = attrs.endAngle;
    const clockwise  = attrs.clockwise;
    const lineWidth  = this.getHitLineWidth();

    const boxs = ArcMath.arcBox(cx, cy, rs, startAngle, endAngle, clockwise);
    const boxe = ArcMath.arcBox(cx, cy, re, startAngle, endAngle, clockwise);
    const minX = Math.min(boxs.minX, boxe.minX);
    const minY = Math.min(boxs.minY, boxe.minY);
    const maxX = Math.max(boxs.maxX, boxe.maxX);
    const maxY = Math.max(boxs.maxY, boxe.maxY);

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
    const attrs      = this.__attrs;
    const cx         = attrs.x;
    const cy         = attrs.y;
    const rs         = attrs.rs;
    const re         = attrs.re;
    const startAngle = attrs.startAngle;
    const endAngle   = attrs.endAngle;
    const clockwise  = attrs.clockwise;
    const v1         = new Vector2(1, 0);
    const subv       = new Vector2(x - cx, y - cy);
    const angle      = v1.angleTo(subv);

    const angle1 = ArcMath.nearAngle(angle, startAngle, endAngle, clockwise);

    if (isNumberEqual(angle, angle1)) {
      const ls = subv.squaredLength;
      if (rs * rs <= ls && ls <= re * re) {
        return true;
      }
    }
    return false;
  }

  public __isPointInStroke(x, y) {
    const attrs      = this.__attrs;
    const cx         = attrs.x;
    const cy         = attrs.y;
    const rs         = attrs.rs;
    const re         = attrs.re;
    const startAngle = attrs.startAngle;
    const endAngle   = attrs.endAngle;
    const clockwise  = attrs.clockwise;
    const lineWidth  = this.getHitLineWidth();

    const ssp = {
      x: Math.cos(startAngle) * rs + cx,
      y: Math.sin(startAngle) * rs + cy,
    };
    const sep = {
      x: Math.cos(startAngle) * re + cx,
      y: Math.sin(startAngle) * re + cy,
    };
    const esp = {
      x: Math.cos(endAngle) * rs + cx,
      y: Math.sin(endAngle) * rs + cy,
    };
    const eep = {
      x: Math.cos(endAngle) * re + cx,
      y: Math.sin(endAngle) * re + cy,
    };

    if (Inside.line(ssp.x, ssp.y, sep.x, sep.y, lineWidth, x, y)) {
      return true;
    }

    if (Inside.line(esp.x, esp.y, eep.x, eep.y, lineWidth, x, y)) {
      return true;
    }

    if (Inside.arcline(cx, cy, rs, startAngle, endAngle, clockwise, lineWidth, x, y)) {
      return true;
    }

    if (Inside.arcline(cx, cy, re, startAngle, endAngle, clockwise, lineWidth, x, y)) {
      return true;
    }

    return false;
  }

  public createPath(context) {
    const attrs      = this.__attrs;
    const cx         = attrs.x;
    const cy         = attrs.y;
    const rs         = attrs.rs;
    const re         = attrs.re;
    const startAngle = attrs.startAngle;
    const endAngle   = attrs.endAngle;
    const clockwise  = attrs.clockwise;

    const ssp = {
      x: Math.cos(startAngle) * rs + cx,
      y: Math.sin(startAngle) * rs + cy,
    };
    const sep = {
      x: Math.cos(startAngle) * re + cx,
      y: Math.sin(startAngle) * re + cy,
    };
    const esp = {
      x: Math.cos(endAngle) * rs + cx,
      y: Math.sin(endAngle) * rs + cy,
    };

    context = context || self.get('context');
    context.beginPath();
    context.moveTo(ssp.x, ssp.y);
    context.lineTo(sep.x, sep.y);
    context.arc(cx, cy, re, startAngle, endAngle, clockwise);
    context.lineTo(esp.x, esp.y);
    context.arc(cx, cy, rs, endAngle, startAngle, !clockwise);
    context.closePath();
  }

}
