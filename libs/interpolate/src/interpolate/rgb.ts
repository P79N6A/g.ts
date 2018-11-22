/**
 * @licence
 * Copyright (c) 2018 LinBo Len <linbolen@gradii.com>
 *
 * Use of this source code is governed by an MIT-style license.
 * See LICENSE file in the project root for full license information.
 */

import { Rgb } from '@gradii/color';
import { InterpolateBSpline } from './b-spline';
import { InterpolateBSplineClosed } from './b-spline-closed';
import { InterpolateColor } from './color';

export class InterpolateRgb {
  public r;
  public g;
  public b;
  public opacity;

  constructor(private _gamma = 1) {
  }

  public interpolate(start, end) {
    const _start = Rgb.create(start);
    const _end   = Rgb.create(end);

    this.r       = new InterpolateColor(this._gamma).interpolate(_start.r, _end.r);
    this.g       = new InterpolateColor(this._gamma).interpolate(_start.g, _end.g);
    this.b       = new InterpolateColor(this._gamma).interpolate(_start.b, _end.b);
    this.opacity = new InterpolateColor().interpolate(_start.opacity, _end.opacity);
    return this;
  }

  public getResult(t) {
    return new Rgb(
      this.r(t),
      this.g(t),
      this.b(t),
      this.opacity(t)
    );
  }
}

export class InterpolateRgbBSpline {
  public sR: any;
  public sG: any;
  public sB: any;

  public interpolate(colors) {
    const n = colors.length;
    let r   = new Array(n),
          g = new Array(n),
          b = new Array(n),
          i, color;
    for (i = 0; i < n; ++i) {
      color = Rgb.create(colors[i]);
      r[i]  = color.r || 0;
      g[i]  = color.g || 0;
      b[i]  = color.b || 0;
    }
    this.sR = new InterpolateBSpline().interpolate(r);
    this.sG = new InterpolateBSpline().interpolate(g);
    this.sB = new InterpolateBSpline().interpolate(b);
    return this;
  }

  public getResult(t) {
    return new Rgb(
      this.sR.getResult(t),
      this.sG.getResult(t),
      this.sB.getResult(t),
      1
    );
  }
}

export class InterpolateRgbBSplineClosed extends InterpolateRgbBSpline {
  public interpolate(colors) {
    const n = colors.length;
    let r   = new Array(n),
          g = new Array(n),
          b = new Array(n),
          i, color;
    for (i = 0; i < n; ++i) {
      color = Rgb.create(colors[i]);
      r[i]  = color.r || 0;
      g[i]  = color.g || 0;
      b[i]  = color.b || 0;
    }
    this.sR = new InterpolateBSplineClosed().interpolate(r);
    this.sG = new InterpolateBSplineClosed().interpolate(g);
    this.sB = new InterpolateBSplineClosed().interpolate(b);
    return this;
  }
}
