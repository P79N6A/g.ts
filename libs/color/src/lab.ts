/**
 * @licence
 * Copyright (c) 2018 LinBo Len <linbolen@gradii.com>
 *
 * Use of this source code is governed by an MIT-style license.
 * See LICENSE file in the project root for full license information.
 */

import { Color } from './color';
import { deg2rad } from './common';
import { Hcl } from './hcl';
import { clamp } from './helper';
import { Rgb } from './rgb';

const K  = 18,
      Xn = 0.96422,
      Yn = 1,
      Zn = 0.82521,
      t0 = 16 / 116,
      t1 = 6 / 29,
      t2 = 3 * t1 * t1,
      t3 = t1 * t1 * t1;

function gray(l, opacity) {
  return new Lab(l, 0, 0, opacity === null ? 1 : opacity);
}

function xyz2lab(t) {
  return t > t3 ? Math.pow(t, 1 / 3) : t / t2 + t0;
}

function lab2xyz(t) {
  return t > t1 ? t * t * t : t2 * (t - t0);
}

function lrgb2rgb(x) {
  return 255 * (x <= 0.0031308 ? 12.92 * x : 1.055 * Math.pow(x, 1 / 2.4) - 0.055);
}

function rgb2lrgb(x) {
  return (x /= 255) <= 0.04045 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4);
}

export class Lab extends Color {
  private _l;
  private _a;
  private _b;
  private _opacity;

  //@formatter:off
  public get l() { return this._l; }
  public set l(value) { this._l = clamp(value, 0, 100); }

  public get a() { return this._a; }
  public set a(value) { this._a = clamp(value, 0, 128); }

  public get b() { return this._b; }
  public set b(value) { this._b = clamp(value, 0, 128); }

  public get opacity() { return this._opacity; }
  public set opacity(value) { this._opacity = clamp(value, 0, 1); }

  //@formatter:on
  constructor(l, a, b, opacity = 1) {
    super();

    this.l       = l;
    this.a       = a;
    this.b       = b;
    this.opacity = opacity;
  }

  public brighter(k) {
    return new Lab(this.l + K * (k === null ? 1 : k), this.a, this.b, this.opacity);
  }

  public darker(k) {
    return new Lab(this.l - K * (k === null ? 1 : k), this.a, this.b, this.opacity);
  }

  public rgb(): Rgb {
    let y = (this.l + 16) / 116,
        x = isNaN(this.a) ? y : y + this.a / 500,
        z = isNaN(this.b) ? y : y - this.b / 200;
    x     = Xn * lab2xyz(x);
    y     = Yn * lab2xyz(y);
    z     = Zn * lab2xyz(z);
    return new Rgb(// use D50
      lrgb2rgb(3.1338561 * x - 1.6168667 * y - 0.4906146 * z),
      lrgb2rgb(-0.9787684 * x + 1.9161415 * y + 0.0334540 * z),
      lrgb2rgb(0.0719453 * x - 0.2289914 * y + 1.4052427 * z),
    );
    // return new Rgb(// use D65
    //   lrgb2rgb(3.2404542 * x - 1.5371385 * y - 0.4985314 * z),
    //   lrgb2rgb(-0.9692660 * x + 1.8760108 * y + 0.0415560 * z),
    //   lrgb2rgb(0.0556434 * x - 0.2040259 * y + 1.0572252 * z),
    //   this.opacity
    // );
  }

  public static create(o: Lab | Hcl | Rgb | Color | string) {
    if (o instanceof Lab) { return new Lab(o.l, o.a, o.b, o.opacity); }
    if (o instanceof Hcl) {
      if (isNaN(o.h)) { return new Lab(o.l, 0, 0, o.opacity); }
      let h = o.h * deg2rad;
      return new Lab(o.l, Math.cos(h) * o.c, Math.sin(h) * o.c, o.opacity);
    }
    if (!(o instanceof Rgb)) { o = Rgb.create(o); }
    let r = rgb2lrgb((o as Rgb).r),
        g = rgb2lrgb((o as Rgb).g),
        b = rgb2lrgb((o as Rgb).b),
        y = xyz2lab((0.2225045 * r + 0.7168786 * g + 0.0606169 * b) / Yn), x, z;
    if (r === g && g === b) { x = z = y; } else {
      x = xyz2lab((0.4360747 * r + 0.3850649 * g + 0.1430804 * b) / Xn);
      z = xyz2lab((0.0139322 * r + 0.0971045 * g + 0.7141733 * b) / Zn);
    }
    return new Lab(116 * y - 16, 500 * (x - y), 200 * (y - z), (o as Rgb).opacity);
  }
}

export function lab(color): Lab;
export function lab(l, a, b, o?): Lab;
export function lab(l, a?, b?, o?): Lab {
  if (arguments.length === 1) {
    return Lab.create(l);
  }
  return new Lab(l, a, b, o);
}
