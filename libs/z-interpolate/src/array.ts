/**
 * @licence
 * Copyright (c) 2018 LinBo Len <linbolen@gradii.com>
 * Copyright (c) 2010-2016 Mike Bostock (https://github.com/d3/d3-interpolate)
 *
 * Use of this source code is governed by an MIT-style license.
 * See LICENSE file in the project root for full license information.
 */

import {interpolateValue} from './value';

export class InterpolateArray {
  private _x: any[];
  private _c: any[];

  public a: any[];
  public b: any[];

  private _init() {
    const nb = this.b ? this.b.length : 0;
    const na = this.a ? Math.min(nb, this.a.length) : 0;
    const x = new Array(na);
    const c = new Array(nb);

    let i;
    for (i = 0; i < na; ++i) {
      x[i] = interpolateValue(this.a[i], this.b[i]);
    }
    for (; i < nb; ++i) {
      c[i] = this.b[i];
    }

    this._x = x;
    this._c = c;
  }

  public interpolate(a: any[], b: any[]) {
    this.a = a;
    this.b = b;

    this._init();
    return this;
  }

  public getResult(t) {
    let rst = [];
    const mLen = Math.min(this.a.length, this.b.length);
    for (let i = 0; i < mLen; ++i) {
      rst[i] = this._x[i](t);
    }
    return [...rst, ...this._c];
  }
}