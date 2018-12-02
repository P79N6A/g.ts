"use strict";
/**
 * @licence
 * Copyright (c) 2018 LinBo Len <linbolen@gradii.com>
 *
 * Use of this source code is governed by an MIT-style license.
 * See LICENSE file in the project root for full license information.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var interpolate_number_1 = require("../../wrapper/interpolate-number");
var parse_1 = require("./parse");
function interpolateTransform(parse, pxComma, pxParen, degParen) {
    function pop(s) {
        return s.length ? s.pop() + ' ' : '';
    }
    function translate(xa, ya, xb, yb, s, q) {
        if (xa !== xb || ya !== yb) {
            var i = s.push('translate(', null, pxComma, null, pxParen);
            q.push({ i: i - 4, x: interpolate_number_1.interpolateNumber(xa, xb) }, { i: i - 2, x: interpolate_number_1.interpolateNumber(ya, yb) });
        }
        else if (xb || yb) {
            s.push('translate(' + xb + pxComma + yb + pxParen);
        }
    }
    function rotate(a, b, s, q) {
        if (a !== b) {
            if (a - b > 180) {
                b += 360;
            }
            else if (b - a > 180) {
                a += 360;
            } // shortest path
            q.push({ i: s.push(pop(s) + 'rotate(', null, degParen) - 2, x: interpolate_number_1.interpolateNumber(a, b) });
        }
        else if (b) {
            s.push(pop(s) + 'rotate(' + b + degParen);
        }
    }
    function skewX(a, b, s, q) {
        if (a !== b) {
            q.push({ i: s.push(pop(s) + 'skewX(', null, degParen) - 2, x: interpolate_number_1.interpolateNumber(a, b) });
        }
        else if (b) {
            s.push(pop(s) + 'skewX(' + b + degParen);
        }
    }
    function scale(xa, ya, xb, yb, s, q) {
        if (xa !== xb || ya !== yb) {
            var i = s.push(pop(s) + 'scale(', null, ',', null, ')');
            q.push({ i: i - 4, x: interpolate_number_1.interpolateNumber(xa, xb) }, { i: i - 2, x: interpolate_number_1.interpolateNumber(ya, yb) });
        }
        else if (xb !== 1 || yb !== 1) {
            s.push(pop(s) + 'scale(' + xb + ',' + yb + ')');
        }
    }
    return function (a, b) {
        var s = [], // string constants and placeholders
        q = []; // number interpolators
        a = parse(a), b = parse(b);
        translate(a.translateX, a.translateY, b.translateX, b.translateY, s, q);
        rotate(a.rotate, b.rotate, s, q);
        skewX(a.skewX, b.skewX, s, q);
        scale(a.scaleX, a.scaleY, b.scaleX, b.scaleY, s, q);
        a = b = null; // gc
        return function (t) {
            var i = -1, n = q.length, o;
            while (++i < n) {
                s[(o = q[i]).i] = o.x(t);
            }
            return s.join('');
        };
    };
}
exports.interpolateTransformCss = interpolateTransform(parse_1.parseCss, 'px, ', 'px)', 'deg)');
exports.interpolateTransformSvg = interpolateTransform(parse_1.parseSvg, ', ', ')', ')');
//# sourceMappingURL=index.js.map