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
  public l: InterpolateColor;
  public a: InterpolateColor;
  public b: InterpolateColor;
  public opacity: InterpolateColor;

  public interpolate(start: string, end: string) {
    const _start = ColorLab.create(start);
    const _end = ColorLab.create(end);

    this.l = new InterpolateColor().interpolate(_start.l, _end.l);
    this.a = new InterpolateColor().interpolate(_start.a, _end.a);
    this.b = new InterpolateColor().interpolate(_start.b, _end.b);
    this.opacity = new InterpolateColor().interpolate(_start.opacity, _end.opacity);
    return this;
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
