/**
 * @licence
 * Copyright (c) 2018 LinBo Len <linbolen@gradii.com>
 *
 * Use of this source code is governed by an MIT-style license.
 * See LICENSE file in the project root for full license information.
 */

import { Vector2 } from '@gradii/vector-math';
import { mathMod } from 'ramda';

type radians = number;

export namespace ArcMath {

  export function circlePoint(cx, cy, r, angle) {
    return {
      x: Math.cos(angle) * r + cx,
      y: Math.sin(angle) * r + cy
    };
  }

  export function angleNearTo(angle, min, max, out?) {
    let v1;
    let v2;
    if (out) {
      if (angle < min) {
        v1 = min - angle;
        v2 = Math.PI * 2 - max + angle;
      } else if (angle > max) {
        v1 = Math.PI * 2 - angle + min;
        v2 = angle - max;
      }
    } else {
      v1 = angle - min;
      v2 = max - angle;
    }

    return v1 > v2 ? max : min;
  }

  export function nearAngle(angle: radians, startAngle: number, endAngle: number, clockwise: number) {
    let plus = 0;
    if (endAngle - startAngle >= Math.PI * 2) {
      plus = Math.PI * 2;
    }
    startAngle = mathMod(startAngle, Math.PI * 2);
    endAngle   = mathMod(endAngle, Math.PI * 2) + plus;
    angle      = mathMod(angle, Math.PI * 2);
    if (clockwise) {
      if (startAngle >= endAngle) {
        if (angle > endAngle && angle < startAngle) {
          return angle;
        }
        return ArcMath.angleNearTo(angle, endAngle, startAngle, true);
      }
      if (angle < startAngle || angle > endAngle) {
        return angle;
      }
      return ArcMath.angleNearTo(angle, startAngle, endAngle);
    }
    if (startAngle <= endAngle) {
      if (startAngle < angle && angle < endAngle) {
        return angle;
      }
      return ArcMath.angleNearTo(angle, startAngle, endAngle, true);
    }
    if (angle > startAngle || angle < endAngle) {
      return angle;
    }
    return ArcMath.angleNearTo(angle, endAngle, startAngle);
  }

  export function projectPoint(cx, cy, r, startAngle, endAngle, clockwise, x, y, out?) {
    const v    = new Vector2(x, y);
    const v0   = new Vector2(cx, cy);
    const v1   = new Vector2(1, 0);
    const subv = v.subtract(v0);
    let angle  = v1.angleTo(subv);

    angle        = ArcMath.nearAngle(angle, startAngle, endAngle, clockwise);
    const vpoint = new Vector2(r * Math.cos(angle) + cx, r * Math.sin(angle) + cy);
    if (out) {
      out.x = vpoint.x;
      out.y = vpoint.y;
    }
    const d = Vector2.distance(vpoint, v);
    return d;
  }

  export function arcBox(cx, cy, r, startAngle, endAngle, clockwise) {
    const angleRight  = 0;
    const angleBottom = Math.PI / 2;
    const angleLeft   = Math.PI;
    const angleTop    = Math.PI * 3 / 2;
    const points      = [];
    let angle         = ArcMath.nearAngle(angleRight, startAngle, endAngle, clockwise);
    if (angle === angleRight) {
      points.push(ArcMath.circlePoint(cx, cy, r, angleRight));
    }

    angle = ArcMath.nearAngle(angleBottom, startAngle, endAngle, clockwise);
    if (angle === angleBottom) {
      points.push(ArcMath.circlePoint(cx, cy, r, angleBottom));
    }

    angle = ArcMath.nearAngle(angleLeft, startAngle, endAngle, clockwise);
    if (angle === angleLeft) {
      points.push(ArcMath.circlePoint(cx, cy, r, angleLeft));
    }

    angle = ArcMath.nearAngle(angleTop, startAngle, endAngle, clockwise);
    if (angle === angleTop) {
      points.push(ArcMath.circlePoint(cx, cy, r, angleTop));
    }

    points.push(ArcMath.circlePoint(cx, cy, r, startAngle));
    points.push(ArcMath.circlePoint(cx, cy, r, endAngle));
    let minX = Infinity;
    let maxX = -Infinity;
    let minY = Infinity;
    let maxY = -Infinity;
    points.forEach((point) => {
      if (minX > point.x) {
        minX = point.x;
      }
      if (maxX < point.x) {
        maxX = point.x;
      }
      if (minY > point.y) {
        minY = point.y;
      }
      if (maxY < point.y) {
        maxY = point.y;
      }
    });

    return {
      minX,
      minY,
      maxX,
      maxY
    };
  }
}

// module.exports = {
//   nearAngle,
//   projectPoint(cx, cy, r, startAngle, endAngle, clockwise, x, y) {
//     const rst = {};
//     arcProjectPoint(cx, cy, r, startAngle, endAngle, clockwise, x, y, rst);
//     return rst;
//   },
//   pointDistance: arcProjectPoint,
//   box: arcBox
// };
