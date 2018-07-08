/**
 * @licence
 * Copyright (c) 2018 LinBo Len <linbolen@gradii.com>
 * Copyright (c) 2010-2016 Mike Bostock (https://github.com/d3/d3-interpolate)
 *
 * Use of this source code is governed by an MIT-style license.
 * See LICENSE file in the project root for full license information.
 */

import {Hcl} from '@gradii/z-math/z-color';
import {InterpolateColor, InterpolateHue} from './color';

export class InterpolateHcl {
  public h: any;
  public c: any;
  public l: any;
  public opacity: any;

  public interpolate(start, end) {
    const _start = Hcl.create(start);
    const _end = Hcl.create(end);
    this.h = new InterpolateHue().interpolate(_start.h, _end.h);
    this.c = new InterpolateColor().interpolate(start.c, end.c);
    this.l = new InterpolateColor().interpolate(start.l, end.l);
    this.opacity = new InterpolateColor().interpolate(start.opacity, end.opacity);
    return this;
  }

  public getResult(t) {
    return new Hcl(
      this.h.getResult(t),
      this.c.getResult(t),
      this.l.getResult(t),
      this.opacity.getResult(t)
    );
  }
}

export class InterpolateHclLong extends InterpolateHcl {
  public interpolate(start: string, end: string) {
    const _start = Hcl.create(start);
    const _end = Hcl.create(end);
    this.h = new InterpolateHue().interpolate(_start.h, _end.h);
    this.c = new InterpolateColor().interpolate(_start.c, _end.c);
    this.l = new InterpolateColor().interpolate(_start.l, _end.l);
    this.opacity = new InterpolateColor().interpolate(_start.opacity, _end.opacity);
    return this;
  }
}
