"use strict";
/**
 * @licence
 * Copyright (c) 2018 LinBo Len <linbolen@gradii.com>
 *
 * Use of this source code is governed by an MIT-style license.
 * See LICENSE file in the project root for full license information.
 */
exports.__esModule = true;
var canvas_1 = require("../../../src/canvas/canvas");
describe('Marker', function () {
    var div = document.createElement('div');
    div.id = 'canvas-marker';
    document.body.appendChild(div);
    var canvas = new canvas_1.Canvas({
        containerId: 'canvas-marker',
        width: 200,
        height: 200,
        pixelRatio: 1
    });
    it('init', function () {
        var marker = canvas.addShape('marker', {
            attrs: {
                x: 10,
                y: 10,
                radius: 10,
                fill: 'red',
                symbol: 'circle'
            }
        });
        expect(marker.attr('x')).toBe(10);
        expect(marker.attr('y')).toBe(10);
    });
    it('hit', function () {
        var marker = canvas.addShape('marker', {
            attrs: {
                x: 20,
                y: 20,
                radius: 10,
                fill: 'blue',
                symbol: 'circle'
            }
        });
        expect(marker.isHit(20, 20)).toBe(true);
        expect(marker.isHit(10, 10)).toBe(false);
    });
    it('hit with lineWidth', function () {
        var marker = canvas.addShape('marker', {
            attrs: {
                x: 100,
                y: 100,
                radius: 5,
                lineWidth: 6,
                fill: 'blue',
                symbol: 'circle'
            }
        });
        expect(marker.isHit(100, 100)).toBe(true);
        expect(marker.isHit(95, 95)).toBe(true);
        marker.attr('lineAppendWidth', 6);
        expect(marker.isHit(94, 94)).toBe(true);
    });
});
