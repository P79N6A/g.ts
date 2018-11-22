/**
 * @licence
 * Copyright (c) 2018 LinBo Len <linbolen@gradii.com>
 *
 * Use of this source code is governed by an MIT-style license.
 * See LICENSE file in the project root for full license information.
 */

import { InterpolateLinear } from './linear';

export class InterpolateHue {
  public a;
  public b;

  public interpolate(a, b) {
    this.a = a;
    this.b = b;
    return this;
  }

  public getResult(t) {
    const d = this.b - this.a;
    if (d) {
      return new InterpolateLinear()
        .interpolate(this.a, d > 180 || d < -180 ? d - 360 * Math.round(d / 360) : d)
        .getResult(t);
    } else {
      return isNaN(this.a) ? this.b : this.a
    }
  }
}
