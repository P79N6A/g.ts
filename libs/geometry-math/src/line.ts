/**
 * @licence
 * Copyright (c) 2018 LinBo Len <linbolen@gradii.com>
 *
 * Use of this source code is governed by an MIT-style license.
 * See LICENSE file in the project root for full license information.
 */
import { Vector2 } from '@gradii/vector-math';

export namespace LineMath {
  export function at(p1, p2, t) {
    return (p2 - p1) * t + p1;
  }

  export function pointDistance(x1, y1, x2, y2, x, y) {
    const d = new Vector2(x2 - x1, y2 - y1);
    if (d.equals(Vector2.zero())){
      return NaN;
    }

    const u = new Vector2(-d.y, d.x);
    u.normalize();
    const a = new Vector2(x - x1, y - y1);
    return Math.abs(Vector2.dot(a, u));
  }

  export function box(x1, y1, x2, y2, lineWidth) {
    const halfWidth = lineWidth / 2;
    const minX      = Math.min(x1, x2);
    const maxX      = Math.max(x1, x2);
    const minY      = Math.min(y1, y2);
    const maxY      = Math.max(y1, y2);

    return {
      minX: minX - halfWidth,
      minY: minY - halfWidth,
      maxX: maxX + halfWidth,
      maxY: maxY + halfWidth
    };
  }

  export function len(x1, y1, x2, y2) {
    return Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
  }
}
