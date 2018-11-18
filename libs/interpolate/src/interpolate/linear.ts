/**
 * @licence
 * Copyright (c) 2018 LinBo Len <linbolen@gradii.com>
 *
 * Use of this source code is governed by an MIT-style license.
 * See LICENSE file in the project root for full license information.
 */

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
