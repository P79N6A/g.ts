/**
 * @licence
 * Copyright (c) 2018 LinBo Len <linbolen@gradii.com>
 * Copyright (c) 2010-2016 Mike Bostock (https://github.com/d3/d3-interpolate)
 *
 * Use of this source code is governed by an MIT-style license.
 * See LICENSE file in the project root for full license information.
 */

import {ColorHsl} from '@gradii/z-math/z-color';
import {InterpolateColor, InterpolateHue} from './color';

export class InterpolateHsl {
  private h: any;
  private s: any;
  private l: any;
  private opacity: any;

  constructor(public hue: InterpolateHue | InterpolateColor | any = new InterpolateHue()) {
  }

  public interpolate(start, end) {
    this.h = this.hue.interpolate((start = ColorHsl.create(start)).h, (end = ColorHsl.create(end)).h);
    this.s = new InterpolateColor().interpolate(start.s, end.s);
    this.l = new InterpolateColor().interpolate(start.l, end.l);
    this.opacity = new InterpolateColor().interpolate(start.opacity, end.opacity);
  }

  public getResult(t) {
    return new ColorHsl(
      this.h.getResult(t),
      this.s.getResult(t),
      this.l.getResult(t),
      this.opacity.getResult(t)
    );
  }
}

export class InterpolateHslLong extends InterpolateHsl {
  constructor(hue: InterpolateColor = new InterpolateColor()) {
    super(hue);
  }
}
