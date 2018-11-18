/**
 * @licence
 * Copyright (c) 2018 LinBo Len <linbolen@gradii.com>
 * Copyright (c) 2010-2016 Mike Bostock (https://github.com/d3/d3-interpolate)
 *
 * Use of this source code is governed by an MIT-style license.
 * See LICENSE file in the project root for full license information.
 */

import {Hsl} from '@gradii/color';
import {InterpolateColor, InterpolateHue} from './color';

export class InterpolateHsl {
  public h: any;
  public s: any;
  public l: any;
  public opacity: any;

  public interpolate(start, end) {
    const _start = Hsl.create(start);
    const _end = Hsl.create(end);

    this.h = new InterpolateHue().interpolate(_start.h, _end.h);
    this.s = new InterpolateColor().interpolate(start.s, end.s);
    this.l = new InterpolateColor().interpolate(start.l, end.l);
    this.opacity = new InterpolateColor().interpolate(start.opacity, end.opacity);
    return this;
  }

  public getResult(t) {
    return new Hsl(
      this.h.getResult(t),
      this.s.getResult(t),
      this.l.getResult(t),
      this.opacity.getResult(t)
    );
  }
}

export class InterpolateHslLong extends InterpolateHsl {
  public interpolate(start, end) {
    const _start = Hsl.create(start);
    const _end = Hsl.create(end);

    this.h = new InterpolateColor().interpolate(_start.h, _end.h);
    this.s = new InterpolateColor().interpolate(start.s, end.s);
    this.l = new InterpolateColor().interpolate(start.l, end.l);
    this.opacity = new InterpolateColor().interpolate(start.opacity, end.opacity);
    return this;
  }
}
