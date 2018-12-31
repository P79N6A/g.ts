/**
 * @licence
 * Copyright (c) 2018 LinBo Len <linbolen@gradii.com>
 *
 * Use of this source code is governed by an MIT-style license.
 * See LICENSE file in the project root for full license information.
 */

import { Vector2 } from '@gradii/vector-math'
import { isNumberEqual } from '../../../util/src/isType';

export namespace QuadraticMath {
  export function at(p0, p1, p2, t) {
    const onet = 1 - t;
    return onet * (onet * p0 + 2 * t * p1) + t * t * p2;
  }

  export function projectPoint(x1, y1, x2, y2, x3, y3, x, y) {
    const rst = {};
    quadraticProjectPoint(x1, y1, x2, y2, x3, y3, x, y, rst);
    return rst;
  }

  export function quadraticProjectPoint(x1, y1, x2, y2, x3, y3, x, y, out) {
    let t;
    let interval  = 0.005;
    let d         = Infinity;
    let d1;
    let v1;
    let v2;
    let _t;
    let d2;
    let i;
    const EPSILON = 0.0001;
    const v0      = new Vector2(x, y);

    for (_t = 0; _t < 1; _t += 0.05) {
      v1 = new Vector2(
        at(x1, x2, x3, _t),
        at(y1, y2, y3, _t)
      );

      d1 = Vector2.squaredDistance(v0, v1);
      if (d1 < d) {
        t = _t;
        d = d1;
      }
    }
    d = Infinity;

    for (i = 0; i < 32; i++) {
      if (interval < EPSILON) {
        break;
      }

      const prev = t - interval;
      const next = t + interval;

      v1 = [
        at(x1, x2, x3, prev),
        at(y1, y2, y3, prev)
      ];

      d1 = Vector2.squaredDistance(v0, v1);

      if (prev >= 0 && d1 < d) {
        t = prev;
        d = d1;
      } else {
        v2 = [
          at(x1, x2, x3, next),
          at(y1, y2, y3, next)
        ];

        d2 = Vector2.squaredDistance(v0, v2);

        if (next <= 1 && d2 < d) {
          t = next;
          d = d2;
        } else {
          interval *= 0.5;
        }
      }
    }

    if (out) {
      out.x = at(x1, x2, x3, t);
      out.y = at(y1, y2, y3, t);
    }

    return Math.sqrt(d);
  }

  export function extrema(p0, p1, p2) {
    const a = p0 + p2 - 2 * p1;
    if (isNumberEqual(a, 0)) {
      return [0.5];
    }
    const rst = (p0 - p1) / a;
    if (rst <= 1 && rst >= 0) {
      return [rst];
    }
    return [];
  }
}
