/**
 * @licence
 * Copyright (c) 2018 LinBo Len <linbolen@gradii.com>
 * Copyright (c) 2010-2016 Mike Bostock (https://github.com/d3/d3-interpolate)
 *
 * Use of this source code is governed by an MIT-style license.
 * See LICENSE file in the project root for full license information.
 */

export class InterpolateDate {
  constructor(protected a, protected b) {
  }

  public interpolate(t: number) {
    let d = new Date;
    d.setTime(+this.a + (this.b - this.a) * t);
    return d;
  }

  public static create(a, b) {
    return new InterpolateDate(a, b);
  }
}
