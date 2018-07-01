/**
 * @licence
 * Copyright (c) 2018 LinBo Len <linbolen@gradii.com>
 * Copyright (c) 2010-2016 Mike Bostock (https://github.com/d3/d3-interpolate)
 *
 * Use of this source code is governed by an MIT-style license.
 * See LICENSE file in the project root for full license information.
 */

import {ColorLab} from '@gradii/z-math/z-color';
import {InterpolateColor} from './color';

export class InterpolateLab {
  private l: InterpolateColor;
  private a: InterpolateColor;
  private b: InterpolateColor;
  private opacity: InterpolateColor;

  public interpolate(start, end) {
    this.l = new InterpolateColor().interpolate((start = ColorLab.create(start)).l, (end = ColorLab.create(end)).l);
    this.a = new InterpolateColor().interpolate(start.a, end.a);
    this.b = new InterpolateColor().interpolate(start.b, end.b);
    this.opacity = new InterpolateColor().interpolate(start.opacity, end.opacity);
  }

  public getResult(t) {
    return new ColorLab(
      this.l.getResult(t),
      this.a.getResult(t),
      this.b.getResult(t),
      this.opacity.getResult(t)
    );
  }
}
