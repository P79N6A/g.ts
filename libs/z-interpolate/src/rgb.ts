/**
 * @licence
 * Copyright (c) 2018 LinBo Len <linbolen@gradii.com>
 * Copyright (c) 2010-2016 Mike Bostock (https://github.com/d3/d3-interpolate)
 *
 * Use of this source code is governed by an MIT-style license.
 * See LICENSE file in the project root for full license information.
 */

import {rgb as colorRgb} from 'd3-color';
import {InterpolateBSpline} from './b-spline';
import {InterpolateBSplineClosed} from './b-spline-closed';
import {InterpolateColor} from './color';

export class RgbGamma {
  private color;

  public r;
  public g;
  public b;
  public opacity;

  constructor(private _gamma = 1) {
    this.color = new InterpolateColor(_gamma);
  }

  public interpolate(start, end) {
    this.r = new InterpolateColor(this._gamma).interpolate((start = colorRgb(start)).r, (end = colorRgb(end)).r);
    this.g = new InterpolateColor(this._gamma).interpolate(start.g, end.g);
    this.b = new InterpolateColor(this._gamma).interpolate(start.b, end.b);
    this.opacity = new InterpolateColor().interpolate(start.opacity, end.opacity);
  }

  public getResult(t) {
    start.r = this.r(t);
    start.g = this.g(t);
    start.b = this.b(t);
    start.opacity = this.opacity(t);
    return start + '';
  }

  public static create(gamma) {
    return new RgbGamma(gamma);
  }
}

export class RgbSpline {

  constructor(private spline) {
    this.spline = spline;
  }

  public interpolate(colors) {
    const n = colors.length;
    let r = new Array(n),
      g = new Array(n),
      b = new Array(n),
      i, color;
    for (i = 0; i < n; ++i) {
      color = colorRgb(colors[i]);
      r[i] = color.r || 0;
      g[i] = color.g || 0;
      b[i] = color.b || 0;
    }
    const sR = this.spline(r);
    const sG = this.spline(g);
    const sB = this.spline(b);
    color.opacity = 1;
    return (t) => {
      color.r = sR(t);
      color.g = sG(t);
      color.b = sB(t);
      return color + '';
    };
  }

}

export const interpolateRgb = RgbGamma.create(1).interpolate;
export const interpolateRgbBasis = new RgbSpline(InterpolateBSpline).interpolate;
export const interpolateRgbBasisClosed = RgbSpline.create(interpolateBasisClosed).interpolate;
