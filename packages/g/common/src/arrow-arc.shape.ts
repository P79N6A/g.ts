/*
 * @licence
 * Copyright (c) 2018 LinBo Len <linbolen@gradii.com>
 *
 * Use of this source code is governed by an MIT-style license.
 * See LICENSE file in the project root for full license information.
 *
 */

import { Shape, ShapeRenderPlatform } from '@gradii/g/core';
import { ArcShape } from './arc.shape';

@Shape({
  type     : 'arrow-arc',
  platforms: [ShapeRenderPlatform.Canvas, ShapeRenderPlatform.Svg],
})
export class ArrowArcShape extends ArcShape {
  public startArrow = false;
  public endArrow   = false;
}
