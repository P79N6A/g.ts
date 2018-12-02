"use strict";
/**
 * @licence
 * Copyright (c) 2018 LinBo Len <linbolen@gradii.com>
 *
 * Use of this source code is governed by an MIT-style license.
 * See LICENSE file in the project root for full license information.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var decompose_1 = require("./decompose");
var cssNode, cssRoot, cssView, svgNode;
function parseCss(value) {
    if (value === 'none') {
        return decompose_1.identity;
    }
    if (!cssNode) {
        cssNode = document.createElement('DIV'), cssRoot = document.documentElement, cssView = document.defaultView;
    }
    cssNode.style.transform = value;
    value = cssView.getComputedStyle(cssRoot.appendChild(cssNode), null).getPropertyValue('transform');
    cssRoot.removeChild(cssNode);
    value = value.slice(7, -1).split(',');
    return decompose_1.decompose(+value[0], +value[1], +value[2], +value[3], +value[4], +value[5]);
}
exports.parseCss = parseCss;
function parseSvg(value) {
    if (value == null) {
        return decompose_1.identity;
    }
    if (!svgNode) {
        svgNode = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    }
    svgNode.setAttribute('transform', value);
    if (!(value = svgNode.transform.baseVal.consolidate())) {
        return decompose_1.identity;
    }
    value = value.matrix;
    return decompose_1.decompose(value.a, value.b, value.c, value.d, value.e, value.f);
}
exports.parseSvg = parseSvg;
//# sourceMappingURL=parse.js.map