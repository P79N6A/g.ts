/*
 * @licence
 * Copyright (c) 2018 LinBo Len <linbolen@gradii.com>
 *
 * Use of this source code is governed by an MIT-style license.
 * See LICENSE file in the project root for full license information.
 *
 */

import { ShapeAttr, ShapeRenderPlatform } from '@gradii/g/core';
import { CircleCanvasGraphic } from './canvas/circle-canvas.graphic';
import { CircleSvgGraphic } from './svg/circle-svg.graphic';

@ShapeAttr({
  type   : 'circle',
  renders: [
    {platform: ShapeRenderPlatform.Canvas, render: CircleCanvasGraphic},
    {
      platform: ShapeRenderPlatform.Svg, render: CircleSvgGraphic
    }
  ]
})
export class CircleShape {
  public x         = 0;
  public y         = 0;
  public r         = 0;
  public lineWidth = 1;
}
