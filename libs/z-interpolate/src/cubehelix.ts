/**
 * @licence
 * Copyright (c) 2018 LinBo Len <linbolen@gradii.com>
 * Copyright (c) 2010-2016 Mike Bostock (https://github.com/d3/d3-interpolate)
 *
 * Use of this source code is governed by an MIT-style license.
 * See LICENSE file in the project root for full license information.
 */

import {ColorCubehelix} from '@gradii/g/z-color';
import {InterpolateColor, InterpolateHue} from './color';

export class InterpolateCubehelix {
  public h: any;
  public s: any;
  public l: any;
  public opacity: any;

  constructor(public hue: InterpolateHue = new InterpolateHue(), public gamma = 1) {
  }

  public interpolate(start, end) {
    this.h = this.hue.interpolate((start = ColorCubehelix.create(start)).h, (end = ColorCubehelix.create(end)).h);
    this.s = new InterpolateColor().interpolate(start.s, end.s);
    this.l = new InterpolateColor().interpolate(start.l, end.l);
    this.opacity = new InterpolateColor().interpolate(start.opacity, end.opacity);
  }

  public getResult(t) {
    return new ColorCubehelix(
      this.h.getResult(t),
      this.s.getResult(t),
      this.l.getResult(Math.pow(t, this.gamma)),
      this.opacity.getResult(t)
    );
  }

  public static create(hue, gamma = 1) {
    return new ColorCubehelix(hue, gamma);
  }
}

export class InterpolateCubehelixLong extends InterpolateCubehelix {
  constructor(gamma) {
    super(new InterpolateColor, gamma);
  }
}
