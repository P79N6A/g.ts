// vec2.angleTo  = function (v1, v2, direct) {
//   const angle            = vec2.angle(v1, v2);
//   const angleLargeThanPI = vec2.direction(v1, v2) >= 0;
//   if (direct) {
//     if (angleLargeThanPI) {
//       return Math.PI * 2 - angle;
//     }
//
//     return angle;
//   }
//
//   if (angleLargeThanPI) {
//     return angle;
//   }
//   return Math.PI * 2 - angle;
// };
// vec2.vertical = function (out, v, flag) {
//   if (flag) {
//     out[0] = v[1];
//     out[1] = -1 * v[0];
//   } else {
//     out[0] = -1 * v[1];
//     out[1] = v[0];
//   }
//
//   return out;
// };
//
// mat3.translate = function (out, a, v) {
//   const transMat = new Array(9);
//   mat3.fromTranslation(transMat, v);
//   return mat3.multiply(out, transMat, a);
// };
//
// mat3.rotate = function (out, a, rad) {
//   const rotateMat = new Array(9);
//   mat3.fromRotation(rotateMat, rad);
//   return mat3.multiply(out, rotateMat, a);
// };
//
// mat3.scale = function (out, a, v) {
//   const scaleMat = new Array(9);
//   mat3.fromScaling(scaleMat, v);
//   return mat3.multiply(out, scaleMat, a);
// };
//
// module.exports = {
//   mat3,
//   vec2,
//   vec3,
//   transform(m, ts) {
//     m = CommonUtil.clone(m);
//     CommonUtil.each(ts, t => {
//       switch (t[0]) {
//         case 't':
//           mat3.translate(m, m, [t[1], t[2]]);
//           break;
//         case 's':
//           mat3.scale(m, m, [t[1], t[2]]);
//           break;
//         case 'r':
//           mat3.rotate(m, m, t[1]);
//           break;
//         case 'm':
//           mat3.multiply(m, m, t[1]);
//           break;
//         default:
//           return false;
//       }
//     });
//     return m;
//   }
// };

import { Matrix3, Vector2 } from '@gradii/vector-math';
import { each } from './common';

export class MatrixHelper {
  public static transform(m:Matrix3, ts) {
    m = m.clone();
    each(ts, t => {
      switch (t[0]) {
        case 't':
          m.translate(new Vector2(t[1], t[2]));
          break;
        case 's':
          m.scaleVector2(new Vector2(t[1], t[2]));
          break;
        case 'r':
          m.setRotationZ(t[1]);
          break;
        case 'm':
          m.multiply(new Matrix3(t[1]));
          break;
        default:
          return false;
      }
    });
    return m;
  }
}
