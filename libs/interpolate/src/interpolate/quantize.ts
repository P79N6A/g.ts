/**
 * @licence
 * Copyright (c) 2018 LinBo Len <linbolen@gradii.com>
 *
 * Use of this source code is governed by an MIT-style license.
 * See LICENSE file in the project root for full license information.
 */

export function interpolateQuantize(interpolator, n) {
  let samples = new Array(n);
  for (let i = 0; i < n; ++i) {
    samples[i] = interpolator(i / (n - 1));
  }
  return samples;
}

export class InterpolateQuantize {
  protected samples: any[];

  constructor(public interpolator: any) {
  }

  public interpolate(n) {
    this.samples = new Array(n);
    for (let i = 0; i < n; ++i) {
      this.samples[i] = this.interpolator(i / (n - 1));
    }
    return this;
  }

  public getResult(t) {
    return this.samples;
  }
}
