/*
 * @licence
 * Copyright (c) 2018 LinBo Len <linbolen@gradii.com>
 *
 * Use of this source code is governed by an MIT-style license.
 * See LICENSE file in the project root for full license information.
 *
 */

import { ShapeAttr, ShapeRenderPlatform } from '@gradii/g/core';
import { EllipseCanvasGraphic } from './canvas/ellipse-canvas.graphic';
import { EllipseSvgGraphic } from './svg/ellipse-svg.graphic';

@ShapeAttr({
  type   : 'cubic',
  renders: [
    {platform: ShapeRenderPlatform.Canvas, render: EllipseCanvasGraphic},
    {platform: ShapeRenderPlatform.Canvas, render: EllipseSvgGraphic},
  ]
})
export class EllipseShape {
  public x        = 0;
  public y        = 0;
  public rx       = 1;
  public ry       = 1;
  public lineWidth= 1;
}
