/**
 * @licence
 * Copyright (c) 2018 LinBo Len <linbolen@gradii.com>
 * Copyright (c) 2010-2016 Mike Bostock (https://github.com/d3/d3-interpolate)
 *
 * Use of this source code is governed by an MIT-style license.
 * See LICENSE file in the project root for full license information.
 */

import {InterpolateConstant} from './constant';

export class InterpolateLinear {
  public a;
  public d;

  public interpolate(a, d) {
    this.a = a;
    this.d = d;
    return this;
  }

  public getResult(t) {
    return this.a + t * this.d;
  }
}

export class InterpolateExponential {
  public a;
  public b;

  constructor(public y) {
  }

  public interpolate(a, b) {
    this.a = a;
    this.b = b;
    return this;
  }

  public getResult(t) {
    return Math.pow(this.a + t * this.b, this.y);
  }
}

export class InterpolateHue {
  public a;
  public b;

  public interpolate(a, b) {
    this.a = a;
    this.b = b;
  }

  public getResult(t) {
    const d = this.b - this.a;
    if (d) {
      return new InterpolateLinear()
        .interpolate(this.a, d > 180 || d < -180 ? d - 360 * Math.round(d / 360) : d)
        .getResult(t);
    } else {
      return new InterpolateConstant(isNaN(this.a) ? this.b : this.a).getResult(t);
    }
  }
}

export class InterpolateColor {
  public a;
  public b;

  constructor(public gamma: number = 1) {
  }

  public interpolate(a, b) {
    this.a = a;
    this.b = b;
    return this;
  }

  public getResult(t) {
    if (this.gamma === 1) {
      const d = this.b - this.a;
      if (d) {
        return new InterpolateLinear()
          .interpolate(this.a, d)
          .getResult(t);
      } else {
        return new InterpolateConstant(isNaN(this.a) ? this.b : this.a)
          .interpolate()
          .getResult(t);
      }
    } else {
      if (this.b - this.a) {
        return new InterpolateExponential(this.gamma)
          .interpolate(this.a, this.b)
          .getResult(t);
      } else {
        return new InterpolateConstant(isNaN(this.a) ? this.b : this.a)
          .interpolate()
          .getResult(t);
      }
    }
  }
}
