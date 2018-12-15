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
var polyline_1 = require("../../../src/canvas/shape/polyline");
var div = document.createElement('div');
div.id = 'canvas-polyline';
document.body.appendChild(div);
describe('Polyline', function () {
    var canvas = new canvas_1.Canvas({
        containerId: 'canvas-polyline',
        width: 200,
        height: 200,
        pixelRatio: 1
    });
    var polyline = new polyline_1.Polyline();
    it('init attrs', function () {
        expect(polyline.attr('points')).toBeUndefined();
        expect(polyline.attr('lineWidth')).toBe(1);
        expect(polyline.attr('startArrow')).toBe(false);
        expect(polyline.attr('endArrow')).toBe(false);
        var box = polyline.getBBox();
        expect(box).toBeNull();
    });
    it('points', function () {
        polyline.attr('points', []);
        var points = polyline.attr('points');
        expect(points.length).toBe(0);
        var box = polyline.getBBox();
        expect(box).toBeNull();
        polyline.attr('points', [[20, 30], [50, 40], [100, 110], [130, 70]]);
        points = polyline.attr('points');
        expect(points.length).toBe(4);
        box = polyline.getBBox();
        expect(box.minX).toBe(19.5);
        expect(box.maxX).toBe(130.5);
        expect(box.minY).toBe(29.5);
        expect(box.maxY).toBe(110.5);
        var polyline1 = new polyline_1.Polyline({
            attrs: {
                points: [[40, 23], [53, 64], [79, 120], [234, 56]]
            }
        });
        points = polyline1.attr('points');
        expect(points.length).toBe(4);
        box = polyline1.getBBox();
        expect(box.minX).toBe(39.5);
        expect(box.maxX).toBe(234.5);
        expect(box.minY).toBe(22.5);
        expect(box.maxY).toBe(120.5);
    });
    it('lineWidth', function () {
        expect(polyline.attr('lineWidth')).toBe(1);
        polyline.attr('lineWidth', 2);
        var box = polyline.getBBox();
        expect(box.minX).toBe(19);
        expect(box.maxX).toBe(131);
        expect(box.minY).toBe(29);
        expect(box.maxY).toBe(111);
        var polyline1 = new polyline_1.Polyline({
            attrs: {
                points: [[23, 12], [42, 52]],
                lineWidth: 2
            }
        });
        box = polyline1.getBBox();
        expect(box.minX).toBe(22);
        expect(box.maxX).toBe(43);
        expect(box.minY).toBe(11);
        expect(box.maxY).toBe(53);
    });
    it('stroke', function () {
        polyline.attr('stroke', 'l (0) 0.2:#ff00ff 1:#0000ff');
        expect(polyline.attr('stroke')).toBe('l (0) 0.2:#ff00ff 1:#0000ff');
        canvas.add(polyline);
        canvas.draw();
    });
    it('isHit', function () {
        expect(polyline.isHit(20, 30)).toBe(true);
        expect(polyline.isHit(35, 35)).toBe(true);
        expect(polyline.isHit(50, 40)).toBe(true);
        expect(polyline.isHit(100, 110)).toBe(true);
        expect(polyline.isHit(130, 70)).toBe(true);
        expect(polyline.isHit(18, 29)).toBe(false);
        var polyline1 = new polyline_1.Polyline({
            attrs: {
                points: [[10, 10]]
            }
        });
        expect(polyline1.isHit(10, 10)).toBe(false);
        polyline1.attr('stroke', 'red');
        expect(polyline1.isHit(10, 10)).toBe(false);
        canvas.add(polyline1);
        canvas.draw();
    });
    it('arrow', function () {
        polyline.attr('startArrow', true);
        expect(polyline.attr('startArrow')).toBe(true);
        canvas.draw();
    });
    it('getPoint', function () {
        expect(polyline.getPoint(1)).toEqual({ x: 130, y: 70 });
        expect(polyline.getPoint(0.5)).toEqual({ x: 80.34077206680482, y: 82.47708089352673 });
        expect(polyline.getPoint(0)).toEqual({ x: 20, y: 30 });
    });
});
