/**
 * @licence
 * Copyright (c) 2018 LinBo Len <linbolen@gradii.com>
 * Copyright (c) 2010-2016 Mike Bostock (https://github.com/d3/d3-interpolate)
 *
 * Use of this source code is governed by an MIT-style license.
 * See LICENSE file in the project root for full license information.
 */

import {interpolateValue} from './value';

export class InterpolateObject {
  public c: any = {};
  public i: any = {};

  public interpolate(a, b) {
    if (a === null || typeof a !== 'object') {
      a = {};
    }
    if (b === null || typeof b !== 'object') {
      b = {};
    }

    for (let k in b) {
      if (k in a) {
        this.i[k] = interpolateValue(a[k], b[k]);
      } else {
        this.c[k] = b[k];
      }
    }
    return this;
  }

  public getResult(t) {
    this.i.forEach((_i, k) => {
      this.c[k] = _i(t);
    });
    return this.c;
  }
}
