/**
 * @licence
 * Copyright (c) 2018 LinBo Len <linbolen@gradii.com>
 * Copyright (c) 2010-2016 Mike Bostock (https://github.com/d3/d3-interpolate)
 *
 * Use of this source code is governed by an MIT-style license.
 * See LICENSE file in the project root for full license information.
 */

import {ColorHcl} from '@gradii/z-math/z-color';
import {InterpolateColor, InterpolateHue} from './color';

export class InterpolateHcl {
  private h: any;
  private c: any;
  private l: any;
  private opacity: any;

  constructor(public hue: InterpolateHue | InterpolateColor | any = new InterpolateHue()) {
  }

  public interpolate(start, end) {
    this.h = this.hue.interpolate((start = ColorHcl.create(start)).h, (end = ColorHcl.create(end)).h);
    this.c = new InterpolateColor().interpolate(start.c, end.c);
    this.l = new InterpolateColor().interpolate(start.l, end.l);
    this.opacity = new InterpolateColor().interpolate(start.opacity, end.opacity);
  }

  public getResult(t) {
    return new ColorHcl(
      this.h.getResult(t),
      this.c.getResult(t),
      this.l.getResult(t),
      this.opacity.getResult(t)
    );
  }
}

export class InterpolateHclLong extends InterpolateHcl {
  constructor(hue: InterpolateColor = new InterpolateColor()) {
    super(hue);
  }
}
