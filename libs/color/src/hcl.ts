/**
 * @licence
 * Copyright (c) 2018 LinBo Len <linbolen@gradii.com>
 *
 * Use of this source code is governed by an MIT-style license.
 * See LICENSE file in the project root for full license information.
 */

// tslint:disable triple-equals
import { Color } from './color';
import { rad2deg } from './common';
import { clamp } from './helper';
import { Lab } from './lab';
import { Rgb } from './rgb';

const K = 18;

export class Hcl extends Color {

  private _h;
  private _c;
  private _l;
  private _opacity;

  // @formatter:off
  public get h() { return this._h; }
  public set h(value) { this._h = clamp(value, 0, 360); }

  public get c() { return this._c; }
  public set c(value) { this._c = clamp(value, 0, 100); }

  public get l() { return this._l; }
  public set l(value) { this._l = clamp(value, 0, 100); }

  public get opacity() { return this._opacity; }
  public set opacity(value) { this._opacity = clamp(value, 0, 1); }

  // @formatter:on
  constructor(h, c, l, opacity) {
    super();
    this._h       = h;
    this._c       = c;
    this._l       = l;
    this._opacity = opacity;
  }

  public brighter(k) {
    return new Hcl(this._h, this._c, this._l + K * (k == null ? 1 : k), this._opacity);
  }

  public darker(k) {
    return new Hcl(this._h, this._c, this._l - K * (k == null ? 1 : k), this._opacity);
  }

  public rgb(): Rgb {
    return Lab.create(this).rgb();
  }

  public static create(o) {
    if (o instanceof Hcl) {
      return new Hcl(o._h, o._c, o._l, o._opacity);
    }
    if (!(o instanceof Lab)) {
      o = Lab.create(o);
    }
    if (o.a === 0 && o.b === 0) {
      return new Hcl(NaN, 0, o.l, o.opacity);
    }
    let h = Math.atan2(o.b, o.a) * rad2deg;
    return new Hcl(h < 0 ? h + 360 : h, Math.sqrt(o.a * o.a + o.b * o.b), o.l, o.opacity);
  }
}

export function hcl(color): Hcl;
export function hcl(h, c, l, opacity?);
export function hcl(h, c?, l?, opacity?) {
  if (arguments.length === 1) {
    return Hcl.create(h);
  }
  return new Hcl(h, c, l, opacity);
}
