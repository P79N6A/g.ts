/**
 * @licence
 * Copyright (c) 2018 LinBo Len <linbolen@gradii.com>
 *
 * Use of this source code is governed by an MIT-style license.
 * See LICENSE file in the project root for full license information.
 */

import {InterpolateNumber} from './number';

let reA = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,
  reB = new RegExp(reA.source, 'g');

function zero(b) {
  return () => b;
}

function one(b) {
  return t => b(t) + '';
}

export class InterpolateString {
  public interpolate(a, b) {
    let bi = reA.lastIndex = reB.lastIndex = 0, // scan index for next number in b
      am, // current match in a
      bm, // current match in b
      bs, // string preceding current number in b, if any
      i = -1, // index in s
      s = [], // string constants and placeholders
      q = []; // number interpolators

    // Coerce inputs to strings.
    a = a + '', b = b + '';

    // Interpolate pairs of numbers in a & b.
    while ((am = reA.exec(a)) && (bm = reB.exec(b))) {
      if ((bs = bm.index) > bi) { // a string precedes the next number in b
        bs = b.slice(bi, bs);
        if (s[i]) {
          s[i] += bs;
        } else { // coalesce with previous string
          s[++i] = bs;
        }
      }
      if ((am = am[0]) === (bm = bm[0])) { // numbers in a & b match
        if (s[i]) {
          s[i] += bm;
        } else { // coalesce with previous string
          s[++i] = bm;
        }
      } else { // interpolate non-matching numbers
        s[++i] = null;
        q.push({i, x: InterpolateNumber(am, bm)});
      }
      bi = reB.lastIndex;
    }

    // Add remains of b.
    if (bi < b.length) {
      bs = b.slice(bi);
      if (s[i]) {
        s[i] += bs;
      } else { // coalesce with previous string
        s[++i] = bs;
      }
    }

    return this;
  }

  public getResult(t) {

    // Special optimization for only a single match.
    // Otherwise, interpolate each of the numbers and rejoin the string.
    return (s.length < 2 ? (q[0]
      ? one(q[0].x)
      : zero(b))
      : (b = q.length, (t => {
        for (let i = 0, o; i < b; ++i) {
          s[(o = q[i]).i] = o.x(t);
        }
        return s.join('');
      })))(t);
  }
}
