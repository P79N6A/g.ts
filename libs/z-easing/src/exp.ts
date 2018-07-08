/**
 * @licence
 * Copyright (c) 2018 LinBo Len <linbolen@gradii.com>
 *
 * Use of this source code is governed by an MIT-style license.
 * See LICENSE file in the project root for full license information.
 */

/**
 * @private
 */
export class ExpIn {

  public getRatio(p: number): number {
    return Math.pow(2, 10 * (p - 1)) - 0.001;
  }
}

/**
 * @private
 */
export class ExpOut {

  public getRatio(p: number): number {
    return 1 - Math.pow(2, -10 * p);
  }
}

/**
 * @private
 */
export class ExpInOut {

  public getRatio(p: number): number {
    return ((p *= 2) < 1) ? 0.5 * Math.pow(2, 10 * (p - 1)) : 0.5 * (2 - Math.pow(2, -10 * (p - 1)));
  }
}

export class EasingExp {
  public static easeIn: ExpIn       = new ExpIn();
  public static easeOut: ExpOut     = new ExpOut();
  public static easeInOut: ExpInOut = new ExpInOut();
}
