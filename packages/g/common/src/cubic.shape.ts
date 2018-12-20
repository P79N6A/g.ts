/*
 * @licence
 * Copyright (c) 2018 LinBo Len <linbolen@gradii.com>
 *
 * Use of this source code is governed by an MIT-style license.
 * See LICENSE file in the project root for full license information.
 *
 */

import { ShapeAttr, ShapeRenderPlatform } from '@gradii/g/core';
import { CubicCanvasGraphic } from './canvas/cubic-canvas.graphic';
import { PathSvgGraphic } from './svg/path-svg.graphic';

@ShapeAttr({
  type   : 'cubic',
  renders: [
    {platform: ShapeRenderPlatform.Canvas, render: CubicCanvasGraphic},
    {platform: ShapeRenderPlatform.Canvas, render: PathSvgGraphic},
  ]
})
export class CubicShape {
  public p1        = null; // 起始点
  public p2        = null; // 第一个控制点
  public p3        = null; // 第二个控制点
  public p4        = null; // 终点
  public lineWidth = 1;
  public startArrow= false;
  public endArrow  = false;
}
