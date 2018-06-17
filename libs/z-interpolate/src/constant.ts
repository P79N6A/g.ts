/**
 * @licence
 * Copyright (c) 2018 LinBo Len <linbolen@gradii.com>
 * Copyright (c) 2010-2016 Mike Bostock (https://github.com/d3/d3-interpolate)
 *
 * Use of this source code is governed by an MIT-style license.
 * See LICENSE file in the project root for full license information.
 */

export class InterpolateConstant {
  constructor(protected x: any) {
  }

  public interpolate(t?: number) {
    return this.x;
  }

  public static create(a) {
    return new InterpolateConstant(a);
  }
}
