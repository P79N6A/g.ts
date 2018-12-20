/*
 * @licence
 * Copyright (c) 2018 LinBo Len <linbolen@gradii.com>
 *
 * Use of this source code is governed by an MIT-style license.
 * See LICENSE file in the project root for full license information.
 *
 */

import { ShapeAttr, ShapeRenderPlatform } from 'packages/g/core';
import { ArcCanvasGraphic } from './canvas/arc-canvas.graphic';

@ShapeAttr({
  type     : 'arc',
  renders  : [
    {platform: ShapeRenderPlatform.Canvas, render: ArcCanvasGraphic}
  ]
})
export class ArcShape {
  public x          = 0;
  public y          = 0;
  public r          = 0;
  public startAngle = 0;
  public endAngle   = 0;
  public clockwise  = false;
  public lineWidth  = 1;
  public startArrow = false;
  public endArrow   = false;
}
