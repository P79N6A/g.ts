"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @licence
 * Copyright (c) 2018 LinBo Len <linbolen@gradii.com>
 *
 * Use of this source code is governed by an MIT-style license.
 * See LICENSE file in the project root for full license information.
 */
var interpolate_zoom_1 = require("../src/wrapper/interpolate-zoom");
describe('test interpolate zoom', function () {
    it('interpolateZoom(a, b) handles nearly-coincident points', function () {
        expect(interpolate_zoom_1.interpolateZoom([324.68721096803614, 59.43501602433761, 1.8827137399562621], [324.6872108946794, 59.43501601062763, 7.399052110984391])(0.5)).toEqual([324.68721093135775, 59.43501601748262, 3.7323313186268305]);
    });
});
//# sourceMappingURL=zoom.spec.js.map