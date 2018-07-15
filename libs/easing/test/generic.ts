/**
 * @licence
 * Copyright (c) 2018 LinBo Len <linbolen@gradii.com>
 *
 * Use of this source code is governed by an MIT-style license.
 * See LICENSE file in the project root for full license information.
 */

export function genericOut(easeIn) {
  return (t) => {
    return 1 - easeIn(1 - t);
  };
}

export function genericInOut(easeIn) {
  return (t) => {
    return (t < 0.5 ? easeIn(t * 2) : (2 - easeIn((1 - t) * 2))) / 2;
  };
}
