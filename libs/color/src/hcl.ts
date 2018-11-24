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
import { Lab } from './lab';
import { Rgb } from './rgb';

const K = 18;

export class Hcl extends Color {
  constructor(public h, public c, public  l, public opacity = 1) {
    super()
  }

  public brighter(k) {
    return new Hcl(this.h, this.c, this.l + K * (k == null ? 1 : k), this.opacity);
  }

  public darker(k) {
    return new Hcl(this.h, this.c, this.l - K * (k == null ? 1 : k), this.opacity);
  }

  public rgb(): Rgb {
    return Lab.create(this).rgb();
  }

  public static create(o) {
    if (o instanceof Hcl) {
      return new Hcl(o.h, o.c, o.l, o.opacity);
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
