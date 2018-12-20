/*
 * @licence
 * Copyright (c) 2018 LinBo Len <linbolen@gradii.com>
 *
 * Use of this source code is governed by an MIT-style license.
 * See LICENSE file in the project root for full license information.
 *
 */

import { isArray, isObject } from './isType';

const degree = Math.PI / 180;

/**
 * Convert Degree To Radian
 *
 * @param {Number} a Angle in Degrees
 */
export function toRadian(a: number) {
  return a * degree;
}

export function mathMod(m, p) {
  return ((m % p) + p) % p;
}

export function each(elements, func) {
  if (!elements) {
    return;
  }
  let rst;
  if (isArray(elements)) {
    const len = elements.length;
    let idx   = -1;

    while (++idx < len) {
      rst = func(elements[idx], idx);
      if (rst === false) {
        break;
      }
    }
  } else if (isObject(elements)) {
    for (const k in elements) {
      if (elements.hasOwnProperty(k)) {
        rst = func(elements[k], k);
        if (rst === false) {
          break;
        }
      }
    }
  }
}
