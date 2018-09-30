/**
 * @licence
 * Copyright (c) 2018 LinBo Len <linbolen@gradii.com>
 * Copyright (c) 2010-2016 Mike Bostock (https://github.com/d3/d3-interpolate)
 *
 * Use of this source code is governed by an MIT-style license.
 * See LICENSE file in the project root for full license information.
 */

import {bSpline} from './b-spline';

export class InterpolateBSplineClosed {
  public values;

  public interpolate(values) {
    this.values = values;
    return this;
  }

  public getResult(t) {
    const values = this.values;
    let n = values.length;
    let i = Math.floor(((t %= 1) < 0 ? ++t : t) * n),
      v0 = values[(i + n - 1) % n],
      v1 = values[i % n],
      v2 = values[(i + 1) % n],
      v3 = values[(i + 2) % n];
    return bSpline((t - i / n) * n, v0, v1, v2, v3);
  }
}